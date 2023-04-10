import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import User from './user.entity';
import Address from './address.entity';
import { FilesModule } from 'src/files/files.module';
import { PrivateFilesModule } from './../private-file/privateFile.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address]),
    PrivateFilesModule,
    FilesModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
