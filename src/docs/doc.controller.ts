import { Controller, Get, HttpStatus, HttpException, Post, Patch, Delete, Body, Query, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/utils/jwt/roles.guard';
import { DocService } from './doc.service';
import { ErrorMessage } from 'src/common/enum/error-messages.enum';
import { GetUser } from 'src/common/decorators/user.decorator';
import { UserData } from 'src/login/interfaces/user.interface';

enum EndPoint {
	V1_DOC_ALL = 'doc/all',
	V1_DOC_CREATE = 'doc/create',
	V1_DOC_UPDATE = 'doc/update/:id',
	V1_DOC_DELETE = 'doc/delete/:id',
}

@Controller('v1')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DocController {
	constructor(private readonly docService: DocService) { }

	@Get(EndPoint.V1_DOC_ALL)
	async getAllDocs(@GetUser() userData: UserData, @Query() queParams: any) {
		try {
			return await this.docService.getAllDocs(userData, queParams);
		} catch (error) {
			throw new HttpException(error.message ?? ErrorMessage.SOMETHING_WENT_WRONG, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Delete(EndPoint.V1_DOC_DELETE)
	async deleteDocById(@GetUser() userData: UserData, @Param() params: any) {
		try {
			return await this.docService.deleteDocById(userData, params.id);
		} catch (error) {
			throw new HttpException(error.message ?? ErrorMessage.SOMETHING_WENT_WRONG, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Post(EndPoint.V1_DOC_CREATE)
	async createAllDocs(@GetUser() userData: UserData, @Body() body: any) {
		try {
			return await this.docService.createNewDoc(userData, body);
		} catch (error) {
			throw new HttpException(error.message ?? ErrorMessage.SOMETHING_WENT_WRONG, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Patch(EndPoint.V1_DOC_UPDATE)
	async updateDocById(@GetUser() userData: UserData, @Param() queParams: any, @Body() body: any) {
		try {
			return await this.docService.updateDocById(userData, queParams?.id, body);
		} catch (error) {
			throw new HttpException(error.message ?? ErrorMessage.SOMETHING_WENT_WRONG, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
