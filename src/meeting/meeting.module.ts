import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingResolver } from './meeting.resolver';

@Module({
  providers: [MeetingResolver, MeetingService]
})
export class MeetingModule {}
