const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Sets up our ports for testing application
var PORT = process.env.PORT || 3000;
const app = express();
// Concise output colored by response status for development use.
//  The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(logger("dev"));
// MiddleWare
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
// Uses all static non changing files such ass Css html pages
app.use(express.static("public"));
// connects Opens the default mongoose connection.
mongoose.connect(process.env.MONGODB_URI  || "mongodb://localhost/workout", {
    // Mongoose is having deprecation warnings 
    // useNewUrlParser Flag for using new URL string parser instead of current (deprecated) one
    useNewUrlParser: true, 
    // Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().
    useFindAndModify: false
});

//routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));
// standard code for listing ito the port for localhost
app.listen(PORT, () => {
    console.log("App running on port" + PORT);
});