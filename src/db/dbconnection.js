const mongoose = require("mongoose");

const uri = "mongodb+srv://practo-clone:practo-clone@cluster0.jbdus.mongodb.net/practo-clone?retryWrites=true&w=majority"
mongoose.connect(uri, {
  useNewUrlParser: "true",
  useUnifiedTopology: "true",
  useCreateIndex: "true",
  useFindAndModify: "true",
});
mongoose.connection.on("connected", () => {
  console.log("Mongoose Connected")
})


///"mongodb://127.0.0.1/27017"