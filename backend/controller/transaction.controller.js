const db = require('../models');
const TransactionH = db.transactionH;
const TransactionD = db.transactionD;

exports.getAll = (req, res) => {
  TransactionH.findAll({
    include: [
      {
        model: db.customer,
        attributes: ['nama'],
      },
      {
        model: TransactionD,
        attributes: ['kd_barang', 'nama_barang', 'qty', 'subtotal'],
      },
    ],
  })
    .then(transactions => res.send(transactions))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.create = (req, res) => {
  const { nomor_transaksi, tanggal_transaksi, total_transaksi, id_customer, items } = req.body;

  TransactionH.create({
    nomor_transaksi,
    tanggal_transaksi,
    total_transaksi,
    id_customer,
  })
    .then(transactionH => {
      const transactionItems = items.map(item => ({
        id_transaksi_h: transactionH.id,
        kd_barang: item.kd_barang,
        nama_barang: item.nama_barang,
        qty: item.qty,
        subtotal: item.subtotal,
      }));

      TransactionD.bulkCreate(transactionItems)
        .then(() => res.send({ message: 'Berhasil menambahkan Transaksi' }))
        .catch(err => res.status(500).send({ message: err.message }));
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  const id = req.params.id;

  TransactionH.update(req.body, {
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: 'Berhasil mengupdate Transaksi' });
      } else {
        res.send({ message: `Tidak bisa mengupdate Transaksi dengan id=${id}` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const id = req.params.id;

  TransactionH.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: 'Berhasil menghapus Transaksi' });
      } else {
        res.send({ message: `Tidak bisa menghapus Transaksi dengan id=${id}` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};
