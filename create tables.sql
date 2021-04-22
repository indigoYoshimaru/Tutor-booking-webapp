use tutorweb; /*name it as tutorweb for consistency*/
DROP TABLE IF EXISTS `Contract`;
CREATE TABLE `Contract` (
  `Id` Integer auto_increment,
  `TutorId` Integer,
  `TuteeId` Integer,
  `StartDate` Date,
  `CloseDate` Date,
  `TeachingHours` Double,
  `State` Varchar(25),
  `ListofTeachingDay` JSON,
  KEY `Primary Key` (`Id`),
  KEY `Foreign Key` (`TutorId`, `TuteeId`)
);

DROP TABLE IF EXISTS `Tutor`;
CREATE TABLE `Tutor` (
  `Id` Integer auto_increment,
  `FirstName` Varchar(25),
  `LastName` Varchar(25),
  `UserName` Varchar(25),
  `Email` Varchar(25),
  `Password` Varchar(25),
  `DateofBirth` Date,
  `Profile` JSON ,
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`UserName`, `Email`)
);

DROP TABLE IF EXISTS `CourseTeaching`;
CREATE TABLE `CourseTeaching` (
  `Id` Integer,
  `TutorId` Integer,
  `CourseId` Integer,
  KEY `Primary Key` (`Id`),
  KEY `Foreign Key` (`TutorId`, `CourseId`)
);

DROP TABLE IF EXISTS `Tutee`;
CREATE TABLE `Tutee` (
  `Id` Integer auto_increment,
  `FirstName` Varchar(25),
  `LastName` Varchar(25),
  `UserName` Varchar(25),
  `Email` Varchar(25),
  `Password` Varchar(25),
  `DateofBirth` Date,
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`UserName`, `Email`)
);

DROP TABLE IF EXISTS `Message`;
CREATE TABLE `Message` (
  `Id` Integer auto_increment,
  `ChatroomId` Integer,
  `IsTutor` Tinyint(1),
  `Timestamp` Date,
  `Content` Varchar(25),
  KEY `Primary Key` (`Id`),
  KEY `Foreign Key` (`ChatroomId`)
);

DROP TABLE IF EXISTS `MoneyAccount`;
CREATE TABLE `MoneyAccount` (
  `Id` Integer auto_increment,
  `Code` Varchar(25),
  `BalanceAmount` Double,
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`Code`)
);

DROP TABLE IF EXISTS `Issue`;
CREATE TABLE `Issue` (
  `Id` Integer auto_increment,
  `ContractId` Integer,
  `Type` Tinyint(1),
  `Content` Varchar(25),
  `ResolveAdminId` Integer,
  `TutorAgreement` Tinyint(1),
  `TuteeAgreement` Tinyint(1),
  `ReturnPercentage` Integer,
  KEY `Primary Key` (`Id`),
  KEY `Foreign Key` (`ContractId`, `ResolveAdminId`),
  CONSTRAINT UNIQUE(`ContractId`)
);

DROP TABLE IF EXISTS `Course`;
CREATE TABLE `Course` (
  `Id` Integer auto_increment,
  `Name` Varchar(25),
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`Name`)
);

DROP TABLE IF EXISTS `Transaction`;
CREATE TABLE `Transaction` (
  `Id` Integer auto_increment,
  `SenderAccountId` Integer,
  `ReceiverAccountId` Integer,
  `Amount` Double,
  KEY `Primary Key` (`Id`),
  KEY `Foreign Key` (`SenderAccountId`, `ReceiverAccountId`)
);

DROP TABLE IF EXISTS `Admin`;
CREATE TABLE `Admin` (
  `Id` Integer auto_increment,
  `FirstName` Varchar(25),
  `LastName` Varchar(25),
  `UserName` Varchar(25),
  `Password` Varchar(25),
  `DateofBirth` Date,
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`UserName`)
);

DROP TABLE IF EXISTS `UnverfiedTutor`;
CREATE TABLE `UnverfiedTutor` (
  `Id` Integer auto_increment,
  `FirstName` Varchar(25),
  `LastName` Varchar(25),
  `UserName` Varchar(25),
  `Email` Varchar(25),
  `Password` Varchar(25),
  `DateofBirth` Date,
  `Profile` JSON ,
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`UserName`, `Email`)
);

DROP TABLE IF EXISTS `Chatroom`;
CREATE TABLE `Chatroom` (
  `Id` Integer auto_increment,
  `TutorId` Integer,
  `TuteeId` Integer,
  KEY `Primary Key` (`Id`),
  KEY `Foreign Key` (`TutorId`, `TuteeId`),
  CONSTRAINT UNIQUE (`TutorId`, `TuteeId`)
);