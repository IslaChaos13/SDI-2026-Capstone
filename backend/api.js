const express = require('express');

const app = express();
const PORT = 8000;
const knex = require('knex')(require('./knexfile.js')['development']);

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
         knex('users').select('*')
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

app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
});