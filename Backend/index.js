const express = require("express");
const app = express();
const cors = require("cors");

//settings
app.set('port', process.env.PORT || 5000);

//middleware
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use('/api/paciente', require('./routes/paciente'));
app.use('/api/empleado', require('./routes/empleado'));

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});