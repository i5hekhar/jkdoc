import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// User
import { UserService } from './users/user.service';
import { UserController } from './users/user.controller';

// Doc
import { DocController } from './docs/doc.controller';
import { DocService } from './docs/doc.service';
import { Database } from 'database';

// Login
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { PassportModule } from '@nestjs/passport';

// JWT token
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/jwt/jwt.strategy';
import { CryptoService } from './common/crypto.service';



@Module({
  imports: [
    Database(),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.PUBLIC_JWT_SECRET || '4h',
    }),
  ],
  controllers: [AppController, UserController, DocController, LoginController],
  providers: [AppService, UserService, DocService, LoginService, JwtStrategy, CryptoService],
  exports: [JwtStrategy, PassportModule],
})
export class AppModule { }
