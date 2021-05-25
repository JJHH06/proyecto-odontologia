const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

//settings
app.set('port', process.env.PORT || 5000);

//middleware
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use('/api/paciente', require(path.join(__dirname, '/routes/paciente')));
app.use('/api/empleado', require(path.join(__dirname, '/routes/empleado')));
app.use('/api/login', require(path.join(__dirname, '/routes/login')));

//starting the server
app.listen(app.get('port'), () => {
    console.log(` The server has started successfully on port: ${app.get('port')} !!`);
});