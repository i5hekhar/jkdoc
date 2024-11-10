import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'database';
import { JwtService } from '@nestjs/jwt';
import { Op } from 'sequelize';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RegisterRes, VerifyResponse } from './interfaces/verify-password.interface';
import { RegisterDto } from './dto/login.dto';
import { CryptoService } from 'src/common/crypto.service';

@Injectable()
export class LoginService {
	constructor(private jwtService: JwtService, private cryptoService: CryptoService) { }
	async verify(username: string, password: string): Promise<VerifyResponse> {

		let whereCondition = {
			[Op.or]: [{ phone: username }, { email: username }, { username }],
		}
		try {
			const user = await User.findOne({
				attributes: ['id', 'name', 'email', 'roleId', 'password'],
				where: whereCondition,
			});
			if (!user?.id) {
				throw new HttpException('User not registered!', HttpStatus.UNAUTHORIZED);
			}

			// verify password
			const isMatch = this.cryptoService.decrypt(user.password) === password;
			if (!isMatch) {
				throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
			}

			const jwtPayload: JwtPayload = {
				id: user?.id ?? undefined,
				name: user?.name ?? undefined,
				username: user?.email ?? undefined,
				email: user?.email ?? undefined,
				roleId: user?.roleId ?? undefined,
			}
			return {
				token: await this.generateAccessToken(jwtPayload),
				refreshToken: await this.generateRefreshToken(jwtPayload),
			};
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}
	async register(body: RegisterDto): Promise<RegisterRes> {

		let whereCondition = {
			[Op.or]: [{ phone: body.phone }, { email: body.email }, { username: body.username }],
		}
		try {
			const user = await User.findOne({
				attributes: ['id', 'name', 'email', 'roleId'],
				where: whereCondition,
			});
			if (user?.id) {
				throw new HttpException('User already registered.', HttpStatus.NOT_ACCEPTABLE);
			}

			const encryptedPassword = this.cryptoService.encrypt(body.password);
			const userCreated = await User.create({
				name: body.name,
				email: body.email,
				username: body.username ?? body.email.split('@')[0],
				phone: body.phone,
				password: encryptedPassword,
				status: 'active',
				roleId: 1, // default role is user 
			});
			return {
				id: userCreated?.id,
				name: userCreated?.name,
				username: userCreated?.username,
				email: userCreated?.email,
				phone: userCreated?.phone,
				message: 'User registered successfully.',
			};
		} catch (error) {
			console.error(error?.parent?.detail ?? error);
			throw new HttpException(error?.parent?.detail ?? error.message, error.status);
		}
	}

	async generateAccessToken(payload: JwtPayload): Promise<string> {
		return await this.jwtService.sign(payload, {
			secret: process.env.PUBLIC_JWT_SECRET,
			expiresIn: process.env.PUBLIC_JWT_EXPIRATION || '4h',
		});
	}
	async generateRefreshToken(payload: JwtPayload): Promise<string> {
		return await this.jwtService.sign(payload, {
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: '1d',
		});
	}

}
