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

		res.status(200).json({
			users: users,
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

//TJF//

app.get("/login", async (req, res) => {
	const { email, password } = req.body;
	console.log(
		"Login attempt for email:",
		JSON.stringify(email),
	); /*I added this */

	const user = await knex("users").where({ email }).first();

	if (!user) return res.status(401).json({ error: "User not found!" });

	const validPassword = await bcrypt.compare(password, user.password);

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

	res.json(user);
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

	const validPassword = await bcrypt.compare(password, user.password);

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

app.post("/register", async (req, res) => {
	const { first_name, last_name, email, password } = req.body;

	const existing = await knex("users").where({ email }).first();
	if (existing)
		return res.status(400).json({ error: `You've already got an account!` });

	const hashedPassword = await bcrypt.hash(password, 10);

	const [user] = await knex("users")
		.insert({
			is_admin: false,
			is_manager: false,
			rank,
			first_name,
			last_name,
			email,
			phone,
			address,
			avatar,
			password: hashedPassword,
		})
		.returning("*");

	res.json({ message: "Thanks for signing up! Log in with your email" });
});

app.post("/tasks", async (req, res) => {
	const { id_directory, title, action_item } = req.body;

	const [newTask] = await knex("tasks")
		.insert({
			id_directory,
			title,
			action_item,
		})
		.returning("*");

	res.json({ message: "New task created" });
});

app.post("/directory", async (req, res) => {
	const { title, link, phone, address, latitude, longitude } = req.body;

	const [newDirectory] = await knex("directory")
		.insert({
			title,
			link,
			phone,
			address,
			latitude,
			longitude,
		})
		.returning("*");

	res.json({ message: "New Directory Entry created" });
});

app.post("/user_tasks", async (req, res) => {
	const { id, user_id, task_id, priority, due_date, is_complete, note } =
		req.body;

	if (id) {
		if (note) {
			const [updatedUserTask] = await knex("user_tasks")
				.where({
					id,
				})
				.update({
					note: note,
				})
				.returning("*");

			if (!updatedUserTask) {
				return res.status(404).json({ error: `Incorrect ID!` });
			}

			res.json({ message: "Note updated!" });
		}

		if (is_complete) {
			const [completeUserTask] = await knex("user_tasks")
				.where({
					id,
				})
				.update({
					is_complete: is_complete,
				})
				.returning("*");

			if (!completeUserTask) {
				return res.status(404).json({ error: `Incorrect ID!` });
			}

			res.json({ message: "Successfully marked as completed" });
		}
	} else if (user_id && task_id && due_date) {
		const [userTask] = await knex("user_tasks")
			.insert({
				user_id,
				task_id,
				priority: priority || "Medium",
				due_date,
				is_complete: false,
				note: note || null,
			})
			.returning("*");

		res.json({ message: "Task created." });
	}

	return res.status(400).json({ error: `Something went wrong :(` });
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

app.get("/userAuth", async (req, res) => {
	const token = req.cookies.token;
	if (!token) return res.status(401).json({error: "Need to Log In"});
	try {
		const jwtCheck = jwt.verify(token, "your_jwt_secret");
		const user = await knex("users").where({id: jwtCheck.user_id}).first();
		if (!user) return res.status(401).json({error: "User not found"});
		const {password: _, ...safeUser} = user;
		res.json({user: safeUser});
	} catch {
		res.status(401).json({error: "Invalid/expired session"})
	}
});

app.post("/logout", (req,res) => {
	res.clearCookie("token");
	res.json({message: "Logged Out"})
})

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
