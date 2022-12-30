import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from 'src/db-schemas/users.schema';
import { NewUserDto } from './dto/newUsersDto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiResponse({ status: 201, type: Users })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({
    status: 409,
    description: 'Email in use',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  //   @UsePipes(ValidatePipe)
  @Post('/sing-up')
  signUp(@Body() newUserDto: NewUserDto) {
    return this.userService.signUp(newUserDto);
  }
}