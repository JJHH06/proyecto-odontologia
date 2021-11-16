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

router.post("/addCita", verifyToken, async (req, res) => {
    try {
        const { paciente, fecha, hora_inicio, hora_final, estado_cita, no_unidad } = req.body;
        const addCita = await pool.query(
            "INSERT INTO cita(paciente, fecha, hora_inicio, hora_final, estado_cita, no_unidad) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
            [paciente, fecha, hora_inicio, hora_final, estado_cita, no_unidad]
        );
        //res.json(addCita.rows[0]);
        jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                res.status(200).send({ code: 1, result: addCita.rows[0] });
            }
        });
        //res.status(200).send({ code: 1, result: addCita.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.post("/searchCitaByDate", verifyToken, async (req, res) => {
    try {
        const { fecha, no_unidad } = req.body;
        const response = await pool.query(
            `
            select c.*,p.nombre as nombre_paciente from cita c
            left join paciente p on p.id_paciente = c.paciente
            where fecha = $1 and no_unidad = $2
            `,
            [fecha, no_unidad]
        )

        for (var i = 0; i < response.rows.length; i++) {
            var date = response.rows[i].fecha.toString()
            date = new Date(date).toISOString().substr(0, 10)
            var datePart = date.match(/\d+/g);
            year = datePart[0], // get only two digits
                month = datePart[1], day = datePart[2]
            response.rows[i].fecha = day + '/' + month + '/' + year
        }

        //res.json(response.rows);
        jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                res.status(200).send({ code: 1, result: response.rows });
            }
        });
        //res.status(200).send({ code: 1, result: response.rows });
    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.get("/getAllCitas", verifyToken, async (req, res) => {
    try {
        const getAllCitas = await pool.query(
            `SELECT id_cita, paciente, fecha, hora_inicio, hora_final, estado_cita, no_unidad
            FROM cita`
        )

        for (var i = 0; i < getAllCitas.rows.length; i++) {
            var date = getAllCitas.rows[i].fecha.toString()
            date = new Date(date).toISOString().substr(0, 10)
            var datePart = date.match(/\d+/g);
            year = datePart[0], // get only two digits
                month = datePart[1], day = datePart[2]
            getAllCitas.rows[i].fecha = day + '/' + month + '/' + year
        }
        //console.log(getAllCitas.rows)
        //res.json(getAllCitas.rows);
        jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                res.status(200).send({ code: 1, result: getAllCitas.rows });
            }
        });
        //res.status(200).send({ code: 1, result: getAllCitas.rows });

    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });

    }
});

router.post("/getCitaByID", verifyToken, async (req, res) => {
    try {
        const { id_cita } = req.body;
        const getCita = await pool.query(
            "SELECT * FROM cita WHERE id_cita = $1",
            [id_cita]
        );

        for (var i = 0; i < getCita.rows.length; i++) {
            var date = getCita.rows[i].fecha.toString()
            date = new Date(date).toISOString().substr(0, 10)
            var datePart = date.match(/\d+/g);
            year = datePart[0], // get only two digits
                month = datePart[1], day = datePart[2]
            getCita.rows[i].fecha = day + '/' + month + '/' + year
        }

        //res.json(getCita.rows);
        jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                res.status(200).send({ code: 1, result: getCita.rows });
            }
        });
        //res.status(200).send({ code: 1, result: getCita.rows });

    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.post("/updateCita", verifyToken, async (req, res) => {
    try {
        const { id_cita, paciente, fecha, hora_inicio, hora_final, estado_cita, no_unidad, titulo_cita } = req.body;
        const updateCita = await pool.query(
            "UPDATE cita SET paciente = $1, fecha = $2, hora_inicio = $3, hora_final = $4, estado_cita = $5, no_unidad = $6, titulo_cita = $8 WHERE id_cita = $7",
            [paciente, fecha, hora_inicio, hora_final, estado_cita, no_unidad, id_cita, titulo_cita]
        );
        const getCita = await pool.query(
            "SELECT * FROM cita WHERE id_cita = $1",
            [id_cita]
        );
        //res.json(getCita.rows[0]);
        jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                res.status(200).send({ code: 1, result: getCita.rows[0] });
            }
        });
        //res.status(200).send({ code: 1, result: getCita.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.delete("/deleteCita", verifyToken, async (req, res) => {
    try {
        const { id_cita } = req.body;
        const deleteCita = await pool.query(
            `DELETE FROM cita WHERE id_cita = $1`,
            [id_cita]
        );
        //res.json("Cita was deleted!");
        jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                res.status(200).send({ code: 1, result: "Cita was deleted!" });
            }
        });
        //res.status(200).send({ code: 1, result: "Cita was deleted!" });
    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

module.exports = router;