const db = require('../models');
const TransactionD = db.transactionD;

exports.getAll = (req, res) => {
  TransactionD.findAll()
    .then(barang => res.send(barang))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.create = (req, res) => {
  const { id_barang, nama_barang, qty, subtotal } = req.body;

  TransactionD.create({
    id_barang,
    nama_barang,
    qty,
    subtotal,
  })
    .then(barang => res.send(barang))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  const id = req.params.id;

  TransactionD.update(req.body, {
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: 'Berhasil mengupdate Barang' });
      } else {
        res.send({ message: `Tidak bisa mengupdate Barang dengan id=${id}` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const id = req.params.id;

  TransactionD.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: 'Berhasil menghapus Barang' });
      } else {
        res.send({ message: `Tidak bisa menghapus Barang dengan id=${id}` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};
