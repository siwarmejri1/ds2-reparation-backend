import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entites/user.entity';
import { Roles } from '../common/enums/user-role.enum';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  // nombre de tours elii yet3mal fel hash mte3 mdp
  private readonly SALT_ROUNDS = 10;

  constructor(
    // injection mte3 user repository w jwt service
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

// signup

  // create user jdid yekhou les données mel dto w yraj3elna jwt token
  async signUp(registerDto: RegisterDto): Promise<{ access_token: string }> {
    //nevrifiw ken email mawjouda deja ou nn
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    // hashage mte3 password
    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      this.SALT_ROUNDS,
    );

    //sna3na l user jdid
    const newUser = this.userRepository.create({
      email: registerDto.email,
      username: registerDto.username,
      password: hashedPassword,
      role: Roles.ROLE_USER,
    });

    try {
      //sauvegardina l user jdid fel bd
      const savedUser = await this.userRepository.save(newUser);

      //contenu mte3 l token

      const payload = {
        sub: savedUser.id,
        email: savedUser.email,
        role: savedUser.role,
      };
      //generiw l token
      const accessToken = this.jwtService.sign(payload);

      return {
        access_token: accessToken,
      };
    } catch (error) {
      throw new ConflictException('Could not create user');
    }
  }
//login

  // connectiw m user jdid yekhou les données connexion mel dto w yraj3elna jwt token
  async signIn(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    // recherche l user fel bd b email w njibou m3ah password
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    // compariw l password  m3a li fel bd
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }
}
