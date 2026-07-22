# SDI-2026-Capstone

## Welcome Wingman
Welcome Wingman is a full stack web application designed to simplify the military in-processing experience. The application provides Airmen with a centralized platform to complete required tasks, access important base resources, and monitor their progress, while giving administrators tools to manage personnel and assignments.

## Features

## User Dashboard

Provides users with an overview of their in-processing progress.

- Personalized greeting based on logged in user
- Progress and readiness metrics
- Upcoming tasks
- Today's schedule
- Quick actions
- Notifications
- Important contacts
- Current weather

## Checklist

Track all required in-processing tasks.

- View assigned tasks
- Filter by All, Completed, and Incomplete
- Mark tasks complete
- Track overall progress

## Base Directory

Find important offices and resources around the installation.

- Interactive base map
- Office search
- Important phone numbers
- Frequently used contacts
- Quick resource links

## Profile

Manage personal information and monitor activity.

- User information
- Supervisor information
- Recent activity
- Achievements

## Personnel Dashboard (Admin)

Manage assigned personnel.

- View personnel
- Search personnel
- Add personnel
- Monitor member status

## Assignment Management

Manage tasks assigned to personnel.

- View all assignments
- Search assignments
- Create assignments
- Edit assignment details

## Authentication

Secure authentication using JWT and encrypted passwords.

- Login
- Logout
- Protected routes
- Cookie-based authentication



## DOCKER COMMANDS

# INITIAL SETUP

The backend team is awesome and Dockerized the database. This means that if you do a `git pull` you should get a `docker-compose.yml` and a `Dockerfile` in the backend directory.

From the root directory: <br>

1. `docker-compose up --build -d`
2. `docker ps -a`
3. Find the API container. It should look something like this:<br>
   CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES <br>
   f419667fca27 sdi-2026-capstone-api "docker-entrypoint.s…" 7 minutes ago Up 7 minutes 0.0.0.0:8000->8000/tcp, [::]:8000->8000/tcp sdi-2026-capstone-api-1
4. Your stuff should be up and running.
5. cd into the `/backend` directory and run `npm run resetServer`. You should see migrations run successfully.
6. Happy coding!

# UPDATING THE CONTAINER

1. `git pull` to get the latest changes
2. `docker-compose down` to tear down the old container
3. `docker-compose build --no-cache api` to rebuild with changes implemented
4. `docker-compose up -d` to bring up the container
5. `cd backend` and then run `npm run resetServer`

# This might be old now, your mileage will vary

### CREATE CONTAINER ACCORDING TO OUR 'knexfile.js' SETTINGS, ONLY RUN ONCE!!

docker run --name wingman-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=WingmanDatabase -p 5432:5432 -d postgres:16

### CREATE TABLES AND SEED DATA

cd backend
npx knex migrate:latest
npx knex seed:run

### START EXISTING DOCKER CONTAINER

docker start wingman-db

### CONNECT TO WINGMAN DATABASE IN CONTAINER

docker exec -it wingman-db psql -U postgres -d WingmanDatabase

<<<<<<< HEAD
<<<<<<< HEAD
# VITEST

### Commands

cd backend
Run npm run runServer
make sure container is running
npm test
q (quits test)
=======
=======
>>>>>>> origin/dashboard-navigation
## Built With

### Frontend
- React
- Vite

### Backend
- Node.js
- Express.js
- PostgreSQL
- Knex.js

### Authentication
- JSON Web Tokens
- bcrypt

### APIs
- Open-Meteo

<<<<<<< HEAD
>>>>>>> eee1342 (updated readme with frontend features and technology stack used)
=======
>>>>>>> origin/dashboard-navigation
