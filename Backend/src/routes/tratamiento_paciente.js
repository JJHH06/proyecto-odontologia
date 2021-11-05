const { Router } = require('express');
const router = Router();
const pool = require("./db");
const jwt = require("jsonwebtoken");

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

router.post("/getTratamientoByPieza", verifyToken, async (req, res) => {
    try {
        const { no_pieza, id_paciente } = req.body;
        const getTratamientoByPieza = await pool.query(
            `select tp.id_tratamiento_paciente, tp.id_tratamiento, no_pieza, tp.seccion, t.nombre as nombre_tratamiento from tratamientos_paciente tp
            inner join tratamiento t on t.id_tratamiento = tp.id_tratamiento
            and tp.no_pieza::integer = $1 and tp.id_paciente::integer = $2`,
            [no_pieza, id_paciente]
        );
        jwt.verify(req.token, 'secretKey', (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                res.status(200).send({ code: 1, result: getTratamientoByPieza.rows });
            }
        });
        //res.status(200).send({ code: 1, result: getTratamientoByPieza.rows });
    } catch (err) {
        console.error(err.message)
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.post("/getTratamientos", verifyToken, async (req, res) => {
    try {
        const { id_paciente } = req.body;
        const getTratamientos = await pool.query(
            `select t.nombre as tratamiento, count(*) from tratamientos_paciente tp inner join tratamiento t
            on t.id_tratamiento = tp.id_tratamiento where id_paciente = $1 group by t.id_tratamiento, t.nombre`,
            [id_paciente]
        );
        jwt.verify(req.token, 'secretKey', (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                res.status(200).send({ code: 1, result: getTratamientos.rows });
            }
        });
        //res.status(200).send({ code: 1, result: getTratamientos.rows });

    } catch (err) {
        console.error(err.message)
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.post("/getTratamientos2", verifyToken, async (req, res) => {
    try {
        const { id_paciente } = req.body;
        const getTratamientos = await pool.query(
            `select count(*) as value, t.nombre as label from tratamientos_paciente tp inner join tratamiento t
            on t.id_tratamiento = tp.id_tratamiento where id_paciente = $1 group by t.id_tratamiento, t.nombre`,
            [id_paciente]
        );
        jwt.verify(req.token, 'secretKey', (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                res.status(200).send({ code: 1, result: getTratamientos.rows });
            }
        });
        //res.status(200).send({ code: 1, result: getTratamientos.rows });

    } catch (err) {
        console.error(err.message)
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.post("/addTratamiento", verifyToken, async (req, res) => {
    try {
        const { idTratamiento, noPieza, idPaciente, seccion } = req.body;
        const addTratamiento = await pool.query(
            `INSERT INTO tratamientos_paciente (id_tratamiento, no_pieza, id_paciente, seccion)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [idTratamiento, noPieza, idPaciente, seccion]
        );

        jwt.verify(req.token, 'secretKey', (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                res.status(200).send({ code: 1, result: addTratamiento.rows[0] });
            }
        });
    } catch (err) {
        console.error(err.message)
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.delete("/deleteTratamiento", verifyToken, async (req, res) => {
    try {
        const { idTratamientoPaciente } = req.body;
        const deleteTratamiento = await pool.query(
            `DELETE FROM tratamientos_paciente WHERE id_tratamiento_paciente = $1`,
            [idTratamientoPaciente]
        );

        jwt.verify(req.token, 'secretKey', (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                res.status(200).send({ code: 1, result: "Tratamiento was deleted!" });
            }
        });
    } catch (err) {
        console.error(err.message)
        res.status(200).send({ code: 0, error: err.message });
    }
});

module.exports = router;