import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmailMessageService {
  constructor(private readonly mailerService: MailerService) {}

  public async newUserMessage(email: string): Promise<string> {
    const link = uuidv4();
    const title = 'Підтвердження пошти на сайті Bakery';
    const html = `<div>
    <h1>Підтвердження пошти на сайті Bakery</h1>
    <span>Для підтвердження перейдіть  <a href="https://filmoteka-server.herokuapp.com/user/activate/${link}">за посиланням</a></span>
    </div>`;

    try {
      await this.example(html, title, email);

      return link;
    } catch (error) {
      throw error;
    }
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
