# Student Management System

**This project focuses on two main aspects: staff and student data, how they are created, and the required tools to retrieve specific information by connecting it to mongoose. In the staff, we have certain roles that each individual works on: "Admin","Staff Member", and "Teacher". Dotenv is the main file that lets us customize our environment variables without revealing them. There is also the error handling middleware that takes care of any errors in our application.**

***

**The REST APIs are used for doing the CRUD operations related to the staff and student data. Moreover, in order for a student or any staff role member to login, JWT token is required to authenticate and verify that the user is logged in by encrypting, signing, and verifying the payload. We need to verify the logins depending on who is logging in using the verification middleware so that he/she can have unique roles based on certain functionalities. We have both access and refresh tokens; the access token should not be revealed to anyone, and the refresh token should appear in the database. Everytime the user logs in whether he/she is a student or a staff member, a new access token will be generated. The access can also be expired depending on how much time you give it, and it is always less than the refresh token.**

***

<<<<<<< HEAD
**The most important part of this system is authorization where some data are unrevealed to others such as:**
=======
**The most important part of this system is authorization where some data are unrevealed to others such as:** 
>>>>>>> d9bd002ccf61f557c4cc7572c48735ff9a60594c
1. Student cannot enter and change any staff member's own information
2. Student should have permission from the staff to update his data, and change his/her password
3. Admin creates, updates or deletes a staff
4. Admin adds or removes a student
5. Staff members retrieve all student data
<<<<<<< HEAD

=======
>>>>>>> d9bd002ccf61f557c4cc7572c48735ff9a60594c

