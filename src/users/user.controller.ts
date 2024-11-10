import { Controller, Get, UseGuards, HttpStatus, HttpException, Post, Patch, Delete, Query, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ErrorMessage } from 'src/common/enum/error-messages.enum';
import { AuthGuard } from '@nestjs/passport';
import { UserData } from 'src/login/interfaces/user.interface';
import { GetUser } from 'src/common/decorators/user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/utils/jwt/roles.guard';

enum EndPoint {
	V1_USER_ALL = 'user/all',
	V1_USER_CREATE = 'user/create',
	V1_USER_UPDATE = 'user/update/:id',
	V1_USER_DELETE = 'user/delete/:id',
}

@Controller('v1')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get(EndPoint.V1_USER_ALL)
	@Roles('admin')
	async getAllUsers(@GetUser() userData: UserData, @Query() queParams: any) {
		try {
			return await this.userService.getAllUsers(userData, queParams);
		} catch (error) {
			throw new HttpException(error.message ?? ErrorMessage.SOMETHING_WENT_WRONG, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Delete(EndPoint.V1_USER_DELETE)
	@Roles('admin')
	async deleteUserById(@GetUser() userData: UserData, @Param() params: any) {
		try {
			return await this.userService.deleteUserById(userData, params.id);
		} catch (error) {
			throw new HttpException(error.message ?? ErrorMessage.SOMETHING_WENT_WRONG, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Post(EndPoint.V1_USER_CREATE)
	@Roles('admin')
	async createAllUsers(@GetUser() userData: UserData, @Body() body: any) {
		try {
			return await this.userService.createNewUser(userData, body);
		} catch (error) {
			throw new HttpException(error.message ?? ErrorMessage.SOMETHING_WENT_WRONG, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Patch(EndPoint.V1_USER_UPDATE)
	@Roles('admin')
	async updateUserById(@GetUser() userData: UserData, @Param() queParams: any, @Body() body: any) {
		try {
			return await this.userService.updateUserById(userData, queParams?.id, body);
		} catch (error) {
			throw new HttpException(error.message ?? ErrorMessage.SOMETHING_WENT_WRONG, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
