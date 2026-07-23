// import cors from 'cors'
// import cookieParser from 'cookie-parser'
// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt'

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 8000;
const knex = require("knex")(require("./knexfile.js")["development"]);

app.use(cookieParser());
// change the port here once the front end is up
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/db_status", async (req, res) => {
	try {
		await knex.raw("SELECT 1");
		res.json({ status: "ok" });
	} catch (err) {
		res
			.status(500)
			.json({ error: "DB connection failed", details: err.message });
	}
});

app.get("/users", async (req, res) => {
	try {
		const [users] = await Promise.all([knex("users").select("*")]);
		const safeUsers = users.map(({ password, ...rest }) => rest)
		res.status(200).json({
			users: safeUsers,
		});
	} catch (err) {
		res.status(500).json({
			message: "Failed to fetch data.",
		});
	}
});

app.get("/tasks", async (req, res) => {
	try {
		const [tasks] = await Promise.all([knex("tasks").select("*")]);

		res.status(200).json({
			tasks: tasks,
		});
	} catch (err) {
		res.status(500).json({
			message: "Failed to fetch data",
		});
	}
});

app.get("/directory", async (req, res) => {
	try {
		const [directory] = await Promise.all([knex("directory").select("*")]);

		res.status(200).json({
			directory: directory,
		});
	} catch (err) {
		res.status(500).json({
			message: "Failed to fetch data",
		});
	}
});

app.get("/user_tasks", async (req, res) => {
	try {
		const [user_tasks] = await Promise.all([
			knex("user_tasks")
				.join("users", "users.id", "user_tasks.user_id")
				.join("tasks", "tasks.id", "user_tasks.task_id")
				.select(
					"user_tasks.id",
					"users.rank",
					"users.first_name",
					"users.last_name",
					"tasks.title",
					"tasks.action_item",
					"user_tasks.priority",
					"user_tasks.due_date",
					"user_tasks.is_complete",
					"user_tasks.note",
				),
		]);

		res.json(user_tasks);
	} catch (err) {
		res.status(500).json({
			message: "Failed to fetch data",
		});
	}
});

app.get("/directory_poc", async (req, res) => {
	try {
		const [directory_poc] = await Promise.all([
			knex("directory_poc")
				.join("users", "users.id", "directory_poc.id_users")
				.join("directory", "directory.id", "directory_poc.id_directory")
				.select(
					"directory_poc.id",
					"users.rank",
					"users.first_name",
					"users.last_name",
					"directory.title",
					"directory.link",
				),
		]);

		res.json(directory_poc);
	} catch (err) {
		res.status(500).json({
			message: "Failed to fetch data",
		});
	}
});

// connor's fix for cookies
app.get("/userAuth", async (req, res) => {
	const token = req.cookies.token;
	if (!token) return res.status(401).json({ error: "Need to Log In" });
	try {
		const jwtCheck = jwt.verify(token, "your_jwt_secret");
		const user = await knex("users").where({ id: jwtCheck.user_id }).first();
		if (!user) return res.status(401).json({ error: "User not found" });
		const { password: _, ...safeUser } = user;
		res.json({ user: safeUser });
	} catch {
		res.status(401).json({ error: "Invalid/expired session" });
	}
});

// Post routes
app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	console.log(
		"Login attempt for email:",
		JSON.stringify(email),
	); /*I added this */
	const user = await knex("users").where({ email }).first();

	if (!user) return res.status(401).json({ error: "User not found!" });

	console.log("Stored hash:", user.password, "length:", user.password?.length); //TJF

	const validPassword = await bcrypt.compare(password, user.password);
	console.log("Compare result:", validPassword); //TJF
	if (!validPassword)
		return res.status(401).json({ error: "Incorrect password!" });

	const token = jwt.sign(
		{ user_id: user.id, is_admin: user.is_admin },
		"your_jwt_secret",
		{ expiresIn: "24h" },
	);

	res.cookie("token", token, {
		httpOnly: true,
		secure: false,
		maxAge: 24 * 60 * 60 * 1000,
	});

	const { password: _, ...safeUser } = user;

	res.json({ message: "Log in successful!", user: safeUser });
});

app.post("/logout", (req, res) => {
	res.clearCookie("token");
	res.json({ message: "Logged Out" });
});

app.post("/register", async (req, res) => {
	try {
		const {
			first_name,
			last_name,
			rank,
			phone,
			address,
			unit,
			email,
			password,
			duty_title,
			supervisor,
		} = req.body;

		if (!email || !password) {
			return res.status(400).json({ error: "Email and password required" });
		}

		const existing = await knex("users").where({ email }).first();
		if (existing)
			return res.status(400).json({ error: `You've already got an account` });

		const hashedPassword = await bcrypt.hash(password, 10);

		const [user] = await knex("users")
			.insert({
				is_admin: false,
				is_manager: false,
				first_name,
				last_name,
				rank,
				phone,
				address,
				unit,
				email,
				password: hashedPassword,
				duty_title,
				supervisor,
			})
			.returning("*");

		res.json({ message: "Thanks for signing up! Log in with your email" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "failed to register" });
	}
});

app.post("/tasks", async (req, res) => {
	const { id, ...updates } = req.body;

	if (id) {
		Object.keys(updates).forEach((key) => {
			if (updates[key] === undefined) {
				delete updates[key];
			}
		});

		const [updatedTask] = await knex("tasks")
			.where({ id })
			.update(updates)
			.returning("*");

		if (!updatedTask) {
			return res.status(404).json({ error: `Incorrect ID!` });
		}

		res.json({ message: "Task updated!", task: updatedTask });
	} else {
		const [newTask] = await knex("tasks").insert(updates).returning("*");

		res.json({ message: "New task created", task: newTask });
	}
});

