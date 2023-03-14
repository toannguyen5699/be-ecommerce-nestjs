import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import User from './user.entity';
import Address from './address.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
