-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: tutorweb
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Username` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  UNIQUE KEY `UserName_UNIQUE` (`Username`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Adam','Smasher','AdaSma','adasma@gmail.com','admin','1990-11-11'),(2,'Ad','Min','newadmin123','newadminemail@gmail.com','$2a$10$HlJVkeNfGcdEs6VaRwjHk.60hN3dZZ5JgJVBk.FhtqAmJtzRwzZK.','1989-01-01');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatroom`
--

DROP TABLE IF EXISTS `chatroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatroom` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `TutorId` int DEFAULT NULL,
  `TuteeId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  UNIQUE KEY `index7` (`TutorId`,`TuteeId`),
  KEY `Primary Key` (`Id`),
  KEY `Foreign Key` (`TutorId`,`TuteeId`),
  KEY `chatroom_ibfk_2` (`TuteeId`),
  CONSTRAINT `chatroom_ibfk_1` FOREIGN KEY (`TutorId`) REFERENCES `tutor` (`Id`) ON DELETE SET NULL,
  CONSTRAINT `chatroom_ibfk_2` FOREIGN KEY (`TuteeId`) REFERENCES `tutee` (`Id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatroom`
--

LOCK TABLES `chatroom` WRITE;
/*!40000 ALTER TABLE `chatroom` DISABLE KEYS */;
INSERT INTO `chatroom` VALUES (1,NULL,NULL),(6,2,6),(3,3,6),(2,3,7),(4,11,6),(11,12,6),(10,13,6),(9,14,6),(8,15,6);
/*!40000 ALTER TABLE `chatroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract`
--

DROP TABLE IF EXISTS `contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `TutorId` int DEFAULT NULL,
  `TuteeId` int DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `CloseDate` date DEFAULT NULL,
  `TeachingHours` double DEFAULT NULL,
  `State` varchar(50) NOT NULL,
  `ListOfTeachingDay` json DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `Primary Key` (`Id`),
  KEY `Foreign Key` (`TutorId`,`TuteeId`),
  KEY `contract_ibfk_2` (`TuteeId`),
  CONSTRAINT `contract_ibfk_1` FOREIGN KEY (`TutorId`) REFERENCES `tutor` (`Id`) ON DELETE SET NULL,
  CONSTRAINT `contract_ibfk_2` FOREIGN KEY (`TuteeId`) REFERENCES `tutee` (`Id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract`
--

LOCK TABLES `contract` WRITE;
/*!40000 ALTER TABLE `contract` DISABLE KEYS */;
INSERT INTO `contract` VALUES (1,2,NULL,'2021-05-08','2021-05-12',12.5,'CLOSED','[\"2021-05-9\", \"2021-05-11\"]'),(13,NULL,NULL,'2021-05-15','2021-05-26',5.4,'CLOSED','[\"2021-05-16\", \"2021-05-17\", \"2021-05-18\"]'),(14,NULL,NULL,'2021-05-15','2021-05-26',5.4,'CLOSED','[\"2021-05-16\", \"2021-05-17\", \"2021-05-18\"]'),(16,3,6,'2021-05-15',NULL,5.4,'CLOSED','[\"2021-05-16\", \"2021-05-17\", \"2021-05-18\"]'),(17,3,6,'2021-05-15',NULL,5.4,'OPEN','[\"2021-05-16\", \"2021-05-17\", \"2021-05-18\"]'),(18,3,6,'2021-05-15',NULL,5.4,'OPEN','[\"2021-05-16\", \"2021-05-17\", \"2021-05-18\"]'),(19,3,6,'2021-05-15',NULL,5.4,'OPEN','[\"2021-05-16\", \"2021-05-17\", \"2021-05-18\"]'),(20,3,6,'2021-06-02',NULL,3,'REJECTED','[\"2021-06-16\", \"2021-06-17\", \"2021-06-18\"]'),(21,3,6,'2021-06-05',NULL,3,'OPEN','[\"2021-06-16\", \"2021-06-17\", \"2021-06-18\"]'),(22,15,6,'2021-06-10',NULL,2,'WAITING','[\"2021-06-11\", \"2021-06-12\"]'),(23,13,6,'2021-06-10',NULL,2,'WAITING','[\"2021-06-20\"]'),(24,12,6,'2021-06-10',NULL,2,'WAITING','[\"2021-06-23\", \"2021-06-16\"]');
/*!40000 ALTER TABLE `contract` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  UNIQUE KEY `Name_UNIQUE` (`Name`),
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'Intro to AI'),(2,'Intro to Computing'),(4,'Micro'),(5,'Physics 4'),(3,'Writing AE2');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courseteaching`
--

DROP TABLE IF EXISTS `courseteaching`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courseteaching` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `TutorId` int DEFAULT NULL,
  `CourseId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `Primary Key` (`Id`),
  KEY `Foreign Key` (`TutorId`,`CourseId`),
  KEY `courseteaching_ibfk_2` (`CourseId`),
  CONSTRAINT `courseteaching_ibfk_1` FOREIGN KEY (`TutorId`) REFERENCES `tutor` (`Id`),
  CONSTRAINT `courseteaching_ibfk_2` FOREIGN KEY (`CourseId`) REFERENCES `course` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courseteaching`
--

LOCK TABLES `courseteaching` WRITE;
/*!40000 ALTER TABLE `courseteaching` DISABLE KEYS */;
INSERT INTO `courseteaching` VALUES (3,3,1),(4,3,2),(7,11,1),(8,11,2),(9,12,5),(10,13,2),(11,13,5),(12,14,1),(13,14,2),(14,15,4);
/*!40000 ALTER TABLE `courseteaching` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issue`
--

DROP TABLE IF EXISTS `issue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issue` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ContractId` int DEFAULT NULL,
  `IsOpen` tinyint(1) DEFAULT NULL,
  `Content` varchar(5000) DEFAULT NULL,
  `ResolveAdminId` int DEFAULT NULL,
  `TutorAgreement` tinyint(1) DEFAULT NULL,
  `TuteeAgreement` tinyint(1) DEFAULT NULL,
  `ReturnPercentage` int DEFAULT NULL,
  `IsFromTutor` tinyint DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  UNIQUE KEY `ContractId` (`ContractId`),
  KEY `Primary Key` (`Id`),
  KEY `Foreign Key` (`ContractId`,`ResolveAdminId`),
  KEY `issue_ibfk_2` (`ResolveAdminId`),
  CONSTRAINT `issue_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contract` (`Id`),
  CONSTRAINT `issue_ibfk_2` FOREIGN KEY (`ResolveAdminId`) REFERENCES `admin` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue`
--

LOCK TABLES `issue` WRITE;
/*!40000 ALTER TABLE `issue` DISABLE KEYS */;
INSERT INTO `issue` VALUES (1,19,1,'tutor missing for days',1,1,1,NULL,0),(2,17,1,'I am here',2,1,1,10,1);
/*!40000 ALTER TABLE `issue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ChatroomId` int DEFAULT NULL,
  `IsTutor` tinyint(1) DEFAULT NULL,
  `Timestamp` date DEFAULT NULL,
  `Content` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `Primary Key` (`Id`),
  KEY `Foreign Key` (`ChatroomId`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`ChatroomId`) REFERENCES `chatroom` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,2,0,'2021-05-18','hello'),(2,2,1,'2021-05-18','hello 1'),(3,2,1,'2021-05-18','hello again'),(4,2,0,'2021-05-18','hello'),(5,2,0,'2021-05-18','hello'),(6,2,0,'2021-05-18','hello from tutee'),(7,2,1,'2021-05-18','hello from tutor'),(8,2,0,'2021-05-18','hello from tutee'),(9,2,0,'2021-05-18','hello from tutee'),(10,2,1,'2021-05-18','hello from tutor'),(11,2,1,'2021-05-18','hello from tutor'),(12,2,0,'2021-05-18','hello tutor'),(13,2,1,'2021-05-18','hello from tutor'),(14,2,1,'2021-05-18','how are you'),(15,2,1,'2021-05-18','hello from tutor'),(16,2,0,'2021-05-18','how do you think?'),(17,2,1,'2021-05-18',':)'),(18,2,0,'2021-05-18','I need tutoring on web app'),(19,2,1,'2021-05-18','I will ask Dr Nguyen Van Sinh for you :) '),(20,1,1,'2021-05-26','hello'),(21,1,1,'2021-05-26','hello'),(22,1,1,'2021-05-26','hello'),(23,1,1,'2021-05-26','hello'),(24,1,1,'2021-05-26','hello'),(25,1,1,'2021-05-26','hello'),(26,1,1,'2021-05-26','hello'),(27,1,1,'2021-05-26','hello'),(28,3,0,'2021-06-03','testing socket'),(29,3,0,'2021-06-03','testing socket again'),(30,2,1,'2021-06-04','hello again'),(31,2,1,'2021-06-04','hello again'),(32,2,1,'2021-06-04','testing'),(33,2,1,'2021-06-04','hello'),(34,2,1,'2021-06-04','hello again'),(35,2,1,'2021-06-04','testing typing'),(36,2,1,'2021-06-04','hello'),(37,3,1,'2021-06-04','hello'),(38,3,0,'2021-06-04','hello darkness my old friend'),(39,3,1,'2021-06-04','I\'ve come to talk with you again'),(40,3,1,'2021-06-04','Because a vision softly creeping'),(41,3,0,'2021-06-04','Left its seeds while I was sleeping'),(42,3,1,'2021-06-04','And the vision that was planted in my brain'),(43,3,1,'2021-06-04','Still remains'),(44,3,0,'2021-06-04','Within the sound of silence'),(45,3,0,'2021-06-04','need tutoring again'),(46,3,1,'2021-06-05','hello'),(47,3,0,'2021-06-10','hello'),(48,6,0,'2021-06-10','hello Wick'),(49,4,0,'2021-06-10','hello'),(50,6,0,'2021-06-10','hello'),(51,4,0,'2021-06-10','hello, I need a tutor'),(52,8,0,'2021-06-10','hello'),(53,6,0,'2021-06-10','hello'),(54,3,0,'2021-06-10','hello'),(55,11,0,'2021-06-10','hello'),(56,10,0,'2021-06-10','hello');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moneyaccount`
--

DROP TABLE IF EXISTS `moneyaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moneyaccount` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Code` varchar(30) DEFAULT NULL,
  `BalanceAmount` double DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  UNIQUE KEY `Code_UNIQUE` (`Code`),
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`Code`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moneyaccount`
--

LOCK TABLES `moneyaccount` WRITE;
/*!40000 ALTER TABLE `moneyaccount` DISABLE KEYS */;
INSERT INTO `moneyaccount` VALUES (1,'tutor/1',640000),(3,'tutee/5',460000),(4,'tutor/3',4250000),(5,'tutor/4',100000),(6,'tutor/5',100000),(7,'tutor/7',100000),(8,'tutor/8',100000),(9,'tutor/10',100000),(10,'tutor/11',100000),(11,'tutee/6',5260000),(12,'tutee/1',100000),(25,'contract/13',100000),(26,'contract/17',0),(27,'contract/19',370000),(28,'tutee/7',100000),(29,'tutee/9',100000),(30,'contract/21',150000),(31,'contract/18',270000),(32,'tutor/12',100000),(33,'tutor/13',100000),(34,'tutor/14',100000),(35,'tutor/15',100000);
/*!40000 ALTER TABLE `moneyaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `SenderAccountId` int DEFAULT NULL,
  `ReceiverAccountId` int DEFAULT NULL,
  `Amount` double DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `Primary Key` (`Id`),
  KEY `Foreign Key` (`SenderAccountId`,`ReceiverAccountId`),
  KEY `transaction_ibfk_2` (`ReceiverAccountId`),
  CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`SenderAccountId`) REFERENCES `moneyaccount` (`Id`),
  CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`ReceiverAccountId`) REFERENCES `moneyaccount` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,3,1,270000),(2,3,1,270000),(3,11,4,270000),(4,11,4,270000),(5,11,4,270000),(6,11,4,270000),(7,11,4,270000),(8,11,4,270000),(9,11,4,270000),(10,11,4,270000),(11,11,4,270000),(12,11,4,270000),(13,11,4,270000),(14,11,4,270000),(15,11,4,270000),(16,11,4,270000),(17,11,26,270000),(18,26,4,370000),(19,26,4,0),(20,26,4,0),(21,26,4,0),(22,26,4,0),(23,26,4,0),(24,26,4,0),(25,26,4,0),(26,11,27,270000),(27,11,30,150000),(28,11,31,270000);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutee`
--

DROP TABLE IF EXISTS `tutee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutee` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Username` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  UNIQUE KEY `UserName_UNIQUE` (`Username`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`Username`,`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutee`
--

LOCK TABLES `tutee` WRITE;
/*!40000 ALTER TABLE `tutee` DISABLE KEYS */;
INSERT INTO `tutee` VALUES (2,'Donald','Jump','donaldTheDuck','DoNamTrung@yahoo.com.vn','kkkooo','2003-06-07'),(6,'John','Lennon','JL1','shensafi235@gmail.com','$2a$10$72ECIDyqRnVYaczz3AgYy.5/L7MzgxMM2PTDwrvneb3tHUOvD.yua','1940-10-09'),(7,'Test','forVi','T4V','lttvi1822@gmail.com','$2a$10$nJg5z6WLq8dkAvsfwzFtG.V2XjnSHwvNi/dqQU3fq2mYrx1ku81zK','1940-10-09'),(9,'John','Lennon','JL2','otheremail@gmail.com','$2a$10$rjgb0k/c.ElemGL0eIJKUuzLRN1tFHeAlKto5sQuwecIO6XxPI84y','1940-10-09');
/*!40000 ALTER TABLE `tutee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor`
--

DROP TABLE IF EXISTS `tutor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutor` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Username` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `Profile` json DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  UNIQUE KEY `UserName_UNIQUE` (`Username`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`Username`,`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor`
--

LOCK TABLES `tutor` WRITE;
/*!40000 ALTER TABLE `tutor` DISABLE KEYS */;
INSERT INTO `tutor` VALUES (2,'John','Wick','PencilKiller','ILoveDog@gov.us','doggy cute','1998-05-16','{\"background\": [{\"id\": 3, \"GPA\": 3.9, \"name\": \"Writing AE2\"}], \"description\": \"Study or Die\"}'),(3,'Linh','Phung','lp','phungkhanhlinh.iu@gmail.com','$2a$10$PsljbCxIB.hEGwLGtlWb4edhDbNN9s9rpYDKfx6A9JVpC1gEtQ5Mi','2000-01-01','{\"background\": [{\"id\": 1, \"GPA\": 4, \"name\": \"Intro to AI\"}, {\"id\": 2, \"GPA\": 4, \"name\": \"Intro to Computing\"}], \"description\": \"Study or die\"}'),(11,'John','Wick','jw','someoneemail@gmail.com','$2a$10$q7hoF4ccKoakbSQmyU8Pv.NdToz0.r0JBC.AvldzFJiItacmSRcoS','2000-01-01','{\"background\": [{\"id\": 1, \"GPA\": 4, \"name\": \"Intro to AI\"}, {\"id\": 2, \"GPA\": 4, \"name\": \"Intro to Computing\"}], \"description\": \"Study or die\"}'),(12,'l','p','lp4','lp4@gmail.com','$2a$10$Abn7HaoEzDg.1ijmElNAeeRNk/HxW2rrgMBG6hhwsOfVAFrmEsGua','2002-07-22','{\"background\": [{\"id\": 5, \"GPA\": \"5\", \"name\": \"Physics 4\"}], \"description\": \"hello hello\"}'),(13,'lp','lp','lp5','lp5@gmail.com','$2a$10$avWV/JxqsfU4D8FpvOyh9.ckxRgXx8ttD2J/HKcjHvPM3Wp.GnVMi',NULL,'{\"background\": [{\"id\": 2, \"GPA\": \"3\", \"name\": \"Intro to Computing\"}, {\"id\": 5, \"GPA\": \"3\", \"name\": \"Physics 4\"}], \"description\": \"123\"}'),(14,'John','Wick','jw3','someoneemail3@gmail.com','$2a$10$r54OsfJRkOCsuadIJLtjI.Pd/WDj9X4gQbikoDT5zobjdK/1oS0/6','2000-01-01','{\"background\": [{\"id\": 1, \"GPA\": 4, \"name\": \"Intro to AI\"}, {\"id\": 2, \"GPA\": 4, \"name\": \"Intro to Computing\"}], \"description\": \"Study or die\"}'),(15,'l','p','lp3','lp3@gmail.com','$2a$10$i15RweKchvBlquJDh8I2oOVdBmYShZ.lwcOPkZK02UhUBWm6ZP8.e','2000-03-02','{\"background\": [{\"id\": 4, \"GPA\": \"4\", \"name\": \"Micro\"}], \"description\": \"123123\"}');
/*!40000 ALTER TABLE `tutor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unverifiedtutor`
--

DROP TABLE IF EXISTS `unverifiedtutor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unverifiedtutor` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `UserName` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(200) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `Profile` json DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  UNIQUE KEY `UserName_UNIQUE` (`UserName`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`UserName`,`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unverifiedtutor`
--

LOCK TABLES `unverifiedtutor` WRITE;
/*!40000 ALTER TABLE `unverifiedtutor` DISABLE KEYS */;
INSERT INTO `unverifiedtutor` VALUES (1,'John','Pham','johnpham','minhrongcon2000@gmail.com','ML is faster than DL','2000-01-01','{\"Background\": [{\"Id\": 1, \"GPA\": 4.0, \"Name\": \"Intro to AI\"}, {\"Id\": 2, \"GPA\": 4.0, \"Name\": \"Intro to Computing\"}], \"Description\": \"Study or die\"}'),(6,'John','Wick','jw2','someoneemail2@gmail.com','$2a$10$wGe/Q2KpJq0GTtswLsCf8eDo7Cegayd23NRNu7WVaMZ8/eGuSmbfe','2000-01-01','{\"background\": [{\"id\": 1, \"GPA\": 4.0, \"name\": \"Intro to AI\"}, {\"id\": 2, \"GPA\": 4.0, \"name\": \"Intro to Computing\"}], \"description\": \"Study or die\"}'),(8,'l','p','lp1','lp1@gmail.com','$2a$10$TumGzmZp9Ms40xRMNSSGtuL3.Momjg71eBYF1f3PirLRR9Tg5Hzgq','2001-01-12','{\"background\": [{\"id\": 1, \"GPA\": \"3\", \"name\": \"Intro to AI\"}], \"description\": \"123\"}');
/*!40000 ALTER TABLE `unverifiedtutor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tutorweb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-17 21:38:54
