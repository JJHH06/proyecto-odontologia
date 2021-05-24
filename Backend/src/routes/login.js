const {Router} = require('express');
const router = Router();
const pool = require("./db");

router.post("/validate_login", async(req,res) => {
    try {
        const {id_attemp,pass_attemp} = req.body;
        const validate_login = await pool.query(
            "SELECT validate_login($1,$2)",
            [id_attemp,pass_attemp]
        );
        res.json(validate_login.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;