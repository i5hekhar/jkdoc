import { Body, Controller, Get, Post, HttpException, HttpStatus } from '@nestjs/common';
import { RegisterDto, VerifyDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { ErrorMessage } from 'src/common/enum/error-messages.enum';

enum EndPoint {
	VERIFY = 'login/verify',
	REGISTER = 'login/register',
}

@Controller('v1')
export class LoginController {
	constructor(private readonly loginService: LoginService) { }

	@Post(EndPoint.VERIFY)
	async verify(@Body() body: VerifyDto) {
		if (!body.username || !body?.password) {
			throw new HttpException('Please provide credentials', HttpStatus.UNAUTHORIZED);
		}
		try {
			return await this.loginService.verify(body.username, body.password);
		} catch (error) {
			throw new HttpException(error.message ?? ErrorMessage.SOMETHING_WENT_WRONG, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	@Post(EndPoint.REGISTER)
	async register(@Body() body: RegisterDto) {
		try {
			return await this.loginService.register(body);
		} catch (error) {
			throw new HttpException(error.message ?? ErrorMessage.SOMETHING_WENT_WRONG, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}
