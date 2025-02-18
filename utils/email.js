import nodemailer from "nodemailer";
import { config } from "../config.js"; // config 불러오기

const transporter = nodemailer.createTransport({
  host: "smtp.naver.com",
  port: 465,
  secure: true,
  auth: {
    user: config.nodemailer.email, // config에서 이메일 계정 가져오기
    pass: config.nodemailer.password, // config에서 비밀번호 가져오기
  },
});

export async function sendEmail({ from = config.nodemailer.email, to, subject, text }) {
  try {
    await transporter.sendMail({
      from, 
      to,   
      subject,
      text,
    });
    console.log(`이메일 전송 성공: ${to}`);
  } catch (error) {
    console.error("이메일 전송 실패:", error);
    throw error;
  }
}
