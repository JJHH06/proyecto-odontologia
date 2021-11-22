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

router.post("/addItem", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                var { nombre_item, cantidad } = req.body;

                moment.locale('es');
                var ultima_fecha = moment().format('L');    // 05/09/2021
                // console.log(ultima_fecha)


                var date = ultima_fecha;

                // change format from dd/mm/yyyy to mm/dd/yyyy
                var date_array = date.split('/');
                var ultima_fecha = date_array[1] + '/' + date_array[0] + '/' + date_array[2];
                // console.log(ultima_fecha)

                const addItem = await pool.query(
                    "INSERT INTO inventario(nombre_item, cantidad, ultima_fecha) VALUES($1,$2,$3)",
                    [nombre_item, cantidad, ultima_fecha]
                );

                //res.json(addItem.rows[0]);

                res.status(200).send({ code: 1, result: addItem.rows[0] });
            }
        });
        //res.status(200).send({ code: 1, result: addItem.rows[0] });

    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});


router.post("/getAllItems", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
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
            }
        });
        //res.status(200).send({ code: 1, result: getAllItems.rows });

    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.post("/getItemByNameById", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { nombre_item } = req.body;
                const getItemByName = await pool.query(
                    `SELECT * 
            FROM inventario WHERE nombre_item = $1`,
                    [nombre_item]
                );

                for (var i = 0; i < getItemByName.rows.length; i++) {
                    if (getItemByName.rows[i].ultima_fecha != null) {
                        var date = getItemByName.rows[i].ultima_fecha.toString();
                        date = new Date(date).toISOString().substr(0, 10);
                        var datePart = date.match(/\d+/g);
                        year = datePart[0],
                            month = datePart[1], day = datePart[2]
                        getItemByName.rows[i].ultima_fecha = day + '/' + month + '/' + year;
                    }
                }

                //res.json(getItemByName.rows[0]);
                //console.log(getItemByName.rows[0])
                res.status(200).send({ code: 1, result: getItemByName.rows[0] });
            }
        });
        //res.status(200).send({ code: 1, result: getItemByName.rows[0] });

    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});


router.post("/getItemByName", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { nombre_item } = req.body;
                const getItemByName = await pool.query(
                    `SELECT * 
                    FROM inventario WHERE nombre_item ilike  '%'|| $1 || '%'`,
                    [nombre_item]
                );

                for (var i = 0; i < getItemByName.rows.length; i++) {
                    if (getItemByName.rows[i].ultima_fecha != null) {
                        var date = getItemByName.rows[i].ultima_fecha.toString();
                        date = new Date(date).toISOString().substr(0, 10);
                        var datePart = date.match(/\d+/g);
                        year = datePart[0],
                            month = datePart[1], day = datePart[2]
                        getItemByName.rows[i].ultima_fecha = day + '/' + month + '/' + year;
                    }
                }

                //res.json(getItemByName.rows[0]);
                //console.log(getItemByName.rows[0])

                res.status(200).send({ code: 1, result: getItemByName.rows[0] });
            }
        });
        //res.status(200).send({ code: 1, result: getItemByName.rows[0] });

    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.put("/upadteItem", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { id_item } = req.body;
                const { nombre_item, cantidad } = req.body;

                moment.locale('es');
                var ultima_fecha = moment().format('L');    // 05/09/2021

                var date = ultima_fecha;
                date = new Date(date).toISOString().substr(0, 10);
                var datePart = date.match(/\d+/g);
                year = datePart[0],
                    month = datePart[1], day = datePart[2]
                ultima_fecha = day + '/' + month + '/' + year;
                //console.log(ultima_fecha)

                const upadteItem = await pool.query(
                    `UPDATE inventario SET nombre_item=$1, cantidad=$2, ultima_fecha=$3
                    WHERE id_item = $4`,
                    [nombre_item, cantidad, ultima_fecha, id_item]
                );


                const getItem = await pool.query(
                    `SELECT * 
                    FROM inventario WHERE id_item = $1`,
                    [id_item]
                );

                for (var i = 0; i < getItem.rows.length; i++) {
                    if (getItem.rows[i].ultima_fecha != null) {
                        var date = getItem.rows[i].ultima_fecha.toString();
                        date = new Date(date).toISOString().substr(0, 10);
                        var datePart = date.match(/\d+/g);
                        year = datePart[0],
                            month = datePart[1], day = datePart[2]
                        getItem.rows[i].ultima_fecha = day + '/' + month + '/' + year;
                    }
                }

                //res.json(getItem.rows[0]);
                res.status(200).send({ code: 1, result: getItem.rows[0] });
            }
        });
        //res.status(200).send({ code: 1, result: getItem.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

router.delete("/deleteItem", verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            //console.log("token", req.token, "token")
            if (error) {
                console.log("error", error)
                res.sendStatus(401);
            } else {
                const { id_item } = req.body;
                const deleteItem = await pool.query(
                    `DELETE FROM inventario WHERE id_item = $1`,
                    [id_item]
                );
                //res.json("Item was deleted!");

                res.status(200).send({ code: 1, result: "Item was deleted!" });
            }
        });
        //res.status(200).send({ code: 1, result: "Item was deleted!" });
    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

module.exports = router;