# Evernote Project
Users can create, edit, and delete notes, and can group those notes into notebooks.

Live Link: https://dashboard.heroku.com/apps/evernote-react-app
## Getting Started

### Installation
1. Clone the repo
```git clone https://github.com/benjamin-danishevsky/react-redux-project.git```
2. Install dependencies from the root directory

 * ```cd frontend > npm install```

* ```cd backend > npm install```

3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL.
*  ```CREATE USER <name> WITH CREATEDB PASSWORD <'password'>```

4. Create a .env file base on the .env.example given in the backend folder.

5. Enter your username and password information into you .env file along with your desired database name, a secured combination of characters for your JWT_SECRET, and your desired PORT (preferably 5000).
6. Add the following proxy to your package.json file with your front end directory, replacing or keeping the 5000 port to match your PORT configuration found in your .env file.
* ```  "proxy": "http://localhost:5000"```
7. Create Database, Migrate, and Seed models.
* ```  npx dotenv sequelize db:create```
* ```  npx dotenv sequelize db:migrate```
* ```  npx dotenv sequelize db:seed:all```
8. Start the services in the backend directory.
* ```  npm start```
9. Start the services in the frontend directory, which should open the project in your default broswer. If not naviagte to http://localhost:3000
* ```  npm start```
