import { Injectable, NotFoundException ,ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entites/user.entity';
import * as bcrypt from 'bcrypt';
import { Roles } from '../common/enums/user-role.enum';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getProfile(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'username', 'role'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // Méthode bch nasn3ou admin bel les champs mte3ou verifie fl dto
 async createAdmin(registerDto: RegisterDto) {
    // nverifiw ken email mawjouda deja ou nn
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, this.SALT_ROUNDS);

    const admin = this.userRepository.create({
      email: registerDto.email,
      username: registerDto.username,
      password: hashedPassword,
      role: Roles.ROLE_ADMIN, //bch nasn3ou admin
    });

    await this.userRepository.save(admin);

    return { message: 'Admin created successfully' };
  }
}
