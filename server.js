const express = require('express');
const app = express();
const router = express.Router();
const serverless = require('serverless-http');

const PORT = 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

router.get("/", (req, res) => {
    res.send("App is running..");
});


module.exports = app;
module.exports.handler = serverless(app);
