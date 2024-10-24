import { NextResponse } from 'next/server';
import twilio from 'twilio';
import jwt from 'jsonwebtoken';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);
console.log(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_PHONE_NUMBER, process.env.TWILIO_AUTH_TOKEN,"PPPPPPP");

export async function POST(request: Request) {
  const { phoneNumber } = await request.json();
console.log(phoneNumber,'NOMMBERR');

  if (!phoneNumber) {
    return NextResponse.json({ success: false, message: 'Phone number is required' }, { status: 400 });
  }

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Sign OTP into JWT (valid for 10 minutes)
  const token = jwt.sign({ otp }, process.env.JWT_SECRET!, { expiresIn: '10m' });
  

  try {
    // Send OTP via SMS using Twilio
    
  const a=  await client.messages.create({
      body: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: phoneNumber,
    });
    return NextResponse.json({ success: true, message: 'OTP sent via SMS successfully!', token });
  } catch (error:any) {
    return NextResponse.json({ success: false, message: 'Failed to send OTP via SMS', error:error.message }, { status: 500 });
  }
}
