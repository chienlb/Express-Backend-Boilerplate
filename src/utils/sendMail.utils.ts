import transporter from "@/configs/email.config";
import ApiError from "./apiError.utils";

export const sendEmail = async (mailOptions: any) => {
  try {
    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) return reject(error);
        resolve(info);
      });
    });

    console.log("Email sent successfully");
    console.log(info);
  } catch (error) {
    throw new ApiError(400, `Email sending failed: ${error}`);
  }
};
