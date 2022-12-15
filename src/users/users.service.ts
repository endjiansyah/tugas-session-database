// src/users/users.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { CreateUserDto } from 'src/dto/users.dto';
import { User } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    private readonly users: any[];

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async deleteUser(userId: number) {
        // get existing data
        let user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new BadRequestException('user tidak ditemukan');

            // execute delete user
            this.userRepository.remove(user);
        }
    }
    async createUser(cud: CreateUserDto) {
        // const newUser = this.userRepository.create(cud);
        // return this.userRepository.save(newUser);

        const user = await this.userRepository.create({
            email: cud.email,
            username: cud.username,
            password: cud.password,
        });

        return this.userRepository.save(user);
    }
    async updateUser(userId: number, cud: CreateUserDto) {
        const userExist = await this.userRepository.findOne({
            where: {
                id: userId
            },
        });
        if (!userExist) {
            throw new BadRequestException("data kosong / tidak ada");
        }

        //logic update
        userExist.email = cud.email;
        userExist.username = cud.username;
        userExist.password = cud.password;

        // pakai typeorm query
        return this.userRepository.save(userExist);

        // pakai querybuilder typeorm query
        // return this.userRepository
        //     .createQueryBuilder()
        //     .update(userExist)
        //     .where('id = :userId', { userid: userId })
        //     .getQuery();
    }

    find(username: string) {
        // return this.userRepository.findOne(id);
        return this.userRepository.findOne({
            where: {
                username: username
            }
        });
    }
    allUser() {
        // return this.userRepository.findOne(id);
        return this.userRepository.find();
    }
}