app.post("/directory", async (req, res) => {
	const { id, ...updates } = req.body;

	if (id) {
		Object.keys(updates).forEach((key) => {
			if (updates[key] === undefined) {
				delete updates[key];
			}
		});

		const [updatedDirectory] = await knex("directory")
			.where({ id })
			.update(updates)
			.returning("*");

		if (!updatedDirectory) {
			return res.status(404).json({ error: `Incorrect ID!` });
		}

		res.json({ message: "Directory updated!", directory: updatedDirectory });
	} else {
		const [newDirectory] = await knex("directory")
			.insert(updates)
			.returning("*");

		res.json({
			message: "New Directory Entry created",
			directory: newDirectory,
		});
	}
});

//BELOW ARE SOME CHANGES TO MAKE IT WORK ON TJ COMPUTER//
app.post("/user_tasks", async (req, res) => {
	const { id, ...rest } = req.body;

	if (id) {
		const updates = {};
		if (rest.note !== undefined) updates.note = rest.note || null;
		if (rest.is_complete !== undefined) updates.is_complete = rest.is_complete;

		if (Object.keys(updates).length === 0) {
			return res.status(400).json({ error: "Nothing to update" });
		}

		const updates = {};
		if (rest.note !== undefined) updates.note = rest.note || null;
		if (rest.is_complete !== undefined) updates.is_complete = rest.is_complete;

		if (Object.keys(updates).length === 0) {
			return res.status(400).json({ error: "Nothing to update" });
		}

		const [updatedUserTask] = await knex("user_tasks")
			.where({ id })
			.update(updates)
			.returning("*");

		if (!updatedUserTask) {
			return res.status(404).json({ error: `Incorrect ID!` });
		}

		return res.json({ message: "User task updated", user_task: updatedUserTask });

	} else if (rest.user_id && rest.task_id && rest.due_date) {
		const [newUserTask] = await knex("user_tasks")
			.insert({
				user_id: rest.user_id,
				task_id: rest.task_id,
				priority: rest.priority || "Medium",
				due_date: rest.due_date,
				is_complete: false,
				note: rest.note || null,
			})
			.returning("*");

		return res.json({ message: "Task created", user_task: newUserTask });
	}

	return res.status(400).json({ error: "Something went wrong :(" });
});

//Delete routes
app.delete("/tasks/:id", async (req, res) => {
	console.log("params:", req.params);
	try {
		await knex("user_tasks").where({ task_id: req.params.id }).del();
		await knex("tasks").where({ id: req.params.id }).del();
		res.json({ message: "task deleted!" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "failed to delete" });
	}
});

app.delete("/user_tasks/:id", async (req, res) => {
	console.log("params:", req.params);
	try {
		await knex("user_tasks").where({ id: req.params.id }).del();
		res.json({ message: "user_task deleted" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "failed to delete" });
	}
});

app.delete("/users/:id", async (req, res) => {
	console.log("params:", req.params);
	try {
		await knex("user_tasks").where({ user_id: req.params.id }).del();
		await knex("users").where({ id: req.params.id }).del();
		res.json({ message: "user deleted" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "failed to delete" });
	}
});

app.delete("/directory/:id", async (req, res) => {
	console.log("params:", req.params);
	try {
		await knex("directory_poc").where({ id_users: req.params.id }).del();
		await knex("directory").where({ id: req.params.id }).del();
		res.json({ message: "directory deleted" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "failed to delete" });
	}
});

app.delete("/directory_poc/:id", async (req, res) => {
	console.log("params:", req.params);
	try {
		await knex("directory_poc").where({ id: req.params.id }).del();
		res.json({ message: "directory_poc deleted" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "failed to delete" });
	}
});

// PUT Routes
app.put("/users/:id", async (req, res) => {
	console.log("PUT /users/:id called with body: ", req.body);
	try {
		const {
			is_admin,
			is_manager,
			rank,
			first_name,
			last_name,
			email,
			phone,
			address,
			unit,
			avatar,
			password,
			duty_title,
			supervisor,
		} = req.body;

		const updates = {};
		if (is_admin !== undefined) updates.is_admin = is_admin;
		if (is_manager !== undefined) updates.is_manager = is_manager;
		if (rank !== undefined) updates.rank = rank;
		if (first_name !== undefined) updates.first_name = first_name;
		if (last_name !== undefined) updates.last_name = last_name;
		if (email !== undefined) updates.email = email;
		if (phone !== undefined) updates.phone = phone;
		if (address !== undefined) updates.address = address;
		if (unit !== undefined) updates.unit = unit;
		if (avatar !== undefined) updates.avatar = avatar;
		if (password !== undefined && !/^\$2[aby]\$/.test(password)) {
			updates.password = await bcrypt.hash(password, 10);
		}
		if (duty_title !== undefined) updates.duty_title = duty_title;
		if (supervisor !== undefined) updates.supervisor = supervisor;

		if (Object.keys(updates).length === 0) {
			return res.status(400).json({ error: "Nothing to update" });
		}

		const [user] = await knex("users")
			.where({ id: req.params.id })
			.update(updates)
			.returning("*");

		return res.json({ message: "user updated", user });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "failed to update user" });
	}
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
