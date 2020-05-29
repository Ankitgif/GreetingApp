
const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendfile('index.html');
});

app.listen(3000, function () {
    console.log("Server started on 3000");
});
