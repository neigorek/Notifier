const express = require('express');
const {subscribeToNewTransactions} = require("./notifier");
const app = express();
const router = express.Router();

const PORT = 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

router.get("/", (req, res) => {
    res.send("App is running..");
    subscribeToNewTransactions();
});

app.use(router);
module.exports = app;
