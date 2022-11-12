const express = require("express");
const routes = require('./routes')
const items = require('./fakeDb')


app = express()

app.use(express.json());

app.use('/items', routes)

app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    console.log(err)
    let message = err.message || "somethig went wrong";
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
  });
module.exports = app