
// 로그인 회원가입 담당
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const db = require('../config/connection.js');
const userMiddleware = require('../middleware/users.js');
const {render} = require("ejs");

router.use(express.static('public'));

router.get('/join',(req,res,next)=>{
    res.render('join');
});
// http://localhost:3000/sign-up
router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {

    const sql = `SELECT id
              FROM users
              WHERE LOWER(username) = LOWER(${req.body.username})`

    db.query(sql, (err, result) => {
            if (result && result.length) { // error
                return res.status(409).send({
                    message: 'This username is already in use!'
                })
            } else { // username not in use => password hash값 반환
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            message: err
                        });
                    } else {
                        db.query(`INSERT INTO users (id, username, password, registered, user_nick, user_phone, user_national, user_img)
                                  VALUES ('${uuid.v4()}', ${db.escape(req.body.username)}, '${hash}', now(), ?, ?, ?, ?);`, [req.body.user_nick,req.body.user_phone, req.body.user_national, req.body.user_img],
                            (err, result) => {
                                if (err) {
                                    throw err;
                                    return res.status(400).send({
                                        message: err,
                                    });
                                }
                                return res.status(201).send({
                                    message: "Registered",

                                })
                            }
                        );

                        // res.redirect('/join')
                    }
                });
            }
        }
    );
});

module.exports = router;
