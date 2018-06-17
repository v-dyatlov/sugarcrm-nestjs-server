import {Get, Controller} from '@nestjs/common';
import {ApiService} from './api.service';

@Controller()
export class ApiController {
    constructor(private readonly apiService: ApiService) {}

    @Get('/accounts')
    getAccounts() {
        // return this.apiService.getAccounts();
    }
}