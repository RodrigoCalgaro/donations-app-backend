const createError = require('http-errors');
const express = require('express');
const env = require('dotenv').config()
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require("cors");

const models = require("./models");
const passport = require('passport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV != "test") {
  // morgan logs
  app.use(logger('dev'));

  // Swagger Documentation
  const swaggerUI = require('swagger-ui-express')
  const swaggerJsDoc = require('swagger-jsdoc')

  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: "Donations App",
        version: "1.0.0"
      }
    },
    apis: ["./routes/*.js"]
  }

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

  console.log(`\n\nSwagger documentation on: http://localhost:3000/api-docs\n\n`);
  
  
  //Sync Database
  models.sequelize.sync({
    force: false
  }).then(() => {
      console.log('Database Sync OK!');
  }).catch(function (err) {
    console.log(err, "Error to sync database: " + err);
  });

}


// Passport
require("./helpers/passport");

// Routing
require("./routes")(app);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send('Internal Server Error');
});

module.exports = app;
