import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'database';
import { Op } from 'sequelize';
import { ErrorMessage } from 'src/common/enum/error-messages.enum';

@Injectable()
export class UserService {
	constructor() { };
	async getAllUsers(userData: any, reqParams: any): Promise<any> {
		try {
			const { q = null, page = 1, pageSize = 8 } = reqParams;

			let whereCondition = {};
			if (q) {
				const searchIn = [];
				["name", 'email'].forEach((value) => {
					searchIn.push({
						[value]: { [Op.iLike]: `%${q}%` },
					});
				});
				whereCondition[Op.or] = searchIn;
			}

			const allUsers = await User.findAndCountAll({
				offset: (page - 1) * pageSize,
				limit: pageSize,
				where: whereCondition,
				order: [['createdAt', 'DESC']],
			})

			const userList = allUsers?.rows?.map(user => {
				return {
					id: user.id,
					name: user.name,
					email: user.email ?? null,
					updatedAt: user.updatedAt,
					createdAt: user.createdAt,
				}
			})

			return {
				users: userList,
				params: { ...reqParams, page: Number(page), pageSize: Number(pageSize), totalPages: Math.round(Number(allUsers.count) / Number(pageSize)) || 1, },
				status: 'success'
			}
		} catch (error) {
			throw new HttpException(error.message ?? ErrorMessage.SOMETHING_WENT_WRONG, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);;
		}
	}
	async deleteUserById(userData: any, id: number): Promise<any> {
		if (!id || isNaN(id)) {
			throw new HttpException('Please provide valid ID.', HttpStatus.NOT_FOUND);
		}
		try {
			const user = await User.findOne({ where: { id }, attributes: ['id', 'name'], });

			if (!user?.id) {
				throw new HttpException('No user found with this user id.', HttpStatus.NOT_FOUND);
			}

			// /** Hard Delete */
			await User.destroy({
				where: { id: user?.id },
			});

			return { status: 'success', message: `${user?.name ?? ''} Deleted successfully` };
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}

	}

	async createNewUser(userData: any, reqBody: any) {
		try {
			if (!reqBody.email) {
				throw new HttpException('Please provide email', HttpStatus.PARTIAL_CONTENT);
			}
			// check the use exist or not
			const user = await User.findOne({
				where: { email: reqBody.email },
				attributes: ['id', 'email', 'name']
			});
			if (user?.id) {
				throw new HttpException('User already exist with this email.', HttpStatus.NOT_ACCEPTABLE);
			}

			const userCreated = await User.create({
				name: reqBody.name ?? null,
				email: reqBody.email ?? null,
			});

			return userCreated;
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
	async updateUserById(userData: any, id: number, reqBody: any) {
		if (!id || isNaN(id)) {
			throw new HttpException('Please provide valid user id.', HttpStatus.NOT_FOUND);
		}
		try {
			// check the use exist or not
			const user = await User.findOne({
				where: { id },
				attributes: ['id', 'email', 'name']
			});
			if (!user?.id) {
				throw new HttpException('No user found with this user id.', HttpStatus.NOT_FOUND);
			}
			let updateBody = {};

			if (reqBody.name) updateBody['name'] = reqBody.name;
			if (reqBody.email) updateBody['email'] = reqBody.email;
			const userUpdated = await User.update(updateBody, { where: { id } });


			const userUpdatedDetails = await User.findOne({
				where: { id },
				attributes: ['id', 'email', 'name']
			});
			return {
				status: 'success',
				message: `(${userUpdated?.[0] ?? 0}) record updated successfully`,
				user: userUpdatedDetails
			};
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}
