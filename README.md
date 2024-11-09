# KeyGuard - OTP Service
KeyGuard is a Two-Factor Authentication (2FA) service that generates and sends One-Time Passwords (OTPs) via email (using Nodemailer) and SMS (using Twilio). It ensures secure user authentication by validating OTPs sent to the user's email or phone.

This project is built with Next.js (14), TypeScript, Tailwind CSS, and integrates Nodemailer for email delivery and Twilio for SMS-based OTPs.

# Table of Contents
1. Features
2. Tech Stack
3. Setup Instructions
4. API Endpoints
   * Send OTP via Email
   * Send OTP via SMS
5. Verify OTP
6. Environment Variables
7.Contributing

# Features
 * OTP Generation: Generates a unique 6-digit OTP for secure authentication.
 * Email Delivery: Sends OTPs to users via email using Nodemailer (SMTP).
 * SMS Delivery: Sends OTPs to users via SMS using Twilio.
 * JWT Token: OTP is signed and embedded in a JWT token with a 10-minute expiration for secure validation.
 * OTP Verification: Validates the OTP entered by the user against the token.

# Tech Stack
 * Next.js 14: Server-side rendering and API routes for OTP generation and verification.
 * TypeScript: Static type checking for better maintainability.
 * Tailwind CSS: Utility-first CSS framework for fast and flexible design.
 * Nodemailer: SMTP client for sending OTPs via email.
 * Twilio: API for sending OTPs via SMS.
 * JWT (jsonwebtoken): Used to sign OTPs and create secure, time-limited tokens.

# Setup Instructions
Follow these steps to set up and run the KeyGuard project locally:

1. Clone the Repository
   git clone https://github.com/your-username/KeyGuard.git
   cd KeyGuard

2. Install Dependencies
To install the necessary dependencies, run the following command:
    npm install

3. Set Up Environment Variables
Create a .env.local file in the root directory of your project and configure the following environment variables:

  # Nodemailer SMTP credentials for sending email
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=your-smtp-email@example.com
    SMTP_PASS=your-smtp-email-password

 # Twilio credentials for sending SMS
    TWILIO_ACCOUNT_SID=your-twilio-account-sid
    TWILIO_AUTH_TOKEN=your-twilio-auth-token
    TWILIO_PHONE_NUMBER=your-twilio-phone-number

 # JWT secret for token signing
    JWT_SECRET=your-jwt-secret
4. Run the Development Server
To start the development server, run:
     npm run dev
Once the server is running, you can view the application by navigating to:
    http://localhost:3000


# API Endpoints
1. Send OTP via Email
  POST /api/send-email-otp
  Generates and sends a 6-digit OTP to the provided email address.
  
  Request Body:
    {
      "email": "user@example.com"
    }
  Response:
  {
    "success": true,
    "message": "OTP sent via email successfully!",
    "token": "JWT_TOKEN_HERE"
  }
  Error Response:
  {
    "success": false,
    "message": "Email is required"
  }

2. Send OTP via SMS
  POST /api/send-sms-otp
  Generates and sends a 6-digit OTP to the provided phone number.
  
  Request Body:
  {
    "phoneNumber": "+1234567890"
  }
  Response:
  {
    "success": true,
    "message": "OTP sent via SMS successfully!",
    "token": "JWT_TOKEN_HERE"
  }
  Error Response:
  {
    "success": false,
    "message": "Phone number is required"
  }

3. Verify OTP
  POST /api/verify-otp
  Validates the OTP entered by the user.
  
  Request Body:
  {
    "otp": "123456",
    "token": "JWT_TOKEN_HERE"
  }
  Response:
  {
    "success": true,
    "message": "OTP verification successful!"
  }
  Error Response:
  {
    "success": false,
    "message": "Invalid OTP"
  }
# Environment Variables
Make sure to set up the following environment variables in the .env.local file:
Variable - 	Description
SMTP_HOST -	SMTP server host for email (e.g., smtp.gmail.com)
SMTP_PORT -	SMTP server port (typically 587 for Gmail)
SMTP_USER -	Your email address for SMTP authentication
SMTP_PASS - Your email password or app-specific password
TWILIO_ACCOUNT_SID -	Your Twilio account SID
TWILIO_AUTH_TOKEN -	Your Twilio authentication token
TWILIO_PHONE_NUMBER	- Your Twilio phone number
JWT_SECRET -	A secret key for signing JWT tokens


# Contributing
I welcome contributions to KeyGuard! If you find a bug or want to propose an enhancement, please open an issue or submit a pull request.

Steps to Contribute:
 1. Fork this repository.
 2. Create a new branch (git checkout -b feature/your-feature).
 3. Commit your changes (git commit -am 'Add new feature').
 4. Push to the branch (git push origin feature/your-feature).
 5. Open a Pull Request.

# Acknowledgments
 * Next.js
 * Nodemailer
 * Twilio 
 * JWT (jsonwebtoken)
 * Tailwind CSS
 * Typescript
 * Javascript
