const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.static());
app.use(express.static("./build"));

const port = process.env.port || 8080;

//Load the npm build package of the frontend CRA
if (process.env.NODE_ENV === "production") {
    // set a static folder
    app.use(express.static("frontend/build"));

    // Provide a wildcard as a fallback for all routes
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "./", "build", "index.html"));
    });
}

//Host app at PORT
app.listen(port, () => console.log(`Server is running at port ${port}!`));
