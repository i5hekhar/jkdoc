import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Op } from 'sequelize';
import { User } from 'database';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: process.env.PUBLIC_JWT_SECRET,
			passReqToCallback: true,
		});
	}

	async validate(req, payload: any) {

		let existingUser: User;
		try {
			existingUser = await User.findOne({
				where: {
					[Op.or]: [{ phone: payload.userId }, { username: payload.userId }, { email: payload.userId }],
				},
				attributes: ['id', 'name', 'email', 'roleId'],
			});
		} catch (error) {
			throw new HttpException('Exception while connecting with the database.', HttpStatus.INTERNAL_SERVER_ERROR);
		}

		if (!existingUser) throw new HttpException('No User exists with userId : ' + payload.userId, HttpStatus.NOT_FOUND);
		return { userId: payload.userId, roleId: existingUser.roleId };
	}
}
