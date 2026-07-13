# SDI-2026-Capstone

DOCKER COMMANDS

<!-- CREATE CONTAINER ACCORDING TO OUR KNEX.js SETTINGS, ONLY RUN ONCE!! -->
docker run --name wingman-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=WingmanDatabase -p 5432:5432 -d postgres:16


<!-- CREATE TABLES AND SEED DATA -->
cd backend
npx knex migrate:latest
npx knex seed:run


<!-- START EXISTING DOCKER CONTAINER -->
docker start wingman-db


<!-- CONNECT TO WINGMAN DATABASE IN CONTAINER-->
docker exec -it wingman-db psql -U postgres -d WingmanDatabase
