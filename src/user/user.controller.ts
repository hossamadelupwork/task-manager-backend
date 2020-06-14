import { Controller, Post, Body, HttpException, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UserData } from './user.interface';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}
    
    @UsePipes(new ValidationPipe())
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<UserData> {
        const _user = await this.userService.findOne(loginUserDto);

        const errors = {User: ' not found'};
        if (!_user) throw new HttpException({errors}, 401);

        const token = await this.userService.generateJWT(_user);
        const {email, username} = _user;
        const user = {email, token, username};
        return user;
    }
}
