# ************************************************************
# Sequel Pro SQL dump
# Версия 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Адрес: 54.93.236.198 (MySQL 5.7.29-0ubuntu0.18.04.1)
# Схема: cubejs
# Время создания: 2020-04-30 15:34:20 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Дамп таблицы tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `service` varchar(10) DEFAULT '',
  `tag` varchar(30) DEFAULT '',
  `timestamp` timestamp NULL DEFAULT NULL,
  `country` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;

INSERT INTO `tags` (`id`, `service`, `tag`, `timestamp`, `country`)
VALUES
	(1,'twitter','art','2020-04-09 09:12:00','de'),
	(2,'twitter','art','2020-04-09 11:12:00','de'),
	(3,'instagram','art','2020-04-09 13:12:00','es'),
	(4,'twitter','food','2020-04-09 15:12:00','ru'),
	(5,'instagram','food','2020-04-10 20:12:00','ru'),
	(6,'twitter','art','2020-04-10 13:12:00','de'),
	(7,'flickr','food','2020-04-10 23:12:00','ru'),
	(8,'instagram','food','2020-04-11 15:12:00','ru'),
	(9,'instagram','art','2020-04-11 06:12:00','es'),
	(10,'twitter','sport','2020-04-11 04:12:00','de'),
	(11,'flickr','art','2020-04-11 16:12:00','de'),
	(12,'instagram','food','2020-04-12 09:12:00','es'),
	(13,'instagram','art','2020-04-12 11:12:00','de'),
	(14,'flickr','art','2020-04-12 18:12:00','de'),
	(15,'instagram','food','2020-04-12 17:12:00','fr'),
	(16,'instagram','sport','2020-04-13 22:12:00','ru'),
	(17,'twitter','food','2020-04-13 07:12:00','ru'),
	(18,'twitter','art','2020-04-13 23:12:00','fr'),
	(19,'instagram','food','2020-04-13 17:12:00','de'),
	(20,'flickr','art','2020-04-14 19:12:00','ru'),
	(21,'instagram','food','2020-04-14 13:12:00','fr'),
	(22,'instagram','sport','2020-04-14 12:12:00','fr'),
	(23,'flickr','food','2020-04-15 22:12:00','es'),
	(24,'instagram','art','2020-04-15 03:12:00','es'),
	(25,'instagram','sport','2020-04-15 13:12:00','de'),
	(26,'twitter','art','2020-04-15 15:12:00','fr'),
	(27,'instagram','art','2020-04-16 19:12:00','de'),
	(28,'flickr','food','2020-04-16 23:12:00','de'),
	(29,'instagram','art','2020-04-17 12:12:00','de'),
	(30,'twitter','food','2020-04-17 09:12:00','ru'),
	(31,'instagram','sport','2020-04-17 10:12:00','de'),
	(32,'flickr','sport','2020-04-18 11:12:00','de'),
	(33,'instagram','food','2020-04-18 16:12:00','de'),
	(34,'twitter','food','2020-04-18 23:12:00','fr'),
	(35,'instagram','food','2020-04-18 11:12:00','de'),
	(36,'instagram','art','2020-04-19 13:12:00','es'),
	(37,'flickr','sport','2020-04-19 17:12:00','ru'),
	(38,'instagram','food','2020-04-19 19:12:00','es'),
	(39,'flickr','food','2020-04-09 21:12:00','de'),
	(41,'flickr','food','2020-04-16 10:12:00','de'),
	(42,'instagram','food','2020-04-19 11:12:00','es'),
	(43,'twitter','food','2020-04-13 15:12:00','ru'),
	(44,'instagram','food','2020-04-10 18:12:00','ru'),
	(45,'instagram','food','2020-04-11 20:12:00','ru'),
	(46,'instagram','food','2020-04-13 11:12:00','de'),
	(47,'instagram','food','2020-04-14 10:12:00','fr'),
	(48,'instagram','food','2020-04-13 05:12:00','de'),
	(49,'instagram','food','2020-04-14 18:12:00','fr'),
	(50,'flickr','food','2020-04-15 19:12:00','es'),
	(51,'instagram','food','2020-04-11 14:12:00','ru'),
	(52,'instagram','food','2020-04-12 17:12:00','es'),
	(53,'instagram','sport','2020-04-17 22:12:00','de'),
	(54,'instagram','food','2020-04-18 06:12:00','de'),
	(55,'instagram','art','2020-04-17 18:12:00','de'),
	(56,'instagram','food','2020-04-18 10:12:00','de'),
	(57,'instagram','art','2020-04-17 13:12:00','de'),
	(58,'instagram','sport','2020-04-17 02:12:00','de');

/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
