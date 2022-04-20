# How to run the server locally (on Linux/Unix):

## Docker setup:

You will need to make sure you have Docker installed on your laptop. We will be using a Docker container to host our SQL database.

### Creating a Docker volume to persist data:

`docker volume create dam-scan-volume`

### View all local docker volumes:

`docker volume ls`

### Creating the container:

`docker run -d --name dam-scan-server -v dam-scan-volume \ --network mysql-net \ -p "3306:3306" \ -e "MYSQL_RANDOM_ROOT_PASSWORD=yes" \ -e "MYSQL_DATABASE=lidar" \ -e "MYSQL_USER=capstone" \ -e "MYSQL_PASSWORD=capstone2022" \ mysql`

### Creating a Docker SQL instance:

This will create a SQL shell that we can enter commands into for our DB.
`docker run --rm -it --network mysql-net mysql mysql -h dam-scan-server -u capstone -p`

We will be prompted for a password to access the database we just created. The password is **capstone2022**.

Next, to use the database we just created, run the command:
`USE lidar;`

### Next, drop the DB init script into the SQL shell after running the docker sql instance

Paste the code from tables_init.sql into the shell and press Enter. If successful, we should be able to see our new **scans** table by entering the command:
`SHOW tables;`.
Then to check if our data was inserted properly, we can run the command `SELECT * FROM scans;` to show all of the contents in the scans table. If the table is empty or the table does not exist, something has gone wrong.

## Once the Docker portion is complete, we can start the server portion.

### Install the necessary packages:

`npm install`

### Set the environment variables:

Paste this command into your terminal:
`export MYSQL_PORT=3306 export MYSQL_DB=lidar export MYSQL_USER=capstone export MYSQL_PASSWORD=capstone2022`

### Run the server

`node server.js`

### We can test the server endpoints by visiting:

localhost:8888/scans/

This endpoint should display all of the entries from the scans db table.
