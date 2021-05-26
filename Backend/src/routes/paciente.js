const {Router} = require('express');
const router = Router();
const pool = require("./db");

router.post("/addPaciente", async(req,res) => {
    try {
        const {nombre,telefono_casa,telefono_celular,fecha_nacimiento,estado_civil,ocupacion,direccion,recomendado_por,visita_anterior_dentista,motivo_consulta,medico,telefono_medico,contacto_emergencia,telefono_emergencia,abonos} = req.body;
        const addPaciente = await pool.query(
            "INSERT INTO paciente(nombre,telefono_casa,telefono_celular,fecha_nacimiento,estado_civil,ocupacion,direccion,recomendado_por,visita_anterior_dentista,motivo_consulta,medico,telefono_medico,contacto_emergencia,telefono_emergencia,abonos) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *",
            [nombre, telefono_casa, telefono_celular, fecha_nacimiento, estado_civil, ocupacion, direccion, recomendado_por, visita_anterior_dentista, motivo_consulta, medico, telefono_medico, contacto_emergencia, telefono_emergencia, abonos]
        );
        res.json(addPaciente.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/searchPaciente", async(req,res) => {
    try {
        const {busqueda} = req.body;
        const response = await pool.query(
            `
            select *, Extract(year from age(fecha_nacimiento)) as edad from paciente
            where nombre ilike  '%'|| $1 || '%'
            `,
            [busqueda]
        )
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/getAllPacientes", async(req,res) => {
    try {
        const getAllPacientes = await pool.query(
            `SELECT id_paciente, nombre, telefono_casa, telefono_celular, fecha_nacimiento, estado_civil, ocupacion, direccion, recomendado_por, visita_anterior_dentista, motivo_consulta, medico, telefono_medico, contacto_emergencia, telefono_emergencia, abonos 
            FROM paciente`
        )
        res.json(getAllPacientes.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/getPaciente", async(req,res) => {
    try {
        const {id_paciente} = req.body;
        const getPaciente = await pool.query(
            `SELECT id_paciente, nombre, telefono_casa, telefono_celular, fecha_nacimiento, estado_civil, ocupacion, direccion, recomendado_por, visita_anterior_dentista, motivo_consulta, medico, telefono_medico, contacto_emergencia, telefono_emergencia, abonos 
            FROM paciente WHERE id_paciente = $1`,
            [id_paciente]
        );
        res.json(getPaciente.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.put("/updatePaciente", async(req,res) => {
    try {
        const {id_paciente} = req.body;
        const {nombre,telefono_casa,telefono_celular,fecha_nacimiento,estado_civil,ocupacion,direccion,recomendado_por,visita_anterior_dentista,motivo_consulta,medico,telefono_medico,contacto_emergencia,telefono_emergencia,abonos} = req.body;
        const updatePaciente = await pool.query(
            `UPDATE paciente SET nombre=$1, telefono_casa=$2, telefono_celular=$3, fecha_nacimiento=$4, estado_civil=$5, ocupacion=$6, direccion=$7, recomendado_por=$8, visita_anterior_dentista=$9, motivo_consulta=$10, medico=$11, telefono_medico=$12, contacto_emergencia=$13, telefono_emergencia=$14, abonos=$15
            WHERE id_paciente = $16`,
            [nombre,telefono_casa,telefono_celular,fecha_nacimiento,estado_civil,ocupacion,direccion,recomendado_por,visita_anterior_dentista,motivo_consulta,medico,telefono_medico,contacto_emergencia,telefono_emergencia,abonos,id_paciente]
        );
        const getPaciente = await pool.query(
            `SELECT id_paciente, nombre, telefono_casa, telefono_celular, fecha_nacimiento, estado_civil, ocupacion, direccion, recomendado_por, visita_anterior_dentista, motivo_consulta, medico, telefono_medico, contacto_emergencia, telefono_emergencia, abonos 
            FROM paciente WHERE id_paciente = $1`,
            [id_paciente]
        );
        res.json(getPaciente.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.delete("/deletePaciente", async(req,res) => {
    try {
        const {id_paciente} = req.body;
        const deletePaciente = await pool.query(
            `DELETE FROM paciente WHERE id_paciente = $1`,
            [id_paciente]
        );
        res.json("Paciente was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});
module.exports = router;