const {Router} = require('express');
const router = Router();
const pool = require("./db");

router.post("/addEmpleado", async(req,res) => {
    try {
        const {id_empleado,password,nombre} = req.body;
        const addEmpleado = await pool.query(
            "INSERT INTO empleado(id_empleado, password, nombre) VALUES($1,$2,$3) RETURNING *",
            [id_empleado, password, nombre]
        );
        res.json(addEmpleado.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/getAllEmpleados", async(req,res) => {
    try {
        const getAllEmpleados = await pool.query(
            "SELECT id_empleado, password, nombre FROM empleado"
        );
        res.json(getAllEmpleados.rows);
    } catch (err) {
        console.error(err.message);
    }
});
/*
router.get("/getEmpleado/:id", async(req,res) => {
    try {
        const {id_empleado} = req.params;
        const getEmpleado = await pool.query(
            "SELECT id_empleado, password, nombre FROM empleado WHERE id_empleado = $1",
            [id_empleado]
        );
        res.json(getEmpleado.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});*/



module.exports = router;