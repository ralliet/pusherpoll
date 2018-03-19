const mongoose = require("mongoose");


//map global promises
mongoose.Promise = global.Promise;
//mongoose connect
mongoose.connect('mongodb://ruben:ruben@ds115729.mlab.com:15729/pusherpoll')
        .then(() => console.log("mongodb connected"))
        .catch((error) => console.log(error));