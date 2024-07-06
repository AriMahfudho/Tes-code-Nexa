const db = require('../models');
const Customer = db.customer;

exports.getAll = (req, res) => {
  Customer.findAll()
    .then(customers => res.send(customers))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.create = (req, res) => {
  Customer.create({
    nama: req.body.nama,
    alamat: req.body.alamat,
    phone: req.body.phone,
  })
    .then(customer => res.send(customer))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Customer.update(req.body, {
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: 'Berhasil update Customer' });
      } else {
        res.send({ message: `Aduh gabisa update customer dengan id=${id}. Coba teliti lagi!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Customer.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: 'Berhasil menghapus Customer' });
      } else {
        res.send({ message: `Aduh gabisa menghapus customer dengan id=${id}. Mungkin customer tidak ada` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};
