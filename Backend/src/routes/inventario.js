const { Router } = require('express');
const router = Router();
const pool = require("./db");
const moment = require('moment');

router.post("/addItem", async (req, res) => {
    try {
        var { nombre_item, cantidad } = req.body;

        moment.locale('es');
        var ultima_fecha = moment().format('L');    // 05/09/2021

        var date = ultima_fecha;
        date = new Date(date).toISOString().substr(0, 10);
        var datePart = date.match(/\d+/g);
        year = datePart[0],
            month = datePart[1], day = datePart[2]
        ultima_fecha = day + '/' + month + '/' + year;
        //console.log(ultima_fecha)

        const addItem = await pool.query(
            "INSERT INTO inventario(nombre_item, cantidad, ultima_fecha) VALUES($1,$2,$3)",
            [nombre_item, cantidad, ultima_fecha]
        );

        for (var i = 0; i < addItem.rows.length; i++) {
            if (addItem.rows[i].ultima_fecha != null) {
                var date = addItem.rows[i].ultima_fecha.toString();
                date = new Date(date).toISOString().substr(0, 10);
                var datePart = date.match(/\d+/g);
                year = datePart[0],
                    month = datePart[1], day = datePart[2]
                addItem.rows[i].ultima_fecha = day + '/' + month + '/' + year;
            }
        }

        //res.json(addItem.rows[0]);
        res.status(200).send({ code: 1, result: addItem.rows[0] });

    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});


router.post("/getAllItems", async (req, res) => {
    try {
        const getAllItems = await pool.query(
            `SELECT * 
            FROM inventario`
        )

        for (var i = 0; i < getAllItems.rows.length; i++) {
            if (getAllItems.rows[i].ultima_fecha != null) {
                var date = getAllItems.rows[i].ultima_fecha.toString();
                date = new Date(date).toISOString().substr(0, 10);
                var datePart = date.match(/\d+/g);
                year = datePart[0],
                    month = datePart[1], day = datePart[2]
                getAllItems.rows[i].ultima_fecha = day + '/' + month + '/' + year;
            }
        }

        res.status(200).send({ code: 1, result: getAllItems.rows });

    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});


module.exports = router;