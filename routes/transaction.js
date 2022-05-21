const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/:user", async(req, res) => {
    let userName = req.params.user;

    try {

        if (userName != '') {
            const user = await User.findOne({ "username": userName });
            if (!user) return res.status(400).send("This user not exist.");
            console.log(user);
            res.send(user.transaction);
        }
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
});

module.exports = router;