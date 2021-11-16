const { Router } = require('express');
const router = Router();
const pool = require("./db");
const jwt = require("jsonwebtoken");
require('dotenv').config();

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[2];
        req.token = bearerToken;
        //console.log("TOKEN ", req.token)
        next();
    } else {
        res.sendStatus(401);
    }
}

router.post("/addCondicionesPaciente", verifyToken, async (req, res) => {
    try {
        const { id_paciente, condiciones } = req.body;

        for (var i = 0; i < condiciones.length; i++) {
            const addCondicionesPaciente = await pool.query(
                "INSERT INTO condiciones_paciente(id_paciente, id_condicion) VALUES($1,$2) RETURNING *",
                [id_paciente, condiciones[i].id_condicion]
            );
        }

        jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                res.status(200).send({ code: 1, message: "Datos insertados correctamente" });
            }
        });
        //res.status(200).send({ code: 1, message: "Datos insertados correctamente" });
    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, message: "Error: " + err.message });
    }
});

router.post("/addCondicionesPaciente2", async (req, res) => {
    try {
        var { id_paciente, condiciones } = req.body;
        condiciones = JSON.parse(condiciones);
        // console.log("Condiciones: ", typeof condiciones, condiciones)
        for (var i = 0; i < condiciones.length; i++) {
            const addCondicionesPaciente = await pool.query(
                "INSERT INTO condiciones_paciente(id_paciente, id_condicion) VALUES($1,$2) RETURNING *",
                [parseInt(id_paciente), condiciones[i].id_condicion]
            );
        }

        res.status(200).send({ code: 1, message: "Datos insertados correctamente" });
        //res.status(200).send({ code: 1, message: "Datos insertados correctamente" });
    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, message: "Error: " + err.message });
    }
});

router.post("/getCondicionesPacienteByIDPaciente", verifyToken, async (req, res) => {
    try {
        const { id_paciente } = req.body;
        const getCondicionesPaciente = await pool.query(
            'SELECT p.nombre as "Nombre", cm.nombre_condicion as "Nombre_Condicion" FROM condiciones_paciente cp INNER JOIN paciente p ON p.id_paciente = cp.id_paciente INNER JOIN condiciones_medicas cm ON cp.id_condicion = cm.id_condicion AND cp.id_paciente = $1',
            [id_paciente]

        );

        array = []

        for (var i = 0; i < getCondicionesPaciente.rows.length; i++) {
            array.push(getCondicionesPaciente.rows[i]);
        }

        // console.log(getCondicionesPaciente.rows)
        jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                res.status(200).send({ code: 1, id_paciente: id_paciente, condiciones: array });
            }
        });
        //res.status(200).send({ code: 1, id_paciente: id_paciente, condiciones: array });

    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, message: "Error: " + err.message });
    }
});

router.post('/getConditionID', async (req, res) => {
    try {
        const { conditionsArray } = req.body;
        var newConditionsArray = conditionsArray.split(", ");
        var arrayIds = [];
        // console.log(newConditionsArray)

        for (var i = 0; i < newConditionsArray.length; i++) {
            const getConditionID = await pool.query(
                'SELECT id_condicion FROM condiciones_medicas WHERE nombre_condicion LIKE $1',
                [newConditionsArray[i]]
            );
            arrayIds.push(getConditionID.rows[0].id_condicion);
        }

        // console.log(arrayIds);

        res.status(200).send({ code: 1, arrayIds });

    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, message: "Error: " + err.message });
    }
});

module.exports = router;