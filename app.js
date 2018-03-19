const express = require("express");
const path = requrie("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//set Public folder
app.use(express.static(path.join(__dirname,'public')));
