import nodemailer from "nodemailer";

// Generate a 4-digit OTP
const generateOTP = (): string => {
  let otp = "";
  for (let i = 0; i < 4; i++) {
    let num = Math.floor(Math.random() * 10);
    if (num === 0) num = 1; // avoid leading zero
    otp += num;
  }
  return String(otp);
};

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

// Optional transporter event
transporter.on("sent", (info) => {
  console.log("Email sent:", info.response);
  if (info.rejected.length > 0) {
    console.log("Some recipients were rejected:", info.rejected);
  }
});

// Send OTP email
const sendOTPThroughEmail = async (
  userEmail: string,
  OTP: string
): Promise<boolean> => {
  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: userEmail,
    subject: "OTP verification",
    text: `Your OTP for email verification: ${OTP}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return true;
  } catch (error: any) {
    console.error("Error sending email:", error);
    return false;
  }
};

export { generateOTP, sendOTPThroughEmail };
