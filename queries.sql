use tutorweb;

SELECT * FROM tutor;
SELECT * FROM tutee;
SELECT * FROM admin;
SELECT * FROM tutor WHERE Id = ?;
SELECT * FROM tutee WHERE Id = ?;
SELECT * FROM admin WHERE Id = ?;
SELECT * FROM tutor WHERE UserName =?;
SELECT * FROM tutee WHERE UserName =?;
SELECT * FROM admin WHERE UserName =?;
/****************/
SELECT * FROM contract;
SELECT * FROM contract WHERE Id = ?;
SELECT * FROM contract WHERE TutorId = ? AND TuteeId = ?;
SELECT * FROM issue;
SELECT * FROM issue WHERE Id = ?;
SELECT * FROM issue WHERE ContractId = ?;
SELECT * FROM issue WHERE ResolveAdminId = ?;
/****************/
SELECT * FROM MoneyAccount WHERE Code=?;
/* implement in functions: 
    if (tutor)
        para='tutor/'+tutorId
    else 
        para='tutee/'+tuteeId
*/ 
SELECT * FROM MoneyAccount WHERE Id=?;
SELECT * FROM Transaction;
SELECT * FROM Transaction WHERE Id=?;
SELECT * FROM Transaction WHERE SenderAccountId=?;
SELECT * FROM Transaction WHERE ReceiverAccountId=?;
SELECT * FROM Transaction WHERE SenderAccountId=? AND ReceiverAccountId =?; 
/****************/
SELECT * FROM Chatroom WHERE Id=?;
SELECT * FROM Chatroom WHERE TutorId =? AND TuteeId=?;
SELECT * FROM Message WHERE ChatroomId=?;
SELECT * FROM Message WHERE ChatroomId=? and IsTutor=1; /* 1 is tutor*/
SELECT * FROM Message WHERE ChatroomId=? and IsTutor=0;

