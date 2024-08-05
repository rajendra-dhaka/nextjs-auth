import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/user.model";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: string;
  userId: string;
}) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "cf4454b545362d", //❌
        pass: "d455f4f17bc3b3", //❌
      },
    });

    const htmlNode = `
  <p>Click
    <a href="${
      process.env.DOMAIN
    }/verifyemail?token=${hashedToken}">here</a> to ${
      emailType === "VERIFY" ? "verify your email" : "reset your password"
    }
    or copy and paste the link below in your browser
    <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
  </p>
`;

    const mailOptions = {
      from: " rajendradhaka13@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your Email" : "Reset your password", // Subject line
      //   text: "Hello world?", // plain text body
      html: htmlNode, // html body
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
