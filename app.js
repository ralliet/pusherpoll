const express = require("express");
const path = requrie("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//set Public folder
app.use(express.static(path.join(__dirname,'public')));

// Body parser middleware 
app.use(bodyParser.json());
app.use(bodyParse.urlencoded({extended: false }));

//enable CORS
app.use(cors());

const port = 3000;

//start server
app.listen(port,() => console.log(`Server started on port ${port}`));
