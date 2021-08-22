const { Router } = require('express');
const router = Router();
const pool = require("./db");

router.get("/getTratamientoByPieza", async (req, res) => {
    try {
        const { no_pieza, id_paciente } = req.body;
        const getTratamientoByPieza = await pool.query(
            `select no_pieza, tp.seccion, t.nombre as nombre_tratamiento from tratamientos_paciente tp
            inner join tratamiento t on t.id_tratamiento = tp.id_tratamiento
            and tp.no_pieza::integer = $1 and tp.id_paciente::integer = $2`,
            [no_pieza, id_paciente]
        );
        res.status(200).send({ code: 1, result: getTratamientoByPieza.rows });
    } catch (err) {
        console.error(err.message)
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.get("/getTratamientos", async (req, res) => {
    try {
        const { id_paciente } = req.body;
        const getTratamientos = await pool.query(
            `select t.nombre as tratamiento, count(*)  from tratamientos_paciente tp inner join tratamiento t
            on t.id_tratamiento = tp.id_tratamiento where id_paciente = $1 group by t.id_tratamiento, t.nombre`,
            [id_paciente]
        );
        res.json(getTratamientos.rows);
    } catch (err) {
        console.error(err.message)
    }
});

module.exports = router;