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
      tls: {
        rejectUnauthorized: false,
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

  async sendStatusMail(to, link) {
    await this.transporter.sendMail({
      from: "a.kosmaganbet03@gmail.com",
      to,
      subject: `Поздравляем!`,
      text: "Вы успешно стали гидом на платформе Go Trip! 🎉",
      html: `
        <div>
          <p>Это отличное достижение, которое открывает перед вами множество возможностей для путешествий, общения с людьми со всего мира и деления своими знаниями и опытом.</p>
          <p>Теперь вы можете делиться своими уникальными знаниями о различных местах, помогать другим путешественникам создавать незабываемые впечатления и вдохновлять их на новые приключения.</p>
          <p>Не забудьте обновить свой профиль с информацией о себе, своих интересах и специализации, чтобы путешественники могли легко найти и связаться с вами.</p>
          <p>Спасибо, что выбрали Go Trip! Желаем вам удачи и ярких путешествий!</p>
          <p><b>С уважением, Команда Go Trip</b></p>
          <a href="${link}">${link}</a>
        </div>
      `,
    });
  }

  async sendGuideMail(to, link) {
    await this.transporter.sendMail({
      from: "a.kosmaganbet03@gmail.com",
      to,
      subject: `Спасибо что присоединились к нам`,
      text: "Теперь Вы - часть нового мира путешествий… Почти! 🎉",
      html: `
        <div>
          <p>Команда Локали мечтает сделать лучший сервис для путешествий по всему миру. Чтобы наша мечта сбылась, мы уделяем особое внимание местным жителям, добавляя на сайт только самых интересных ребят.</p>
          <p>Мы почти уверены, что вы - в их числе. Чтобы убедиться в этом, а также рассказать об особенностях сервиса, правилах взаимодействия и выплаты вознаграждения участники команды Локали свяжутся с вами в ближайшее время.</p>
          <p>Спасибо большое за то, что оставили заявку!</p>
          <p><b>С уважением, Команда Go Trip</b></p>
          <a href="${link}">${link}</a>
        </div>
      `,
    });
  }
}

module.exports = new MailService();
