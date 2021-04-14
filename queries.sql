use turtorial;

SELECT * FROM tutor;
SELECT * FROM tutee;
SELECT * FROM admin;
SELECT * FROM tutor WHERE Id = Id?;
SELECT * FROM tutee WHERE Id = Id?;
SELECT * FROM admin WHERE Id = Id?;
SELECT * FROM tutor WHERE UserName = userName?;
SELECT * FROM tutee WHERE UserName = userName?;
SELECT * FROM admin WHERE UserName = userName?;

SELECT * FROM contract;
SELECT * FROM contract WHERE Id = Id?;
SELECT * FROM contract WHERE TutorId = tutorId? AND TuteeId = tuteeId?;
SELECT * FROM issue;
SELECT * FROM issue WHERE Id = Id?;
SELECT * FROM issue WHERE ContractId = Id?;
SELECT * FROM issue WHERE ResolveAdminId = Id?;