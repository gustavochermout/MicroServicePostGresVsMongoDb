import { Get, Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Result } from 'range-parser';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Post('/go')
  go(@Body() body): string{
    return 'Post/go! =)';  
  }
}
