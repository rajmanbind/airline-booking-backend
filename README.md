This is a node js project template, which anyone ca use as it has been prepared, by keeping some of the most important code priciples and project management recommendation.

`src` --> Inside the src folder all the actuall source code regarding the project will resides, this will not includes any kind of tests(you might want to make seperate tests folder)

Lets take a look insida the `src` folder

- `config` --> In this folder anything and everything regarding any configurations or setup of a library or module will be done for example: setting or .env so that we can use envirorment variable in a cleaner fashion , this is the done in the `server-config.ts`. One more example can be to setup your logging library that can help toyou to prepare miningfull logs, so configuration of this library should also be done here

- `routes` --> In the routes folder , we register a route and the corresponding middleware and controllers to it.

- `middlewares` --> They are just going to intercept the incoming request where we can write our validatorrs , authenticators etc.

- `controllers` --> They are kind of last middlewares as post them you call your business layer to execute the business logic. In controllers we just receives the incoming request and data and then pass it to the business layer, and once business layer returns output we structure the API response in controllers and send the output.

- `repositories` --> This folder contains all the logic using which we interact the DB by writing queries, all the raw queries or ORM queries will go here.

- `services` --> Contains the business logic and interacts with repositories for data from the database.

- `utils` --> Contains helper methods , error classes etc.

### Setup the project

-  Download this template from github and open it in your favourite text editor.
- Go inside the root directory and execute the following command: 
```
npm install
```
- In the root directory create `.env` file and the following env variables
``` 
    PORT= <port number of your choice>
```
ex:
```
PORT=3000

```
- Inside the `src/config` folder create a file name as `config.json` and write the following code:
- This project uses environment variables and `src/config/servier-config.ts` (ServerConfig) to configure the app.

- Create a `.env` file in the project root (see `.env.example`) and set your DB credentials and other settings. `ServerConfig` reads these variables at startup.

- Migrations are placed in `src/migrations` (dev) and compiled to `dist/migrations` for production. You can generate migration templates with `sequelize-cli` if you want, but do not commit plaintext credential files.

  If you need the `sequelize-cli` helper locally:
  ```bash
  npx sequelize-cli init
  npx sequelize-cli model:generate --name Example --attributes name:string
  ```

  Note: the codebase now uses Umzug to run migrations (`src/utils/migrate.ts`). Prefer running migrations as a CI/CD step or a single leader job in production rather than from every app instance.

- To run the server execute:
``` 
npm run dev
```