import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { otp, token } = await request.json();

  if (!otp || !token) {
    return NextResponse.json({ success: false, message: 'OTP and token are required' }, { status: 400 });
  }

  try {
    // Verify the token and OTP
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // Compare the OTP
    if (decoded.otp === otp) {
      return NextResponse.json({ success: true, message: 'OTP verification successful!' });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid OTP' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'OTP expired or invalid token', error }, { status: 400 });
  }
}
