import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connect();
export async function POST(request) {
    const { username, email, password } = await request.json();
    try {
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        console.log(savedUser);
        //send verification email
        await sendEmail(email, "VERIFY", savedUser._id);

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message });
    }
}
