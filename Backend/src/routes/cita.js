const { Router } = require('express');
const router = Router();
const pool = require("./db");

router.post("/addCita", async (req, res) => {
    try {
        const { paciente, fecha, hora_inicio, hora_final, estado_cita, no_unidad } = req.body;
        const addCita = await pool.query(
            "INSERT INTO cita(paciente, fecha, hora_inicio, hora_final, estado_cita, no_unidad) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
            [paciente, fecha, hora_inicio, hora_final, estado_cita, no_unidad]
        );
        res.json(addCita.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/searchCitaByDate", async (req, res) => {
    try {
        const { fecha, no_unidad } = req.body;
        const response = await pool.query(
            `
            select * from cita
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

        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/getAllCitas", async (req, res) => {
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
        res.json(getAllCitas.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/getCitaByID", async (req, res) => {
    try {
        const { id_cita } = req.body;
        const getCita = await pool.query(
            "SELECT id_cita, paciente, fecha, hora_inicio, hora_final, estado_cita, no_unidad FROM cita WHERE id_cita = $1",
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

        res.json(getCita.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.put("/updateCita", async (req, res) => {
    try {
        const { id_cita, paciente, fecha, hora_inicio, hora_final, estado_cita, no_unidad } = req.body;
        const updateCita = await pool.query(
            "UPDATE cita SET paciente = $1, fecha = $2, hora_inicio = $3, hora_final = $4, estado_cita = $5, no_unidad = $6 WHERE id_cita = $7",
            [paciente, fecha, hora_inicio, hora_final, estado_cita, no_unidad, id_cita]
        );
        const getCita = await pool.query(
            "SELECT id_cita, paciente, fecha, hora_inicio, hora_final, estado_cita, no_unidad FROM cita WHERE id_cita = $1",
            [id_cita]
        );
        res.json(getCita.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.delete("/deleteCita", async (req, res) => {
    try {
        const { id_cita } = req.body;
        const deleteCita = await pool.query(
            `DELETE FROM cita WHERE id_cita = $1`,
            [id_cita]
        );
        res.json("Cita was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;