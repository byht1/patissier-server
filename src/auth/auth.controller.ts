import {
  EmailDto,
  ForgottenPasswordNewDto,
  LogInDto,
  NewPasswordDto,
  NewUserDto,
  RefreshActiveLinkDto,
} from './dto';
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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import { Users } from 'src/db-schemas/users.schema';
import { ValidatePipe } from './pipe/validate.pipe';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { IRequestUser } from './type';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Google log-in GET доробить
  // Facebook log-in GET доробить

  @ApiResponse({ status: 201, type: Users })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({
    status: 409,
    description: 'Email in use',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @Post('/sing-up')
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
  logOut(@Req() req: IRequestUser) {
    return this.authService.logOut(req.user, req.currentToken);
  }

  @Get('/active/:verificationToken')
  // Переробити
  @Redirect('', 302)
  verification(@Param('verificationToken') verificationToken: string) {
    const status = this.authService.verification(verificationToken);

    // Переробити
    if (status) return { url: '' };

    // Переробити
    return { url: '' };
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
  newPassword(@Body() body: NewPasswordDto, @Req() req: IRequestUser) {
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
  // Переробити
  @Redirect('', 302)
  async forgottenPasswordRedirect(@Param('link') link: string) {
    await this.authService.forgottenPasswordRedirect(link);

    // Переробити
    return { url: `.../${link}` };
  }

  @Get('/forgotten-password/error/:link')
  // Переробити
  @Redirect('', 302)
  async forgottenPasswordError(@Param('link') link: string) {
    await this.authService.forgottenPasswordError(link);

    // Переробити
    return { url: `.../${link}` };
  }

  @Patch('/forgotten-password/new/:link')
  forgottenPasswordNew(
    @Body() body: ForgottenPasswordNewDto,
    @Param('link') link: string,
  ) {
    return this.authService.forgottenPasswordNew(body.newPassword, link);
  }
}
