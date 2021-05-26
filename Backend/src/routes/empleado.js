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

router.get("/getEmpleado", async(req,res) => {
    try {
        const {id_empleado} = req.body;
        const getEmpleado = await pool.query(
            "SELECT id_empleado, password, nombre FROM empleado WHERE id_empleado = $1",
            [id_empleado]
        );
        res.json(getEmpleado.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/searchEmpleado", async(req,res) => {
    try {
        const {busqueda} = req.body;
        const response = await pool.query(
            `
            SELECT id_empleado, password, nombre FROM empleado
            where nombre ilike  '%'|| $1 || '%'
            `,
            [busqueda]
        )
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.put("/updateEmpleado", async(req,res) => {
    try {
        const {id_empleado} = req.body;
        const {password,nombre} = req.body;
        const updateEmpleado = await pool.query(
            "UPDATE empleado SET password = $1, nombre = $2 WHERE id_empleado = $3",
            [password,nombre,id_empleado]
        );
        const getEmpleado = await pool.query(
            "SELECT id_empleado, password, nombre FROM empleado WHERE id_empleado = $1",
            [id_empleado]
        );
        res.json(getEmpleado.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.delete("/deleteEmpleado", async(req,res) => {
    try {
        const {id_empleado} = req.body;
        const deleteEmpleado = await pool.query(
            "DELETE FROM empleado WHERE id_empleado = $1",
            [id_empleado]
        );
        res.json("Empleado was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;