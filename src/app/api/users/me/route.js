import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connect();

export async function GET(request) {
    // extract data from the token
    const userId = await getDataFromToken(request);
    const user = await User.findById({ _id: userId }).select("-password");
    //check if there is no any user
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User Found", data: user });
}
