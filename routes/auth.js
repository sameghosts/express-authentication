const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res) =>{
  //findOrCreate a new user based on email
  db.user.findOrCreate({
    where: {
      email: req.body.email
    }, 
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).then(([user,created]) =>{
    //If user was created
    if (created) {
      //redirect to homepage or profile
      console.log(`😎 ${user.name} was created`)
      res.redirect('/');
    } else {
      // if user wasn't created -- the is a user at that emaill so they can't sign up
      console.log(`🐸 ${user.name} already exists`)
        //redirect to /auth/signup
      res.redirect('/auth/signup');
    }
  }).catch(err =>{
    console.log(`🙃 OOPS there was an error`);
    console.log(err);
    res.redirect('auth/signup');
  })
    //if there is an error, its probably a validation error, so we'll return to /auth/signup
  res.send(req.body);
})

router.get('/login', (req, res) => {
  res.render('auth/login');
});

module.exports = router;
