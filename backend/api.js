// import cors from 'cors'
// import cookieParser from 'cookie-parser'
// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt'

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express();
const PORT = 8000;
const knex = require('knex')(require('./knexfile.js')['development']);


app.use(cookieParser())
// change the port here once the front end is up
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json());

app.get('/db_status', async (req, res) => {
   try {
      await knex.raw('SELECT 1')
      res.json({ status: 'ok' })
   } catch (err) {
      res.status(500).json({ error: 'DB connection failed', details: err.message })
   }
})

app.get('/users', async (req, res) => {
   try {
      const [users] = await Promise.all([
         knex('users').select('*')
      ]);

      res.status(200).json({
         users: users
      });

   } catch (err) {
      res.status(500).json({
         message: 'Failed to fetch data.'
      });
   }
});

app.get('/tasks', async (req, res) => {
   try {
      const [tasks] = await Promise.all([
         knex('tasks').select('*')
      ])

      res.status(200).json({
         tasks: tasks
      })
   } catch (err) {
      res.status(500).json({
         message: 'Failed to fetch data'
      })
   }
})

app.get('/directory', async (req, res) => {
   try {
      const [directory] = await Promise.all([
         knex('directory').select('*')
      ])

      res.status(200).json({
         directory: directory
      })
   } catch (err) {
      res.status(500).json({
         message: 'Failed to fetch data'
      })
   }
})

app.get('/user_tasks', async (req, res) => {

   try {
      const [user_tasks] = await Promise.all([
         knex('user_tasks')
            .join('users', 'users.id', 'user_tasks.user_id')
            .join('tasks', 'tasks.id', 'user_tasks.task_id')
            .select('users.rank', 'users.first_name', 'users.last_name', 'tasks.title', 'tasks.action_item', 'tasks.due_date', 'tasks.is_complete')
      ])

      res.json(user_tasks)
   } catch (err) {
      res.status(500).json({
         message: 'Failed to fetch data'
      })
   }
})

// Post routes
app.post('/login', async (req, res) => {
   const { email, password } = req.body

   const user = await db('users').where({ email }).first()

   if (!user) return res.status(401).json({ error: 'User not found!' })

   const validPassword = await bcrypt.compare(password, user.password)

   if (!validPassword) return res.status(401).json({ error: 'Incorrect password!' })

   const token = jwt.sign(
      { user_id: user.id, is_admin: user.is_admin },
      'your_jwt_secret',
      { expiresIn: '24h' }
   )

   res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
   })

   res.json({ message: 'Log in successful!' })
})

app.post('/register', async (req, res) => {
   const { first_name, last_name, email, password } = req.body

   const existing = await db('users').where({ email }).first()
   if (existing) return res.status(400).json({ error: `You've already got an account!` })

   const hashedPassword = await bcrypt.hash(password, 10)

   const [user] = await db('users').insert({
      is_admin: false,
      rank,
      first_name,
      last_name,
      email,
      phone,
      address,
      avatar,
      password: hashedPassword,
   }).returning('*')

   res.json({ message: 'Thanks for signing up! Log in with your email' })
})

//how are we incorporating login with this?
app.post('/user_tasks', async (req, res) => {
      const { id, note } = req.body

      if (!id) {
         return res.status(400).json({error: `You need to input user ID`})
      }

      const [updatedUserTask] = await knex('user_tasks').where({
            user_id,
            task_id
      })
      .update({
         note: note || null
      }).returning('*')

      if (!updatedUserTask) {
         return res.status(404).json({error: `Incorrect user ID and/or task ID!`})
      }
      
      res.json({ message: "Note updated!"})
})





app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
});