import User from "@/models/user.model";
import nodemailer from "nodemailer";
export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "12a477c0d65adc",
                pass: "2edebf4a3a19c8",
            },
        });

        const mailOptions = {
            from: "rishabh83406@gmail.com", // sender address
            to: email, // list of receivers
            subject:
                emailType === "VERIFY"
                    ? "Verify Your email"
                    : "Reset Your Password", // Subject line
            text: "Hello world?", // plain text body
            html: `
            <>Click <a href="${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken}">here</a>
            to ${
                emailType === "VERIFY"
                    ? "verify your email"
                    : "reset your password"
            }
            or copy and paste the link below in your browser.<br>
            ${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>
            `, // html body
        };
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};
