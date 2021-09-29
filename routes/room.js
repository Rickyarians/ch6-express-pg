var express = require('express');
const { Result } = require('express-validator');
var router = express.Router();
const {master_room} = require('./../models');

/* GET users listing. */
router.get('/fight/:id', function(req, res, next) {
      master_room.findOne({where: { id: req.params.id }}).then(result => {
          console.log(result)
          res.render('enterRoom',  { id: result.id })
      }).catch(err => {
          console.log(err)
      })
});

router.post('/fight/validation', function(req, res, next) {
  master_room.findOne({where: { id: req.body.id}}).then(result => {
    console.log(req.body.kode_unik)
    if(result.kode_unik === req.body.kode_unik) {
      res.render('roomPlay')
    } else {
      console.log('salah')
    }
   
  }).catch(err => {
    console.log('salah')
  })
});

module.exports = router;
