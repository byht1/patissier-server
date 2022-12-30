import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmailMessageService {
  constructor(private readonly mailerService: MailerService) {}

  public newUserMessage(email: string): string {
    const link = uuidv4();
    const title = 'Підтвердження пошти на сайті Bakery';
    const html = `<div>
    <h1>Підтвердження пошти на сайті Bakery</h1>
    <span>Для підтвердження перейдіть  <a href="https://filmoteka-server.herokuapp.com/user/activate/${link}">за посиланням</a></span>
    </div>`;

    this.example(html, title, email);

    return link;
  }

  private example(html: string, title: string, email: string): void {
    this.mailerService
      .sendMail({
        to: 'test.server.byht1@gmail.com',
        from: email,
        subject: title,
        html,
      })
      .then(() => {
        //
      })
      .catch(error => {
        console.error(error);
      });
    // this.mailerService
    //   .sendMail({
    //     to: 'test@nestjs.com', // list of receivers
    //     from: 'noreply@nestjs.com', // sender address
    //     subject: 'Testing Nest MailerModule ✔', // Subject line
    //     text: 'welcome', // plaintext body
    //     html: '<b>welcome</b>', // HTML body content
    //   })
    //   .then(() => {})
    //   .catch(error => {
    //     console.error(error);
    //   });
  }
}
