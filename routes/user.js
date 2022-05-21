const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const requestIp = require('request-ip')

router.post("/", async(req, res) => {
    try {
        req.body.creation_date = Date.now()
        req.body.last_date = Date.now()
        req.body.state = 'active'
        req.body.ip_last_access = requestIp.getClientIp(req)
        req.body.role = 'user'
        req.body.trasaction = []

        const user = new User(req.body);

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        res.send(user);
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
});

router.get("/:user", async(req, res) => {
    let userName = req.params.user;
    console.log(userName);

    try {

        if (userName != '') {
            const user = await User.findOne({ "username": userName });
            if (!user) return res.status(400).send("This user not exist.");
            console.log(user);
            res.send(user);
        }
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
});

module.exports = router;