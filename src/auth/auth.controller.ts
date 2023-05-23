import { EmailDto, ForgottenPasswordNewDto, LogInDto, NewPasswordDto, NewUserDto, RefreshActiveLinkDto } from './dto';
import { AuthService } from './auth.service';
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Redirect,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { Users } from 'src/db-schemas/users.schema';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { ValidatePipe } from 'src/classValidator';
import { IReqUser } from 'src/type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private redirectRootLink = process.env.REDIRECT_ROOT_LINK || 'http://localhost:3000/patissier-client';
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 201, type: Users })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({
    status: 409,
    description: 'Email in use',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @Post('/sign-up')
  signUp(@Body() newUserDto: NewUserDto) {
    return this.authService.signUp(newUserDto);
  }

  @ApiResponse({ status: 201, type: Users })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 401, description: 'User does not exist' })
  @ApiResponse({ status: 401, description: 'Incorrect password' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @Post('/log-in')
  lohIn(@Body() logInDto: LogInDto) {
    return this.authService.logIn(logInDto);
  }

  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'The token issued to the current user.',
    },
  ])
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 403, description: 'Не валідний токен' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Get('/logout')
  logOut(@Req() req: IReqUser) {
    return this.authService.logOut(req.user, req.currentToken);
  }

  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'The token issued to the current user.',
    },
  ])
  @ApiResponse({ status: 201, type: Users })
  @ApiResponse({ status: 403, description: 'Не валідний токен' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('current')
  current(@Req() req: IReqUser) {
    return req.user;
  }

  @Get('/active/:verificationToken')
  @Redirect('', 302)
  async verification(@Param('verificationToken') verificationToken: string) {
    const status = await this.authService.verification(verificationToken);

    // Якщо валідний
    if (status) return { url: this.redirectRootLink };

    // якщо не валідний
    return { url: this.redirectRootLink + '/error/invalid/active' };
  }

  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 401, description: 'User does not exist' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @HttpCode(204)
  @UsePipes(ValidatePipe)
  @Post('/active/refresh-link')
  refreshActiveLink(@Body() body: RefreshActiveLinkDto) {
    return this.authService.refreshActiveLink(body.email);
  }

  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'The token issued to the current user.',
    },
  ])
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 403, description: 'Не валідний токен' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidatePipe)
  @Patch('/new-password')
  newPassword(@Body() body: NewPasswordDto, @Req() req: IReqUser) {
    return this.authService.newPassword(body, req.user);
  }

  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @HttpCode(204)
  @Patch('/forgotten-password')
  forgottenPassword(@Body() emailDto: EmailDto) {
    return this.authService.forgottenPassword(emailDto.email);
  }

  @Get('/forgotten-password/:link')
  @Redirect('', 302)
  async forgottenPasswordRedirect(@Param('link') link: string) {
    const isValid = await this.authService.forgottenPasswordRedirect(link);

    // Якщо валідний
    if (isValid) return { url: this.redirectRootLink + '/forgotten-password/new' };

    // якщо не валідний
    return { url: this.redirectRootLink + '/error/invalid/password' };
  }

  @Get('/forgotten-password/error/:link')
  @Redirect('', 302)
  async forgottenPasswordError(@Param('link') link: string) {
    await this.authService.forgottenPasswordError(link);

    return { url: this.redirectRootLink + '/forgotten-password/error/skip' };
  }

  @Patch('/forgotten-password/new/:link')
  forgottenPasswordNew(@Body() body: ForgottenPasswordNewDto, @Param('link') link: string) {
    return this.authService.forgottenPasswordNew(body.newPassword, link);
  }
}
