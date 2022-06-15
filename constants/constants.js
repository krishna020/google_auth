require('dotenv').config();
module.exports = {
  allowedOrigins: ['http://localhost:3000/'],
  SERVER_PORT: process.env.PORT || 3000,
  SERVER_DB_URI: process.env.MONGODB_URL_LOCAL,
  JWT_SECRET: 'thisIsASimpleTest',
  OTP_LENGTH: 10,
  OTP_CONFIG: {
    upperCaseAlphabets: false,
    specialChars: false,
  },
  MAIL_SETTINGS: {
   // host: 'smtp.gmail.com',
   // port: 587,
    service: 'gmail',
    auth: {
     user: "krishna.sahu551632@gmail.com",
      pass: "elzhdhsisujqsnyp",
    },
  },
  
   
};