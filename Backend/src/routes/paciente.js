const { Router } = require('express');
const router = Router();
const pool = require("./db");

router.post("/addPaciente", async (req, res) => {
    try {
        const { nombre, email, telefono_casa, telefono_celular, fecha_nacimiento, estado_civil, ocupacion, direccion, recomendado_por, visita_anterior_dentista, motivo_consulta, medico, telefono_medico, contacto_emergencia, telefono_emergencia, presupuesto, medicamentos } = req.body;
        //console.log(req.body)

        var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
        if ((fecha_nacimiento.match(RegExPattern)) && (fecha_nacimiento != '')) {

            if ((visita_anterior_dentista.match(RegExPattern)) && (visita_anterior_dentista != '')) {
                const addPaciente = await pool.query(
                    "INSERT INTO paciente(nombre,email,telefono_casa,telefono_celular,fecha_nacimiento,estado_civil,ocupacion,direccion,recomendado_por,visita_anterior_dentista,motivo_consulta,medico,telefono_medico,contacto_emergencia,telefono_emergencia,presupuesto,medicamentos) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *",
                    [nombre, email, telefono_casa, telefono_celular, fecha_nacimiento, estado_civil, ocupacion, direccion, recomendado_por, visita_anterior_dentista, motivo_consulta, medico, telefono_medico, contacto_emergencia, telefono_emergencia, presupuesto, medicamentos]
                );
                res.status(200).send({ code: 1, result: addPaciente.rows[0] });
            } else {
                const addPaciente = await pool.query(
                    "INSERT INTO paciente(nombre,email,telefono_casa,telefono_celular,fecha_nacimiento,estado_civil,ocupacion,direccion,recomendado_por,motivo_consulta,medico,telefono_medico,contacto_emergencia,telefono_emergencia,presupuesto,medicamentos) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *",
                    [nombre, email, telefono_casa, telefono_celular, fecha_nacimiento, estado_civil, ocupacion, direccion, recomendado_por, motivo_consulta, medico, telefono_medico, contacto_emergencia, telefono_emergencia, presupuesto, medicamentos]
                );
                res.status(200).send({ code: 1, result: addPaciente.rows[0] });
            }
        } else {
            if ((visita_anterior_dentista.match(RegExPattern)) && (visita_anterior_dentista != '')) {
                const addPaciente = await pool.query(
                    "INSERT INTO paciente(nombre,email,telefono_casa,telefono_celular,estado_civil,ocupacion,direccion,recomendado_por,visita_anterior_dentista,motivo_consulta,medico,telefono_medico,contacto_emergencia,telefono_emergencia,presupuesto,medicamentos) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *",
                    [nombre, email, telefono_casa, telefono_celular, estado_civil, ocupacion, direccion, recomendado_por, visita_anterior_dentista, motivo_consulta, medico, telefono_medico, contacto_emergencia, telefono_emergencia, presupuesto, medicamentos]
                );
                res.status(200).send({ code: 1, result: addPaciente.rows[0] });
            } else {
                const addPaciente = await pool.query(
                    "INSERT INTO paciente(nombre,email,telefono_casa,telefono_celular,estado_civil,ocupacion,direccion,recomendado_por,motivo_consulta,medico,telefono_medico,contacto_emergencia,telefono_emergencia,presupuesto,medicamentos) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *",
                    [nombre, email, telefono_casa, telefono_celular, estado_civil, ocupacion, direccion, recomendado_por, motivo_consulta, medico, telefono_medico, contacto_emergencia, telefono_emergencia, presupuesto, medicamentos]
                );
                res.status(200).send({ code: 1, result: addPaciente.rows[0] });
            }
        }
    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.post("/searchPaciente", async (req, res) => {
    try {
        const { busqueda } = req.body;
        const response = await pool.query(
            `
            select *, Extract(year from age(fecha_nacimiento)) as edad, getPadecimientos(id_paciente) as padecimientos from paciente
            where nombre ilike  '%'|| $1 || '%'
            `,
            [busqueda]
        )

        for (var i = 0; i < response.rows.length; i++) {
            if (response.rows[i].fecha_nacimiento != null) {
                var date = response.rows[i].fecha_nacimiento.toString();
                date = new Date(date).toISOString().substr(0, 10);
                var datePart = date.match(/\d+/g);
                year = datePart[0],
                    month = datePart[1], day = datePart[2]
                response.rows[i].fecha_nacimiento = day + '/' + month + '/' + year;
            }
        }

        for (var i = 0; i < response.rows.length; i++) {
            if (response.rows[i].visita_anterior_dentista != null) {
                var date = response.rows[i].visita_anterior_dentista.toString();
                year = new Date(date).getFullYear();
                date = new Date(date);

                var month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);
                var fechaFinal = month + ', ' + year;
                response.rows[i].visita_anterior_dentista = fechaFinal;
            }
        }

        //console.log(response.rows);
        //res.json(response.rows);
        res.status(200).send({ code: 1, result: response.rows });

    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.get("/getAllPacientes", async (req, res) => {
    try {
        const getAllPacientes = await pool.query(
            `SELECT * 
            FROM paciente`
        )

        for (var i = 0; i < getAllPacientes.rows.length; i++) {
            if (getAllPacientes.rows[i].fecha_nacimiento != null) {
                var date = getAllPacientes.rows[i].fecha_nacimiento.toString();
                date = new Date(date).toISOString().substr(0, 10);
                var datePart = date.match(/\d+/g);
                year = datePart[0],
                    month = datePart[1], day = datePart[2]
                getAllPacientes.rows[i].fecha_nacimiento = day + '/' + month + '/' + year;
            }
        }

        for (var i = 0; i < getAllPacientes.rows.length; i++) {
            if (getAllPacientes.rows[i].visita_anterior_dentista != null) {
                var date = getAllPacientes.rows[i].visita_anterior_dentista.toString();
                year = new Date(date).getFullYear();
                date = new Date(date);

                var month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);
                var fechaFinal = month + ', ' + year;
                getAllPacientes.rows[i].visita_anterior_dentista = fechaFinal;
            }
        }

        res.status(200).send({ code: 1, result: getAllPacientes.rows });

    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.get("/getPaciente", async (req, res) => {
    try {
        const { id_paciente } = req.body;
        const getPaciente = await pool.query(
            `SELECT * 
            FROM paciente WHERE id_paciente = $1`,
            [id_paciente]
        );

        for (var i = 0; i < getPaciente.rows.length; i++) {
            if (getPaciente.rows[i].fecha_nacimiento != null) {
                var date = getPaciente.rows[i].fecha_nacimiento.toString();
                date = new Date(date).toISOString().substr(0, 10);
                var datePart = date.match(/\d+/g);
                year = datePart[0],
                    month = datePart[1], day = datePart[2]
                getPaciente.rows[i].fecha_nacimiento = day + '/' + month + '/' + year;
            }
        }

        for (var i = 0; i < getPaciente.rows.length; i++) {
            if (getPaciente.rows[i].visita_anterior_dentista != null) {
                var date = getPaciente.rows[i].visita_anterior_dentista.toString();
                year = new Date(date).getFullYear();
                date = new Date(date);

                var month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);
                var fechaFinal = month + ', ' + year;
                getPaciente.rows[i].visita_anterior_dentista = fechaFinal;
            }
        }

        //res.json(getPaciente.rows[0]);
        res.status(200).send({ code: 1, result: getPaciente.rows[0] });

    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.put("/updatePaciente", async (req, res) => {
    try {
        const { id_paciente } = req.body;
        const { nombre, telefono_casa, telefono_celular, fecha_nacimiento, estado_civil, ocupacion, direccion, recomendado_por, visita_anterior_dentista, motivo_consulta, medico, telefono_medico, contacto_emergencia, telefono_emergencia, presupuesto, medicamentos } = req.body;
        const updatePaciente = await pool.query(
            `UPDATE paciente SET nombre=$1, telefono_casa=$2, telefono_celular=$3, fecha_nacimiento=$4, estado_civil=$5, ocupacion=$6, direccion=$7, recomendado_por=$8, visita_anterior_dentista=$9, motivo_consulta=$10, medico=$11, telefono_medico=$12, contacto_emergencia=$13, telefono_emergencia=$14, presupuesto=$15, medicamentos=$16
            WHERE id_paciente = $17`,
            [nombre, telefono_casa, telefono_celular, fecha_nacimiento, estado_civil, ocupacion, direccion, recomendado_por, visita_anterior_dentista, motivo_consulta, medico, telefono_medico, contacto_emergencia, telefono_emergencia, presupuesto, medicamentos, id_paciente]
        );
        const getPaciente = await pool.query(
            `SELECT * 
            FROM paciente WHERE id_paciente = $1`,
            [id_paciente]
        );
        //res.json(getPaciente.rows[0]);
        res.status(200).send({ code: 1, result: getPaciente.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.delete("/deletePaciente", async (req, res) => {
    try {
        const { id_paciente } = req.body;
        const deletePaciente = await pool.query(
            `DELETE FROM paciente WHERE id_paciente = $1`,
            [id_paciente]
        );
        //res.json("Paciente was deleted!");
        res.status(200).send({ code: 1, result: "Paciente was deleted!" });
    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});
module.exports = router;