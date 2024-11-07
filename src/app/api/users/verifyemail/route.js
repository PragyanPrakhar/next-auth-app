import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request) {
    try {
        const { token } = await request.json();
        console.log("Token is :-> ", token);
        const user = await User.findOneAndUpdate({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() },
        });
        if (!user) {
            return NextResponse.json(
                {
                    error: "Token is invalid or has expired",
                },
                { status: 400 }
            );
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json(
            {
                message: "Emmail of the user verified successfully",
                success: true,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                status: 500,
            },
            { error: error.message }
        );
    }
}
