import { connectDB } from "@/db/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mail.helper";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    // Hashing of password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Creating new User Object
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    console.log(savedUser);

    // send Verification email

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User registerd successfully!",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
