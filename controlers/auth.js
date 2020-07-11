const User = require('../models/auth');
const bcrypt=require ("bcrypt");
const jwt=require('jsonwebtoken')


exports.signup=(req,res,next)=>{
    bcrypt.hash(req.body.passworld,10)
    .then(hash=>{
        const user=new User({
            name:req.body.name,
            email:req.body.email,
            username:req.body.username,
            passworld:hash,
        })
        console.log(user)
        console.log(hash)
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}

exports.login = (req, res, next) => {
    User.findOne({ username: req.body.username})
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.passworld, user.passworld)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              username:user.username,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };