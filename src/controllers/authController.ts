import { Request, Response } from "express";
import UserModel from "../models/user.js";
import https from "https";

export async function loginAuth(req: Request, res: Response): Promise<void> {
  try {
    const { mobile } = req.body;

    const user = await UserModel.findOne({ mobile });

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(`Error in signup: ${error.message}`);
  }
}

export async function signupAuth(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, mobile, gender, role } = req.body;

    const existingUser = await UserModel.findOne({ mobile });

    if (existingUser) {
      throw new Error("User with this mobile already exists");
    }

    const newUser = new UserModel({
      name,
      email,
      mobile,
      gender,
      role,
    });

    await newUser.save();

    if (!newUser) {
      throw new Error("User not created");
    }

    res.status(200).json(newUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(`Error in signup: ${error.message}`);
  }
}

export async function otpAuth(req: Request, res: Response): Promise<void> {
  try {
    const { mobile } = req.body; // Get mobile number from request body
    if (!mobile) {
      res.status(400).json({ error: "Mobile number is required" });
      return;
    }

    const authKey = process.env.MSG91_AUTH_KEY; // Store in .env
    const templateId = process.env.MSG91_TEMPLATE_ID; // Store in .env
    const otpExpiry = 5; // OTP expiry in minutes

    const options = {
      method: "POST",
      hostname: "control.msg91.com",
      port: null,
      path: `/api/v5/otp?otp_expiry=${otpExpiry}&template_id=${templateId}&mobile=${mobile}&authkey=${authKey}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const request = https.request(options, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        const responseData = JSON.parse(data);
        if (response.statusCode === 200) {
          res.json({ message: "OTP sent successfully", data: responseData });
        } else {
          res.status(response.statusCode || 500).json({ error: responseData });
        }
      });
    });

    request.on("error", (error) => {
      res.status(500).json({ error: error.message });
    });

    request.write(JSON.stringify({}));
    request.end();
  } catch (error: any) {
    console.error(`Error in otpAuth: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function verifyOtp(req: Request, res: Response): Promise<void> {
  try {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
      res.status(400).json({ error: "Mobile number and OTP are required" });
      return;
    }

    const authKey = process.env.MSG91_AUTH_KEY;

    const options = {
      method: "GET",
      hostname: "control.msg91.com",
      port: null,
      path: `/api/v5/otp/verify?otp=${otp}&mobile=${mobile}`,
      headers: {
        authkey: authKey,
      },
    };

    const request = https.request(options, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        const responseData = JSON.parse(data);
        if (response.statusCode === 200 && responseData.type === "success") {
          res.json({ message: "OTP verified successfully", data: responseData });
        } else {
          res.status(400).json({ error: "Invalid OTP", data: responseData });
        }
      });
    });

    request.on("error", (error) => {
      res.status(500).json({ error: error.message });
    });

    request.end();
  } catch (error: any) {
    console.error(`Error in verifyOtp: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function resendOtp(req: Request, res: Response): Promise<void> {
  try {
    const { mobile, retryType } = req.body; // retryType: 'text' or 'voice'

    if (!mobile || !retryType) {
      res.status(400).json({ error: "Mobile number and retry type are required" });
      return;
    }

    const authKey = process.env.MSG91_AUTH_KEY; // Stored in .env

    const options = {
      method: "GET",
      hostname: "control.msg91.com",
      port: null,
      path: `/api/v5/otp/retry?authkey=${authKey}&retrytype=${retryType}&mobile=${mobile}`,
      headers: {},
    };

    const request = https.request(options, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        const responseData = JSON.parse(data);
        if (response.statusCode === 200 && responseData.type === "success") {
          res.json({ message: "OTP resent successfully", data: responseData });
        } else {
          res.status(400).json({ error: "Failed to resend OTP", data: responseData });
        }
      });
    });

    request.on("error", (error) => {
      res.status(500).json({ error: error.message });
    });

    request.end();
  } catch (error: any) {
    console.error(`Error in resendOtp: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}