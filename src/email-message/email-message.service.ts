import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmailMessageService {
  constructor(private readonly mailerService: MailerService) {}

  async newUserMessage(email: string): Promise<string> {
    const dev = process.env.DEV
      ? `http://localhost:${process.env.PORT}`
      : 'https://patissier-server.herokuapp.com';
    const link = uuidv4();
    const title = 'Підтвердження пошти на сайті Bakery';
    const html = `<div>
    <h1>Підтвердження пошти на сайті Bakery</h1>
    <span>Для підтвердження перейдіть  <a href="${dev}/auth/activate/${link}">за посиланням</a></span>
    </div>`;
    // if (!dev) {
    await this.example(html, title, email);
    // }

    return link;
  }

  async forgottenPassword(email): Promise<string> {
    const dev = process.env.DEV
      ? `http://localhost:${process.env.PORT}`
      : 'https://patissier-server.herokuapp.com';
    const link = uuidv4();
    const title = 'Зміна пароля на сайті Bakery';
    const html = `<div>
    <h1>Підтвердження пошти на сайті Bakery</h1>
    <span>Для підтвердження перейдіть  <a href="${dev}/auth/forgotten-password/${link}">за посиланням</a></span>
    </br>
    </br>
    <span>Якщо це були не ви то перейдіть <a href="${dev}/auth/forgotten-password/error/${link}">за посиланням</a></span>
    </div>`;

    await this.example(html, title, email);

    return link;
  }

  private async example(
    html: string,
    title: string,
    email: string,
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: 'test.server.byht1@gmail.com',
        subject: title,
        html,
      });
    } catch {
      throw new HttpException(
        'Не вдалося відправити повідомлення на пошту',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // .then(info => {
    //   console.log(info);
    // })
    // .catch(error => {
    //   console.error(error);
    // });
  }
}
