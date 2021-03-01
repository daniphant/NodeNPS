import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import path from "path";
import handleBars from "handlebars";
import fs from "fs";

class SendMailService {
  client: Mail;

  constructor(transporter: Mail) {
    nodemailer.createTestAccount();
    this.client = transporter;
  }

  static async build() {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    return new SendMailService(transporter);
  }

  async sendMail(to: string, subject: string, description: string) {
    const templateFileContent = fs
      .readFileSync(
        path.resolve(__dirname, "..", "views", "emails", "npsMail.hbs")
      )
      .toString("utf-8");

    const html = handleBars.compile(templateFileContent)({
      name: to,
      title: subject,
      description,
    });

    const message = {
      from: "NPS <noreply@NodeNPS.me>",
      to,
      subject,
      html,
    };

    await this.client.sendMail(message, (err, info) => {
      if (err) throw err;

      console.log(`Message sent: ${info.messageId}`);
      console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    });
  }
}
export default SendMailService;
