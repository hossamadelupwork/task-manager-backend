import { UserData } from './user.interface';
import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";
import { SECRET } from "src/config";
const jwt = require('jsonwebtoken');
import * as argon2 from 'argon2';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
      ) {}

    async findOne({email, password}: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({email});
        if (!user) {
            return null;
        }

        if (await argon2.verify(user.password, password)) {
            return user;
        }

        return null;
    }

    async findById(id: number): Promise<UserData>{
        const user = await this.userRepository.findOne(id);

        if (!user) {
            const errors = {User: ' not found'};
            throw new HttpException({errors}, 401);
        }

        return this.buildUser(user);
    }

    private buildUser(user: UserEntity) {
        const userObj = {
          id: user.id,
          username: user.username,
          email: user.email,
          token: this.generateJWT(user),
        };
    
        return userObj;
    }

    public generateJWT(user) {
        let today = new Date();
        let exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            exp: exp.getTime() / 1000,
        }, SECRET);
    };  
}