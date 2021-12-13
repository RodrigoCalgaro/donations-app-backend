-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: donations-dev
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `collects`
--

DROP TABLE IF EXISTS `collects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collects` (
  `collectId` int(11) NOT NULL,
  `startsDate` date NOT NULL,
  `endsDate` date NOT NULL,
  `targetAmount` float(18,2) NOT NULL,
  `minDonationAllowed` float(18,2) DEFAULT NULL,
  `suggestedDonation` float(18,2) DEFAULT NULL,
  PRIMARY KEY (`collectId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collects`
--

LOCK TABLES `collects` WRITE;
/*!40000 ALTER TABLE `collects` DISABLE KEYS */;
INSERT INTO `collects` VALUES (1,'2021-12-10','2021-12-16',2000.00,10.00,50.00);
/*!40000 ALTER TABLE `collects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donations` (
  `donationId` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `amount` float(18,2) NOT NULL,
  `collectId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`donationId`),
  KEY `collectId` (`collectId`),
  KEY `userId` (`userId`),
  CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`collectId`) REFERENCES `collects` (`collectId`) ON UPDATE CASCADE,
  CONSTRAINT `donations_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donations`
--

LOCK TABLES `donations` WRITE;
/*!40000 ALTER TABLE `donations` DISABLE KEYS */;
INSERT INTO `donations` VALUES (1,'2021-12-10 21:11:16',57.00,1,9),(2,'2021-12-11 15:01:11',87.00,1,9),(3,'2021-12-11 12:22:54',17.00,1,7),(4,'2021-12-12 17:49:27',49.00,1,2),(5,'2021-12-12 08:46:34',27.00,1,8),(6,'2021-12-12 03:52:43',58.00,1,6),(7,'2021-12-12 19:07:20',61.00,1,8),(8,'2021-12-12 09:45:39',23.00,1,5),(9,'2021-12-10 14:58:14',40.00,1,5),(10,'2021-12-10 12:06:07',54.00,1,3),(11,'2021-12-10 23:14:52',66.00,1,6),(12,'2021-12-11 18:58:34',25.00,1,3),(13,'2021-12-10 12:00:34',14.00,1,7),(14,'2021-12-10 05:16:54',78.00,1,8),(15,'2021-12-11 10:45:18',82.00,1,2),(16,'2021-12-12 13:54:26',64.00,1,4),(17,'2021-12-11 02:18:28',64.00,1,8);
/*!40000 ALTER TABLE `donations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','Admin','admin@email.com','$2b$08$KU0AT7WWrSrPRWyH9xV7Xuxyjhz3xtfvBgRmJtvTcA7JuUcrHIi8G','admin','2021-12-13 11:18:19','2021-12-13 11:18:19'),(2,'User1','User1','user1@email.com','$2b$08$Z2qbQ0ywyKTWz0xcL7202Oj1bxnKXcXsyxbi9IAdl5HhhvfreP5dm','user','2021-12-13 11:18:19','2021-12-13 11:18:19'),(3,'User2','User2','user2@email.com','$2b$08$Z2qbQ0ywyKTWz0xcL7202Oj1bxnKXcXsyxbi9IAdl5HhhvfreP5dm','user','2021-12-13 11:18:19','2021-12-13 11:18:19'),(4,'User3','User3','user3@email.com','$2b$08$Z2qbQ0ywyKTWz0xcL7202Oj1bxnKXcXsyxbi9IAdl5HhhvfreP5dm','user','2021-12-13 11:18:19','2021-12-13 11:18:19'),(5,'User4','User4','user4@email.com','$2b$08$Z2qbQ0ywyKTWz0xcL7202Oj1bxnKXcXsyxbi9IAdl5HhhvfreP5dm','user','2021-12-13 11:18:19','2021-12-13 11:18:19'),(6,'User5','User5','user5@email.com','$2b$08$Z2qbQ0ywyKTWz0xcL7202Oj1bxnKXcXsyxbi9IAdl5HhhvfreP5dm','user','2021-12-13 11:18:19','2021-12-13 11:18:19'),(7,'User6','User6','user6@email.com','$2b$08$Z2qbQ0ywyKTWz0xcL7202Oj1bxnKXcXsyxbi9IAdl5HhhvfreP5dm','user','2021-12-13 11:18:19','2021-12-13 11:18:19'),(8,'User7','User7','user7@email.com','$2b$08$Z2qbQ0ywyKTWz0xcL7202Oj1bxnKXcXsyxbi9IAdl5HhhvfreP5dm','user','2021-12-13 11:18:19','2021-12-13 11:18:19'),(9,'User8','User8','user8@email.com','$2b$08$Z2qbQ0ywyKTWz0xcL7202Oj1bxnKXcXsyxbi9IAdl5HhhvfreP5dm','user','2021-12-13 11:18:19','2021-12-13 11:18:19');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'donations-dev'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-13  8:26:24
