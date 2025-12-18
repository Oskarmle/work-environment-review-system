import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mail } from './entities/mail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mail])],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
