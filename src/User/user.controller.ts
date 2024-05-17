import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { ResponseMassage } from '../Common/decorator/response.decorater';
import { CREATE_USER } from '../utils/constans/sucessMassage';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ResponseMassage(CREATE_USER)
  createUser(@Body() userDTO: UserDTO) {
    return this.userService.createUser(userDTO);
  }
}
