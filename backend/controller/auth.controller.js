const db = require('../models');
const config = require('../config/auth.config');
const User = db.user;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(user => res.send({ message: 'User was registered successfully!' }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.login = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User tidak ditemukan' });
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({ accessToken: null, message: 'Password Salah!' });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 3600,
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        accessToken: token,
      });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};
