import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
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

  // #TODO refactor sendMail args into an object

  async sendMail(
    to: string,
    name: string,
    subject: string,
    description: string,
    surveyUserId: string,
    path: string
  ) {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    console.log(process.env.URL_MAIL);

    const html = handleBars.compile(templateFileContent)({
      name,
      title: subject,
      description,
      link: process.env.URL_MAIL,
      surveyUserId,
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
