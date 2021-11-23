const { Router } = require('express');
const router = Router();
const pool = require("./db");
const moment = require('moment');
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

router.post("/addTratamiento", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { nombre, precio } = req.body;
                const addTratamiento = await pool.query(
                    "INSERT INTO tratamiento(nombre, precio) VALUES($1,$2) RETURNING *",
                    [nombre, precio]
                );
                res.status(200).send({ code: 1, result: addTratamiento.rows[0] });
            }
        });
    } catch (err) {
        console.error(err.message);
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
                const getAllTratamientos = await pool.query(
                    "SELECT * FROM tratamiento"
                );
                res.status(200).send({ code: 1, result: getAllTratamientos.rows });
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.post("/getTratamiento", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { id_tratamiento } = req.body;
                const getTratamiento = await pool.query(
                    "SELECT id_tratamiento, nombre, precio FROM tratamiento WHERE id_tratamiento = $1",
                    [id_tratamiento]
                );
                res.status(200).send({ code: 1, result: getTratamiento.rows[0] });
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.post("/searchTratamiento", verifyToken, async (req, res) => {
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
                    SELECT id_tratamiento, nombre, precio FROM tratamiento
                    where nombre ilike  '%'|| $1 || '%'
                    `,
                    [busqueda]
                )
                res.status(200).send({ code: 1, result: response.rows });
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.put("/updateTratamiento", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { id_tratamiento, nombre, precio } = req.body;
                const updateTratamiento = await pool.query(
                    "UPDATE tratamiento SET nombre = $1, precio = $2 WHERE id_tratamiento = $3",
                    [nombre, precio, id_tratamiento]
                );
                const getTratamiento = await pool.query(
                    "SELECT id_tratamiento, nombre, precio FROM tratamiento WHERE id_tratamiento = $1",
                    [id_tratamiento]
                );
                res.status(200).send({ code: 1, result: getTratamiento.rows[0] });
            }
        });
    } catch (err) {
        console.error(err.message);
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
                const { id_tratamiento } = req.body;
                const deleteTratamiento = await pool.query(
                    "DELETE FROM tratamiento WHERE id_tratamiento = $1",
                    [id_tratamiento]
                );
                res.status(200).send({ code: 1, result: "Tratamiento was deleted!" });
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

module.exports = router;