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
-- Table structure for table `release_requests`
--

DROP TABLE IF EXISTS `release_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `release_requests` (
  `reference_number` int(11) NOT NULL AUTO_INCREMENT,
  `manager_name` varchar(256) NOT NULL,
  `employee_name` varchar(256) NOT NULL,
  `employee_id` varchar(36) NOT NULL,
  `employee_title` varchar(128) NOT NULL,
  `function` varchar(128) NOT NULL,
  `release_date` date NOT NULL,
  `probability` int(11) NOT NULL,
  `release_percentage` int(11) NOT NULL,
  `release_reason` varchar(256) NOT NULL,
  `leaving` varchar(1) NOT NULL,
  `request_status` varchar(32) NOT NULL,
  PRIMARY KEY (`reference_number`),
  KEY `release_request_employee_id_fk_idx` (`employee_id`),
  CONSTRAINT `release_request_employee_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees_profiles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `release_requests`
--

LOCK TABLES `release_requests` WRITE;
/*!40000 ALTER TABLE `release_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `release_requests` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
