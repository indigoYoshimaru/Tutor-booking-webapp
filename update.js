addTutor(tutorInfo)--> addMoneyAccount(tutorId), addCourseTeaching(tutorId, courseId) // we temporary assume that admins do not need to make approval of tutors' registration
addTutee(tuteeInfo)--> addMoneyAccount(tuteeId)
//used by admins only
addCourse(name)
addAdmin(adminInfo)
/*==========================*/
deleteTutor(tutorId) <-- deleteCourseTeaching(tutorId)
deleteTutee(tuteeId)
deleteAdmin(adminId)

/*==========================*/
//contract created by tutee
addContract(contractInfo)
addMoneyAccount(contractId)
addTransaction(transactionInfo)// sender is tutee, receiver is contract
updateMoneyAccount(tuteeId)
//contract closed if success
addTransaction(transactionInfo) //sender is contract, receiver is tutor
updateMoneyAccount(tutorId)
closeContract(contractId)
//issue raise: add later
