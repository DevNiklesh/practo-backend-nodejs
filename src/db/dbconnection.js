<<<<<<< HEAD
const mongoose = require('mongoose')
const { dbconnection } = require('.')



mongoose.connect('mongodb://127.0.0.1/27017',{ 
    useNewUrlParser :'true',
    useUnifiedTopology:'true',
    useCreateIndex:'true',
    useFindAndModify:'true'
    
})


module.exports=dbconnection
=======
const mongoose = require("mongoose");
const { dbconnection } = require(".");

mongoose.connect("mongodb://127.0.0.1/27017", {
  useNewUrlParser: "true",
  useUnifiedTopology: "true",
  useCreateIndex: "true",
  useFindAndModify: "true",
});

module.exports = dbconnection;
>>>>>>> c222751dcd8bb59f48fb8399809974dc3ed9f885
