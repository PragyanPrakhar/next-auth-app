import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function GET(request) {
    try {
        // const { token } = request.cookies;
        const response = NextResponse.json({
            message: "Logged Out successfully",
            success: true,
        });
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
