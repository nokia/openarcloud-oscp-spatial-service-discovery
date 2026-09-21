import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const portRaw = process.env.PORT;
if (!portRaw || portRaw.trim() === "") {
  console.error(
    "Missing required environment variable: PORT. Set it in .env or the process environment."
  );
  process.exit(1);
}

const port = parseInt(portRaw, 10);
if (Number.isNaN(port)) {
  console.error("PORT must be a valid number.");
  process.exit(1);
}

const server = new app()
  .Start(port)
  .then((port) => console.log(`Server running on port ${port}`))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

export default server;
