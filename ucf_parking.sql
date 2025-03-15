CREATE DATABASE  IF NOT EXISTS `ucf_parking` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ucf_parking`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: ucf_parking
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `garages`
--

DROP TABLE IF EXISTS `garages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `garages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `api_location_id` int NOT NULL,
  `location_name` varchar(255) NOT NULL,
  `total` int NOT NULL,
  `available` int NOT NULL,
  `occupied` int NOT NULL,
  `vacant` int NOT NULL,
  `out_of_service` tinyint(1) DEFAULT '0',
  `timeStampDate` varchar(50) DEFAULT NULL,
  `timeStampTime` varchar(50) DEFAULT NULL,
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_api_location_id` (`api_location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `garages`
--

LOCK TABLES `garages` WRITE;
/*!40000 ALTER TABLE `garages` DISABLE KEYS */;
INSERT INTO `garages` VALUES (1,134,'Garage A',1647,1489,158,1331,1,'3/14/2025','1:31 AM','2025-03-14 05:32:17'),(2,155,'Garage B',1289,1289,0,1289,0,'3/14/2025','1:31 AM','2025-03-14 05:32:17'),(3,130,'Garage C',1832,1832,0,1852,1,'3/14/2025','1:31 AM','2025-03-14 05:32:17'),(4,161,'Garage D',1289,1279,0,1279,1,'3/14/2025','1:31 AM','2025-03-14 05:32:17'),(5,135,'Garage H',1340,1340,0,1340,1,'3/14/2025','1:31 AM','2025-03-14 05:32:17'),(6,3520,'Garage I',1270,1270,0,1270,1,'3/14/2025','1:31 AM','2025-03-14 05:32:17'),(7,942,'Amelia Garage',603,1249,0,1249,1,'3/14/2025','1:31 AM','2025-03-14 05:32:17'),(8,941,'Paramore Garage',571,571,0,571,1,'3/14/2025','1:31 AM','2025-03-14 05:32:17'),(9,936,'Rosen Lot',571,964,0,964,0,'3/14/2025','1:31 AM','2025-03-14 05:32:17');
/*!40000 ALTER TABLE `garages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-15 15:17:12
