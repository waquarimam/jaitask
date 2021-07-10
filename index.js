const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.json());
const base_route = "/api/v1/";

app.use(base_route, routes);


// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.listen(3000,() => console.log('Server is running at PORT http://localhost:3000'));