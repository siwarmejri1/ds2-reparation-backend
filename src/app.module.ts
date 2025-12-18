import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DevicesModule } from './devices/devices.module';
import { PartsModule } from './parts/parts.module';
import { InterventionModule } from './interventions/interventions.module';

@Module({
  imports: [
    // Configuration mte3 les variables .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', 
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, 
        logging: true,
      }),
      inject: [ConfigService],
    }),
    
    // modules
    AuthModule,
    UserModule,
    DevicesModule,
    PartsModule,
    InterventionModule,
    
  ],
})
export class AppModule {}