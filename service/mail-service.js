const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "a.kosmaganbet03@gmail.com",
        pass: "ipfv evvc dnih qaex",
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: "a.kosmaganbet03@gmail.com",
      to,
      subject: `Активация аккаунта на Go Trip :)`,
      text: "",
      html: `
        <div>
          <h1>Для активаций перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    });
  }
}

module.exports = new MailService();
