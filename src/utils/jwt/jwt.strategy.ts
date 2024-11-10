import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Op } from 'sequelize';
import { JwtPayload } from '../../login/interfaces/jwt-payload.interface';
import { UserData, UserRole } from 'src/login/interfaces/user.interface';
import { Role, User } from 'database';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.PUBLIC_JWT_SECRET,
			ignoreExpiration: true,
		});
	}
	async validate(payload: JwtPayload): Promise<UserData> {
		try {
			const { username } = payload;
			if (!username) {
				throw new HttpException('Invalid username', HttpStatus.BAD_REQUEST);
			}
			const user: User = await User.findOne({
				where: {
					['email']: username,
				},
				attributes: ['id', 'name', 'email', 'roleId']
			});

			const userData: UserData = {
				id: user?.id,
				name: user?.name,
				username: user?.email,
				email: user?.email,
				roleId: user?.roleId,
				role: await this.getRoleDetails(user?.roleId),
			}

			if (!userData) {
				throw new HttpException('No User exists with userId : ' + username, HttpStatus.NOT_FOUND);
			}
			return userData;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}
	async getRoleDetails(roleId: number): Promise<UserRole> {
		try {
			if (roleId) {
				const role = await Role.findOne({
					where: { id: roleId },
					raw: true
				});
				return {
					id: role?.id,
					name: role?.name,
					code: role?.code,
					access: [], // TODO: need to build ACL
					isAllow: false,
				}
			}

			return {
				id: 0,
				name: 'Guest',
				code: 'GUEST',
				access: [],
				isAllow: false,
			}

		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}
}
