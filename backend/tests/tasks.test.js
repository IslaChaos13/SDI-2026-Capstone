const request = require('supertest')

//Get routes - TEST
describe('GET /db_status', () => {
   it('returns database connection', async () => {
      const response = await request('http://localhost:8000')
         .get('/db_status')

      expect(response.status).toBe(200)
      expect(response.body.status).toBe('ok')
   })
})

describe('GET /tasks', () => {
   it('returns the tasks', async () => {
      const response = await request('http://localhost:8000')
         .get('/tasks')

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body.tasks)).toBe(true)
   })
})

describe('GET /users', () => {
   it('returns the users', async () => {
      const response = await request('http://localhost:8000')
         .get('/users')

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body.users)).toBe(true)
   })
})

describe('GET /directory', () => {
   it('returns the directory', async () => {
      const response = await request('http://localhost:8000')
         .get('/directory')

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body.directory)).toBe(true)
   })
})

describe('GET /user_tasks', () => {
   it('returns the user tasks', async () => {
      const response = await request('http://localhost:8000')
         .get('/user_tasks')

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
   })
})

//Post routes - TEST