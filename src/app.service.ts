import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<h1 style="width: 100%; text-align: center; top: 40%; position: absolute; font-size: 3rem;">JK Doc service</h1>`;
  }
  healthCheck(): string {
    return `I'm healthy`;
  }
}
