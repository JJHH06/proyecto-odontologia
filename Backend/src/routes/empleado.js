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

router.post("/addEmpleado", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { id_empleado, password, nombre, email, tipo } = req.body;
                const addEmpleado = await pool.query(
                    "INSERT INTO empleado(id_empleado, password, nombre, email, tipo) VALUES($1,$2,$3,$4,$5) RETURNING *",
                    [id_empleado, password, nombre, email, tipo]
                );
                //res.json(addEmpleado.rows[0]);
                res.status(200).send({ code: 1, result: addEmpleado.rows[0] });
            }
        });
        //res.status(200).send({ code: 1, result: addEmpleado.rows[0] });

    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });

    }
});

router.get("/getAllEmpleados", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const getAllEmpleados = await pool.query(
                    "SELECT id_empleado, password, nombre, tipo FROM empleado"
                );
                //res.json(getAllEmpleados.rows);
                res.status(200).send({ code: 1, result: getAllEmpleados.rows });
            }
        });
        //res.status(200).send({ code: 1, result: getAllEmpleados.rows });
    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });

    }
});

router.post("/getEmpleado", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { id_empleado } = req.body;
                const getEmpleado = await pool.query(
                    "SELECT id_empleado, password, nombre, tipo FROM empleado WHERE id_empleado = $1",
                    [id_empleado]
                );
                //res.json(getEmpleado.rows[0]);
                res.status(200).send({ code: 1, result: getEmpleado.rows[0] });
            }
        });
        //res.status(200).send({ code: 1, result: getEmpleado.rows[0] });

    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.post("/searchEmpleado", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { busqueda } = req.body;
                const response = await pool.query(
                    `
                    SELECT id_empleado, password, nombre FROM empleado
                    where nombre ilike  '%'|| $1 || '%'
                    `,
                    [busqueda]
                )
                //res.json(response.rows);
                res.status(200).send({ code: 1, result: response.rows });
            }
        });
        //res.status(200).send({ code: 1, result: response.rows });

    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.put("/updateEmpleado", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { id_empleado, password, nombre, email, tipo } = req.body;
                const updateEmpleado = await pool.query(
                    "UPDATE empleado SET password = $1, nombre = $2, email = $3, tipo = $4 WHERE id_empleado = $5",
                    [password, nombre, email, tipo, id_empleado]
                );
                const getEmpleado = await pool.query(
                    "SELECT id_empleado, password, nombre FROM empleado WHERE id_empleado = $1",
                    [id_empleado]
                );
                //res.json(getEmpleado.rows[0]);
                res.status(200).send({ code: 1, result: getEmpleado.rows[0] });
            }
        });
        //res.status(200).send({ code: 1, result: getEmpleado.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.delete("/deleteEmpleado", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { id_empleado } = req.body;
                const deleteEmpleado = await pool.query(
                    "DELETE FROM empleado WHERE id_empleado = $1",
                    [id_empleado]
                );
                //res.json("Empleado was deleted!");
                res.status(200).send({ code: 1, result: "Empleado was deleted!" });
            }
        });
        //res.status(200).send({ code: 1, result: "Empleado was deleted!" });
    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

module.exports = router;