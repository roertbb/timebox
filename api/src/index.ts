import "reflect-metadata";
import { createConnection } from "typeorm";
// import * as bodyParser from "body-parser";
// import * as paginate from "express-paginate";
// import * as preconditions from "express-preconditions";
import router from "./router";

import * as express from "express";

const port = process.env.PORT || 3000;

async function startServer() {
  const app = express();

  // app.use(bodyParser.json());
  // app.set("etag", "strong");
  // app.use(preconditions());
  // app.use(paginate.middleware(20, 50));

  app.get("/", (req, res) => {
    res.json({ message: "hello world!" });
  });

  app.use("/api", router);

  await createConnection();

  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
  });
}

startServer().catch((error) => console.error(error));
