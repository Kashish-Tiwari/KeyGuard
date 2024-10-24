import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
  }

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Sign OTP into JWT (valid for 10 minutes)
  const token = jwt.sign({ otp }, process.env.JWT_SECRET!, { expiresIn: '10m' });

  // Create a transporter for sending email
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Send the OTP via email
    await transporter.sendMail({
      from: 'KeyGuard-2FA-Auth <senderemail@gmail.com>', // sender address
      to: email, // recipient email
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    });

    return NextResponse.json({ success: true, message: 'OTP sent via email successfully!', token });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to send OTP via email', error }, { status: 500 });
  }
}
