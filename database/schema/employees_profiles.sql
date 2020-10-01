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
-- Table structure for table `employees_profiles`
--

DROP TABLE IF EXISTS `employees_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees_profiles` (
  `id` varchar(36) NOT NULL,
  `name` varchar(256) NOT NULL,
  `title` varchar(128) NOT NULL,
  `hiring_date` date NOT NULL,
  `function` varchar(128) NOT NULL,
  `direct_manager_id` varchar(36) DEFAULT NULL,
  `workgroup` varchar(128) NOT NULL,
  `employment_type` varchar(64) NOT NULL,
  `allocation_percentage` int(11) NOT NULL,
  `skills_last_update_date` date DEFAULT NULL,
  `employee_email` varchar(320) NOT NULL,
  `employee_profile_picture` varchar(45) DEFAULT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `cost_center` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `manager_id_fk_idx` (`direct_manager_id`),
  CONSTRAINT `employees_profile_direct_manager_id_fk` FOREIGN KEY (`direct_manager_id`) REFERENCES `employees_profiles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees_profiles`
--

LOCK TABLES `employees_profiles` WRITE;
/*!40000 ALTER TABLE `employees_profiles` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees_profiles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
