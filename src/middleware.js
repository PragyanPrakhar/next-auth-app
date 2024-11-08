import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath =
        path === "/login" || path === "/signup" || path === "/verifyemail";

    const token = request.cookies.get("token")?.value || "";
    console.log("Token is :-> ", token);
    console.log("Path is :-> ", path);
    console.log("isPublicPath is :-> ", isPublicPath);
    if (isPublicPath && token) {
        console.log("Path and Token , both are available in public path");
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
        //   return NextResponse.redirect(new URL('/home', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/", "/login", "/signup", "/profile","/verifyemail"],
};
