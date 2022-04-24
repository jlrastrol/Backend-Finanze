const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.post("/", async(req, res) => {
    try {

        const user = await User.findOne({ user: req.body.user });
        if (!user) return res.status(400).send("Invalid email or password");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(400).send("Invalid email or password");

        const token = user.generateAuthToken();
        res.send(token);
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
});

module.exports = router;