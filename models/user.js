const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        required: true
    },
    last_date: {
        type: Date
    },
    state: {
        type: String,
        required: true
    },
    is_goin: {
        type: Boolean,
        required: true
    },
    ip_last_access: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    transaction: [{
        type: {
            type: String,
            required: true
        },
        concept: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    }]

});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, name: this.name },
        process.env.JWTPRIVATEKEY
    );
    return token;
};

const User = mongoose.model("user", userSchema);

module.exports = { User };