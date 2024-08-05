import nodemailer from 'nodemailer';


//we can also generate the otp by using the crypto for more secure otp in nodejs

// import crypto from 'crypto';

// function generateSecureOtp(length: number): string {
//   const otp = crypto.randomBytes(length).toString('hex').slice(0, length);
//   return otp;
// }

// const secureOtp = generateSecureOtp(6); // Generate a 6-character OTP
// console.log(secureOtp);


// Configure your email transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email service
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export function sendOtpEmail(to: string, otp: string) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

export function generateOtp(length: number): string {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}
