const { Router } = require('express');
const router = Router();
const pool = require("./db");
const jwt = require("jsonwebtoken");


router.post("/validate_login", async (req, res) => {
    try {
        const { id_attemp, pass_attemp } = req.body;
        const validate_login = await pool.query(
            "SELECT validate_login($1,$2)",
            [id_attemp, pass_attemp]
        );
        //res.json(validate_login.rows[0]);
        const user = {
            id_attemp,
            pass_attemp
        }
        //console.log(validate_login.rows[0].validate_login)
        if (validate_login.rows[0].validate_login) {
            jwt.sign({ user }, 'secretKey', { expiresIn: "24h" }, (err, token) => {
                validate_login.rows[0].token = token;
                res.status(200).send({ code: 1, result: validate_login.rows[0] });
            });
        } else {
            res.status(200).send({ code: 1, result: validate_login.rows[0] });
        }


    } catch (err) {
        console.error(err.message);
        res.status(200).send({ code: 0, error: err.message });
    }
});

module.exports = router;