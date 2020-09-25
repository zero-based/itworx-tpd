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
-- Table structure for table `employee_skills_history`
--

DROP TABLE IF EXISTS `employee_skills_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_skills_history` (
  `employee_id` varchar(36) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `experience_level` varchar(32) NOT NULL,
  `last_used_date` date NOT NULL,
  `created_on` date NOT NULL,
  `manager_name` varchar(256) NOT NULL,
  `title` varchar(128) NOT NULL,
  `function` varchar(128) NOT NULL,
  PRIMARY KEY (`employee_id`,`skill_id`),
  KEY `employee_skill_history_employee_id_fk_idx` (`employee_id`),
  KEY `employee_skills_history_skill_id_fk_idx` (`skill_id`),
  CONSTRAINT `employee_skill_history_employee_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees_profiles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `employee_skills_history_skill_id_fk` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`skill_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_skills_history`
--

LOCK TABLES `employee_skills_history` WRITE;
/*!40000 ALTER TABLE `employee_skills_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_skills_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
