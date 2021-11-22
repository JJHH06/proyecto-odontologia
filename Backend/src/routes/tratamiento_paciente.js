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

router.post("/getTratamientoByPieza", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { no_pieza, id_paciente } = req.body;
                const getTratamientoByPieza = await pool.query(
                    `select tp.id_tratamiento_paciente, tp.id_tratamiento, no_pieza, tp.seccion, t.nombre as nombre_tratamiento from tratamientos_paciente tp
                    inner join tratamiento t on t.id_tratamiento = tp.id_tratamiento
                    and tp.no_pieza::integer = $1 and tp.id_paciente::integer = $2`,
                    [no_pieza, id_paciente]
                );
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
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { id_paciente } = req.body;
                const getTratamientos = await pool.query(
                    `select t.nombre as tratamiento, count(*) from tratamientos_paciente tp inner join tratamiento t
                    on t.id_tratamiento = tp.id_tratamiento where id_paciente = $1 group by t.id_tratamiento, t.nombre`,
                    [id_paciente]
                );
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
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { id_paciente } = req.body;
                const getTratamientos = await pool.query(
                    `select count(*) as value, t.nombre as label from tratamientos_paciente tp inner join tratamiento t
                    on t.id_tratamiento = tp.id_tratamiento where id_paciente = $1 group by t.id_tratamiento, t.nombre`,
                    [id_paciente]
                );
                res.status(200).send({ code: 1, result: getTratamientos.rows });
            }
        });
        //res.status(200).send({ code: 1, result: getTratamientos.rows });

    } catch (err) {
        console.error(err.message)
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.get("/getAllTratamientos", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const getTratamientos = await pool.query(
                    `select id_tratamiento as value, nombre as label from tratamiento`,
                    []
                );
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
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { idTratamiento, noPieza, idPaciente, seccion } = req.body;
                const addTratamiento = await pool.query(
                    `INSERT INTO tratamientos_paciente (id_tratamiento, no_pieza, id_paciente, seccion)
                    VALUES ($1, $2, $3, $4) RETURNING *`,
                    [idTratamiento, noPieza, idPaciente, seccion]
                );
                res.status(200).send({ code: 1, result: addTratamiento.rows[0] });
            }
        });
    } catch (err) {
        console.error(err.message)
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.post("/addTratamientos", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { lista } = req.body;
                // console.log("lista", lista)

                for (let i = 0; i < lista.length; i++) {
                    const element = lista[i];
                    // console.log(element)
                    const addTratamientos = await pool.query(
                        `INSERT INTO tratamientos_paciente (id_tratamiento, no_pieza, id_paciente, seccion)
                        VALUES ($1, $2, $3, $4) RETURNING *`,
                        [element.idTratamiento, element.noPieza, element.idPaciente, element.seccion]
                    );
                }
                res.status(200).send({ code: 1, result: "Tratamientos were added!" });
            }
        });
    } catch (err) {
        console.error(err.message)
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.delete("/deleteTratamiento", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { idTratamientoPaciente } = req.body;
                const deleteTratamiento = await pool.query(
                    `DELETE FROM tratamientos_paciente WHERE id_tratamiento_paciente = $1`,
                    [idTratamientoPaciente]
                );
                res.status(200).send({ code: 1, result: "Tratamiento was deleted!" });
            }
        });
    } catch (err) {
        console.error(err.message)
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.delete("/deleteTratamientos", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { lista } = req.body;

                for (let i = 0; i < lista.length; i++) {
                    const element = lista[i];
                    const deleteTratamientos = await pool.query(
                        `DELETE FROM tratamientos_paciente WHERE id_tratamiento_paciente = $1`,
                        [element.idTratamientoPaciente]
                    );
                }
                res.status(200).send({ code: 1, result: "Tratamientos were deleted!" });
            }
        });
    } catch (err) {
        console.error(err.message)
        res.status(200).send({ code: 0, error: err.message });
    }
});

module.exports = router;