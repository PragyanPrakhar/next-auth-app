import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        console.log("Email And Password is :-> ", email, password);
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
        console.log("User exists");
        const isValidPassword = await bcryptjs.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Invalid Credentials" },
                { status: 400 }
            );
        }
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: "1d",
        });
        const response = NextResponse.json({
            message: "Logged In successfully",
            success: true,
        });
        response.cookies.set("token", token, {
            httpOnly: true,
        });
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
