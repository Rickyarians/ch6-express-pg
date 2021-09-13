var express = require('express');
const {user_game, user_game_biodata, user_game_history} = require('./../models');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.post(
  '/',
  // username must be an email
  body('username').notEmpty().withMessage('username tidak boleh kosong'),
  body('email').isEmail().withMessage('tidak sesuai format email'),
  body('password').notEmpty().withMessage('password tidak boleh kosong').isLength({ min: 8 }).withMessage('minimal 8 karakter'),
  // if(req.body.username == null || req.body.username == "" || req.body.username == undefined)
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    console.log(req)
    const errors = validationResult(req);
    console.log(errors.array())
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = await user_game.findOne({ where: { username: req.body.username } });

    if(data) {
      return res.status(400).json({message: 'username sudah ada'})
    }

    // logika random 
    // username + random angka

    // random 3 data
    let suggestRandom = []
    for(let i = 0; i < 3; i++){
      let randomAngka = Math.floor(Math.random() * 3)
      suggestRandom.push(req.body.username + randomAngka.toString())
    }

    // hashing password
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      // Store hash in your password DB.

      user_game.create({
          username: req.body.username,
          password: hash,
          email: req.body.email,
          generate_random: suggestRandom[0]
        })
          .then(result => {
            return res.status(201).json({code: 201, message: 'berhasil menambkan data'})
        })
    });


    

    // return res.status(200).json({ message : 'data bisa dimasukkan', suggestUsername: suggestRandom})
   
  },
);

module.exports = router;
