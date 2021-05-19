use tutorweb;

SET FOREIGN_KEY_CHECKS=0; DROP TABLE if exists `admin`; SET FOREIGN_KEY_CHECKS=1;
CREATE TABLE `admin` (
   `Id` int NOT NULL AUTO_INCREMENT,
   `FirstName` varchar(50) DEFAULT NULL,
   `LastName` varchar(50) DEFAULT NULL,
   `UserName` varchar(50) DEFAULT NULL,
   `Email` varchar(100) DEFAULT NULL,
   `Password` varchar(100) DEFAULT NULL,
   `DateofBirth` date DEFAULT NULL,
   PRIMARY KEY (`Id`),
   UNIQUE KEY `Id_UNIQUE` (`Id`),
   UNIQUE KEY `UserName_UNIQUE` (`UserName`),
   UNIQUE KEY `Email_UNIQUE` (`Email`),
   KEY `Primary Key` (`Id`),
   KEY `Unique Key` (`UserName`)
 ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
 
 SET FOREIGN_KEY_CHECKS=0; DROP TABLE if exists `tutee`; SET FOREIGN_KEY_CHECKS=1;
 CREATE TABLE `tutee` (
   `Id` int NOT NULL AUTO_INCREMENT,
   `FirstName` varchar(50) DEFAULT NULL,
   `LastName` varchar(50) DEFAULT NULL,
   `UserName` varchar(50) DEFAULT NULL,
   `Email` varchar(100) DEFAULT NULL,
   `Password` varchar(100) DEFAULT NULL,
   `DateofBirth` date DEFAULT NULL,
   PRIMARY KEY (`Id`),
   UNIQUE KEY `Id_UNIQUE` (`Id`),
   UNIQUE KEY `UserName_UNIQUE` (`UserName`),
   UNIQUE KEY `Email_UNIQUE` (`Email`),
   KEY `Primary Key` (`Id`),
   KEY `Unique Key` (`UserName`,`Email`)
 ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
 
SET FOREIGN_KEY_CHECKS=0; DROP TABLE if exists `tutor`; SET FOREIGN_KEY_CHECKS=1;
 CREATE TABLE `tutor` (
   `Id` int NOT NULL AUTO_INCREMENT,
   `FirstName` varchar(50) DEFAULT NULL,
   `LastName` varchar(50) DEFAULT NULL,
   `UserName` varchar(50) DEFAULT NULL,
   `Email` varchar(100) DEFAULT NULL,
   `Password` varchar(100) DEFAULT NULL,
   `DateofBirth` date DEFAULT NULL,
   `Profile` json DEFAULT NULL,
   PRIMARY KEY (`Id`),
   UNIQUE KEY `Id_UNIQUE` (`Id`),
   UNIQUE KEY `UserName_UNIQUE` (`UserName`),
   UNIQUE KEY `Email_UNIQUE` (`Email`),
   KEY `Primary Key` (`Id`),
   KEY `Unique Key` (`UserName`,`Email`)
 ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
 
SET FOREIGN_KEY_CHECKS=0; DROP TABLE if exists `contract`; SET FOREIGN_KEY_CHECKS=1;
  CREATE TABLE `contract` (
   `Id` int NOT NULL AUTO_INCREMENT,
   `TutorId` int DEFAULT NULL,
   `TuteeId` int DEFAULT NULL,
   `StartDate` date DEFAULT NULL,
   `CloseDate` date DEFAULT NULL,
   `TeachingHours` double DEFAULT NULL,
   `State` varchar(50) NOT NULL,
   `ListofTeachingDay` json DEFAULT NULL,
   PRIMARY KEY (`Id`),
   UNIQUE KEY `Id_UNIQUE` (`Id`),
   KEY `Primary Key` (`Id`),
   KEY `Foreign Key` (`TutorId`,`TuteeId`),
   KEY `contract_ibfk_2` (`TuteeId`),
   CONSTRAINT `contract_ibfk_1` FOREIGN KEY (`TutorId`) REFERENCES `tutor` (`Id`) ON DELETE SET NULL,
   CONSTRAINT `contract_ibfk_2` FOREIGN KEY (`TuteeId`) REFERENCES `tutee` (`Id`) ON DELETE SET NULL
 ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
 
 SET FOREIGN_KEY_CHECKS=0; DROP TABLE if exists `course`; SET FOREIGN_KEY_CHECKS=1;
 CREATE TABLE `course` (
   `Id` int NOT NULL AUTO_INCREMENT,
   `Name` varchar(100) DEFAULT NULL,
   PRIMARY KEY (`Id`),
   UNIQUE KEY `Id_UNIQUE` (`Id`),
   UNIQUE KEY `Name_UNIQUE` (`Name`),
   KEY `Primary Key` (`Id`),
   KEY `Unique Key` (`Name`)
 ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
 
SET FOREIGN_KEY_CHECKS=0; DROP TABLE if exists `courseteaching`; SET FOREIGN_KEY_CHECKS=1;
 CREATE TABLE `courseteaching` (
   `Id` int NOT NULL AUTO_INCREMENT,
   `TutorId` int DEFAULT NULL,
   `CourseId` int DEFAULT NULL,
   PRIMARY KEY (`Id`),
   UNIQUE KEY `Id_UNIQUE` (`Id`),
   KEY `Primary Key` (`Id`),
   KEY `Foreign Key` (`TutorId`,`CourseId`),
   CONSTRAINT `courseteaching_ibfk_1` FOREIGN KEY (`TutorId`) REFERENCES `tutor` (`Id`),
   CONSTRAINT `courseteaching_ibfk_2` FOREIGN KEY (`CourseId`) REFERENCES `course` (`Id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
 
SET FOREIGN_KEY_CHECKS=0; DROP TABLE if exists `issue`; SET FOREIGN_KEY_CHECKS=1;
 CREATE TABLE `issue` (
   `Id` int NOT NULL AUTO_INCREMENT,
   `ContractId` int DEFAULT NULL,
   `IsOpen` tinyint(1) DEFAULT NULL,
   `Content` varchar(5000) DEFAULT NULL,
   `ResolveAdminId` int DEFAULT NULL,
   `TutorAgreement` tinyint(1) DEFAULT NULL,
   `TuteeAgreement` tinyint(1) DEFAULT NULL,
   `ReturnPercentage` int DEFAULT NULL,
   PRIMARY KEY (`Id`),
   UNIQUE KEY `Id_UNIQUE` (`Id`),
   UNIQUE KEY `ContractId` (`ContractId`),
   KEY `Primary Key` (`Id`),
   KEY `Foreign Key` (`ContractId`,`ResolveAdminId`),
   CONSTRAINT `issue_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contract` (`Id`),
   CONSTRAINT `issue_ibfk_2` FOREIGN KEY (`ResolveAdminId`) REFERENCES `admin` (`Id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
 
SET FOREIGN_KEY_CHECKS=0; DROP TABLE if exists `moneyaccount`; SET FOREIGN_KEY_CHECKS=1;
 CREATE TABLE `moneyaccount` (
   `Id` int NOT NULL AUTO_INCREMENT,
   `Code` varchar(30) DEFAULT NULL,
   `BalanceAmount` double DEFAULT NULL,
   PRIMARY KEY (`Id`),
   UNIQUE KEY `Id_UNIQUE` (`Id`),
   UNIQUE KEY `Code_UNIQUE` (`Code`),
   KEY `Primary Key` (`Id`),
   KEY `Unique Key` (`Code`)
 ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
 
SET FOREIGN_KEY_CHECKS=0; DROP TABLE if exists `transaction`; SET FOREIGN_KEY_CHECKS=1;
 CREATE TABLE `transaction` (
   `Id` int NOT NULL AUTO_INCREMENT,
   `SenderAccountId` int DEFAULT NULL,
   `ReceiverAccountId` int DEFAULT NULL,
   `Amount` double DEFAULT NULL,
   PRIMARY KEY (`Id`),
   UNIQUE KEY `Id_UNIQUE` (`Id`),
   KEY `Primary Key` (`Id`),
   KEY `Foreign Key` (`SenderAccountId`,`ReceiverAccountId`),
   CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`SenderAccountId`) REFERENCES `moneyaccount` (`Id`),
   CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`ReceiverAccountId`) REFERENCES `moneyaccount` (`Id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
 
 
SET FOREIGN_KEY_CHECKS=0; DROP TABLE if exists `unverifiedtutor`; SET FOREIGN_KEY_CHECKS=1;
 CREATE TABLE `unverifiedtutor` (
   `Id` int NOT NULL AUTO_INCREMENT,
   `FirstName` varchar(50) DEFAULT NULL,
   `LastName` varchar(50) DEFAULT NULL,
   `UserName` varchar(50) DEFAULT NULL,
   `Email` varchar(100) DEFAULT NULL,
   `Password` varchar(100) DEFAULT NULL,
   `DateofBirth` date DEFAULT NULL,
   `Profile` json DEFAULT NULL,
   PRIMARY KEY (`Id`),
   UNIQUE KEY `Id_UNIQUE` (`Id`),
   UNIQUE KEY `UserName_UNIQUE` (`UserName`),
   UNIQUE KEY `Email_UNIQUE` (`Email`),
   KEY `Primary Key` (`Id`),
   KEY `Unique Key` (`UserName`,`Email`)
 ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

 SET FOREIGN_KEY_CHECKS=0; DROP TABLE if exists `chatroom`; SET FOREIGN_KEY_CHECKS=1;
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
 ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS=0; DROP TABLE if exists `message`; SET FOREIGN_KEY_CHECKS=1;
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
 ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
