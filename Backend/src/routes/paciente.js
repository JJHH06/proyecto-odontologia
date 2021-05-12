const {Router} = require('express');
const router = Router();
const pool = require("./db");

router.post("/addPaciente", async(req,res) => {
    try {
        const {nombre,telefono_casa,telefono_celular,fecha_nacimiento,estado_civil,ocupacion,direccion,recomendado_por,visita_anterior_dentista,motivo_consulta,medico,telefono_medico,contacto_emergencia,telefono_emergencia} = req.body;
        const addPaciente = await pool.query(
            "INSERT INTO paciente(nombre,telefono_casa,telefono_celular,fecha_nacimiento,estado_civil,ocupacion,direccion,recomendado_por,visita_anterior_dentista,motivo_consulta,medico,telefono_medico,contacto_emergencia,telefono_emergencia) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *",
            [nombre,telefono_casa,telefono_celular,fecha_nacimiento,estado_civil,ocupacion,direccion,recomendado_por,visita_anterior_dentista,motivo_consulta,medico,telefono_medico,contacto_emergencia,telefono_emergencia]
        )
        res.json(addPaciente.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/getAllPacientes", async(req,res) => {
    try {
        const getAllPacientes = await pool.query(
            "SELECT id_paciente, nombre, telefono_casa, telefono_celular, fecha_nacimiento, estado_civil, ocupacion, direccion, recomendado_por, visita_anterior_dentista, motivo_consulta, medico, telefono_medico, contacto_emergencia, telefono_emergencia FROM paciente"
        )
        res.json(getAllPacientes.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/getPaciente", async(req,res) => {
    try {
        
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;