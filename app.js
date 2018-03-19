const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const poll = require("./routes/poll");

//set Public folder
app.use(express.static(path.join(__dirname,'public')));

// Body parser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

//enable CORS
app.use(cors());

app.use('/poll',poll);

const port = 3000;

//start server
app.listen(port,() => console.log(`Server started on port ${port}`));
