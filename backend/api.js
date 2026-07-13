const express = require('express');

const app = express();
const PORT = 8000;
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(express.json());

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

app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
});