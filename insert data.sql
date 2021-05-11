use tutorweb;
INSERT INTO `admin` VALUE (1, 'Adam', 'Smasher', 'AdaSma','adasma@gmail.com', 'admin', '1990-11-11');
INSERT INTO `tutor` VALUEs (1, 'John', 'Cena', 'WWE', 'CenaJ@wwe.com', 'u cant see me', '2000-11-18', '{"Background": [{"Id": 1, "Name": "Intro to AI", "GPA": 3.75}, 
{"Id": 2, "Name": "Intro to Computing", "GPA": 3.9}], "Description": "I am handsome"}'), (2, 'John', 'Wick', 'PencilKiller', 'ILoveDog@gov.us', 'doggy cute', '1998-05-16',
'{"Background": [{"Id": 3, "Name": "Writing AE2", "GPA": 3.9}], "Description": "Study or Die"}');
INSERT INTO tutorweb.unverifiedtutor (FirstName, LastName, UserName, Email, Password, DateofBirth, Profile) VALUES("John","Pham","johnpham","minhrongcon2000@gmail.com","ML is faster than DL", "2000-01-01",'{"Background": [{"Id": 1, "Name": "Intro to AI","GPA": 4.0 },{"Id": 2, "Name": "Intro to Computing","GPA":4.0}],"Description": "Study or die"}');
INSERT INTO `tutee` VALUEs (1, 'John', 'Fitzgerald Kenedy', 'JFK', 'gotheadshot@gov.us', 'president', '1980-02-06'), (2, 'Donald', 'Jump', 'donaldTheDuck', 'DoNamTrung@yahoo.com.vn', 'kkkooo', '2003-06-07');
INSERT INTO `course` VALUEs (1, 'Intro to AI'), (2, 'Intro to Computing'), (3, 'Writing AE2'), (4, 'Micro'), (5, 'Physics 4');
INSERT INTO `contract` VALUEs (1, 2, 1, '2021-05-08', '2021-05-12', 12.5, 'CLOESED', '{"List of teaching days": "Monday, Friday"}');
INSERT INTO `courseteaching` VALUEs (1, 1, 1), (2, 1, 2);