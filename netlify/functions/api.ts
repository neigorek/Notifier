const express = require('express');
const app = express();
const serverless = require('serverless-http');
const router = express.Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

app.use("/api/", router);

export const handler = serverless(app);
