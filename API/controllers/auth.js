require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require('../models/users');

async function register(req, res){
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt)
        await User.create({...req.body, password: hashed})
        const user = await User.findByUsername(req.body.username);
        res.status(201).json({ user: user.username, id: user.id })
    } catch (err) {
        res.status(500).json({err});
    }
}

async function login(req, res){
    try {
        const user = await User.findByUsername(req.body.username)
        if(!user){ throw new Error('No user with this username') }
        const authed = await bcrypt.compare(req.body.password, user.password)
        if (!!authed){
            const payload = { user: user.username, id: user.id }
            const sendToken = (err, token) => {
                if(err){ throw new Error('Error in token generation') }
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            }
            jwt.sign(payload, process.env.SECRET, sendToken);
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        res.status(401).json({ err });
    }
}

module.exports = { register, login };
