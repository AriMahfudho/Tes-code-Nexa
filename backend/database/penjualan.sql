-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: penjualan
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `counter`
--

DROP TABLE IF EXISTS `counter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `counter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bulan` int(11) NOT NULL,
  `tahun` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `counter`
--

LOCK TABLES `counter` WRITE;
/*!40000 ALTER TABLE `counter` DISABLE KEYS */;
/*!40000 ALTER TABLE `counter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ms_customer`
--

DROP TABLE IF EXISTS `ms_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ms_customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ms_customer`
--

LOCK TABLES `ms_customer` WRITE;
/*!40000 ALTER TABLE `ms_customer` DISABLE KEYS */;
INSERT INTO `ms_customer` VALUES (1,'Muhammad Ari','Demak','081245689','2024-07-06 09:35:30','2024-07-06 09:38:54'),(2,'Mahfudho','Solo','081245689','2024-07-06 09:39:33','2024-07-06 09:39:33'),(4,'Mutiara','Pati','08124568911','2024-07-06 10:21:21','2024-07-06 10:21:21');
/*!40000 ALTER TABLE `ms_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaksi_d`
--

DROP TABLE IF EXISTS `transaksi_d`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaksi_d` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_barang` varchar(255) NOT NULL,
  `nama_barang` varchar(255) NOT NULL,
  `qty` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_transaksi_h` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_transaksi_h` (`id_transaksi_h`),
  CONSTRAINT `transaksi_d_ibfk_1` FOREIGN KEY (`id_transaksi_h`) REFERENCES `transaksi_h` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaksi_d`
--

LOCK TABLES `transaksi_d` WRITE;
/*!40000 ALTER TABLE `transaksi_d` DISABLE KEYS */;
INSERT INTO `transaksi_d` VALUES (1,'1','sepatu',1,150.00,'2024-07-07 09:38:39','2024-07-07 09:38:39',1),(2,'2','Baju',1,200000.00,'2024-07-07 11:20:00','2024-07-07 11:20:00',2),(3,'3','topi',4,200000.00,'2024-07-07 11:22:46','2024-07-07 11:22:46',3);
/*!40000 ALTER TABLE `transaksi_d` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaksi_h`
--

DROP TABLE IF EXISTS `transaksi_h`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaksi_h` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nomor_transaksi` varchar(255) NOT NULL,
  `tanggal_transaksi` datetime NOT NULL,
  `total_transaksi` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_customer` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nomor_transaksi` (`nomor_transaksi`),
  KEY `id_customer` (`id_customer`),
  CONSTRAINT `transaksi_h_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `ms_customer` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaksi_h`
--

LOCK TABLES `transaksi_h` WRITE;
/*!40000 ALTER TABLE `transaksi_h` DISABLE KEYS */;
INSERT INTO `transaksi_h` VALUES (1,'SO/2024-07/001','2024-07-07 09:36:38',200000.00,'2024-07-07 09:36:38','2024-07-07 09:36:38',1),(2,'SO/2024-07/002','2024-07-07 09:13:06',400000.00,'2024-07-07 09:13:29','2024-07-07 09:13:29',2),(3,'SO/2024-07/003','2024-07-07 11:22:09',100000.00,'2024-07-07 11:22:09','2024-07-07 11:22:09',4);
/*!40000 ALTER TABLE `transaksi_h` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ari','$2a$08$.vLSZQrRpeRATK.l3PXgfOb4bu4cEBglZTgYMpQKCjb225.aLkq7i','2024-07-06 09:28:12','2024-07-06 09:28:12'),(2,'mahfudho','$2a$08$qjf58zhySNJSKVA9QZMY/Of/isKsmAqXrHcSP.GM.mq3MWUGML28S','2024-07-06 14:38:23','2024-07-06 14:38:23');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-07 20:06:39
