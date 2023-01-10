import { LogInDto, NewUserDto, RefreshActiveLinkDto } from './dto';
import { AuthService } from './auth.service';
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Redirect,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { Users } from 'src/db-schemas/users.schema';
import { ValidateNewUserPipe } from './pipe/validate-new-user.pipe';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { IRequestUser } from './type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Google log-in
  // Facebook log-in

  @ApiResponse({ status: 201, type: Users })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({
    status: 409,
    description: 'Email in use',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidateNewUserPipe)
  @Post('/sing-up')
  signUp(@Body() newUserDto: NewUserDto) {
    return this.authService.signUp(newUserDto);
  }

  @ApiResponse({ status: 201, type: Users })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 401, description: 'User does not exist' })
  @ApiResponse({ status: 401, description: 'Incorrect password' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidateNewUserPipe)
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

  @Get('active/:verificationToken')
  @Redirect('', 302)
  verification(@Param('verificationToken') verificationToken: string) {
    const status = this.authService.verification(verificationToken);

    if (status) return { url: '' };

    return { url: '' };
  }

  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 401, description: 'User does not exist' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @HttpCode(204)
  @UsePipes(ValidateNewUserPipe)
  @Post('active/refresh-link')
  refreshActiveLink(@Body() body: RefreshActiveLinkDto) {
    return this.authService.refreshActiveLink(body.email);
  }
}
