import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Document } from 'database';
import { Op } from 'sequelize';
import { slugify } from 'src/common/common.service';
import { ErrorMessage } from 'src/common/enum/error-messages.enum';

@Injectable()
export class DocService {
	constructor() { };

	async getAllDocs(userData: any, reqParams: any): Promise<any> {
		try {
			const { q = null, page = 1, pageSize = 8 } = reqParams;

			let whereCondition = {};
			if (q) {
				const searchIn = [];
				["title"].forEach((value) => {
					searchIn.push({
						[value]: { [Op.iLike]: `%${q}%` },
					});
				});
				whereCondition[Op.or] = searchIn;
			}

			const allDocs = await Document.findAndCountAll({
				offset: (page - 1) * pageSize,
				limit: pageSize,
				where: whereCondition,
				order: [['createdAt', 'DESC']],
			})

			const userList = allDocs?.rows?.map(user => {
				return {
					id: user.id,
					title: user.title,
					path: user.path ?? null,
					updatedAt: user.updatedAt,
					createdAt: user.createdAt,
				}
			})

			return {
				users: userList,
				params: { ...reqParams, page: Number(page), pageSize: Number(pageSize), totalPages: Math.round(Number(allDocs.count) / Number(pageSize)) || 1, },
				status: 'success'
			}
		} catch (error) {
			throw new HttpException(error.message ?? ErrorMessage.SOMETHING_WENT_WRONG, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);;
		}
	}
	async deleteDocById(userData: any, id: number): Promise<any> {
		if (!id || isNaN(id)) {
			throw new HttpException('Please provide valid ID.', HttpStatus.NOT_FOUND);
		}
		try {
			const doc = await Document.findOne({ where: { id }, attributes: ['id', 'title'] });

			if (!doc?.id) {
				throw new HttpException('No doc found with this doc id.', HttpStatus.NOT_FOUND);
			}

			// /** Hard Delete */
			await Document.destroy({
				where: { id: doc?.id },
			});

			return { status: 'success', message: `${doc?.title ?? ''} doc deleted successfully` };
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	async createNewDoc(userData: any, reqBody: any) {
		try {
			if (!reqBody.title) {
				throw new HttpException('Please provide title', HttpStatus.PARTIAL_CONTENT);
			}

			const docSlug = slugify(reqBody.title);
			// check the use exist or not
			const user = await Document.findOne({
				where: { path: docSlug },
				attributes: ['id', 'path', 'title']
			});
			if (user?.id) {
				throw new HttpException('Doc already exist with this title.', HttpStatus.NOT_ACCEPTABLE);
			}

			const userCreated = await Document.create({
				title: reqBody.title ?? null,
				path: docSlug ?? null,
			});

			return userCreated;
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
	async updateDocById(userData: any, id: number, reqBody: any) {
		if (!id || isNaN(id)) {
			throw new HttpException('Please provide valid user id.', HttpStatus.NOT_FOUND);
		}
		try {
			// check the use exist or not
			const user = await Document.findOne({
				where: { id },
				attributes: ['id', 'path', 'title']
			});
			if (!user?.id) {
				throw new HttpException('No user found with this user id.', HttpStatus.NOT_FOUND);
			}
			let updateBody = {};

			if (reqBody.title) {
				updateBody['title'] = reqBody.title;
				updateBody['path'] = slugify(reqBody.title);
			}
			const userUpdated = await Document.update(updateBody, { where: { id } });


			const userUpdatedDetails = await Document.findOne({
				where: { id },
				attributes: ['id', 'path', 'title']
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
