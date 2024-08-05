import { connectDB } from "@/db/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/extractToken.helper";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    }

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
