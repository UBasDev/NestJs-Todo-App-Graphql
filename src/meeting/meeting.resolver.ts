import { FindSingleMeetingInputDto } from './dto/find-single-meeting-input.dto';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { MeetingService } from './meeting.service';
import { Meeting } from './entities/meeting.entity';
import { CreateMeetingInput } from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';
import { CustomAccessTokenGuard } from 'src/auth/guards/custom-access-token.guard';
import { UseGuards } from '@nestjs/common';
import { GetUserIdDecorator } from 'src/todo/decorators/get-user-id.decorator';
import { RemoveMeetingInputDto } from './dto/remove-meeting-input.dto';
import { CustomRolesGuard } from 'src/auth/guards/custom-roles.guard';
import { GetRolesDecorator } from 'src/auth/decorators/get-roles.decorator';

@UseGuards(CustomAccessTokenGuard)
@Resolver(() => Meeting)
export class MeetingResolver {
  constructor(private readonly meetingService: MeetingService) {}

  @Mutation(() => Meeting)
  async createMeeting(
    @Args('createMeetingInput') createMeetingInput: CreateMeetingInput,
    @Context() context,
    @GetUserIdDecorator() userId: number,
  ) {
    //console.log(context.req.user);
    return await this.meetingService.create(createMeetingInput, userId);
  }

  @Query(() => [Meeting], { name: 'meetings' })
  @UseGuards(CustomRolesGuard)
  @GetRolesDecorator('Admin')
  async findAllMeetings(): Promise<Meeting[]> {
    return await this.meetingService.findAll();
  }

  @Query(() => Meeting, { name: 'findSingleMeeting' })
  async findOne(
    @Args('findSingleMeetingInputDto')
    findSingleMeetingInputDto: FindSingleMeetingInputDto,
  ): Promise<Meeting> {
    return await this.meetingService.findOne(findSingleMeetingInputDto.id);
  }

  @Mutation(() => Meeting)
  async updateSingleMeeting(
    @Args('updateMeetingInput') updateMeetingInput: UpdateMeetingInput,
    @GetUserIdDecorator() userId: number,
  ) {
    return await this.meetingService.updateSingleMeeting(
      updateMeetingInput,
      userId,
    );
  }

  @Mutation(() => Meeting)
  async removeSingleMeeting(
    @Args('removeMeetingInputDto') removeMeetingInputDto: RemoveMeetingInputDto,
    @GetUserIdDecorator() userId: number,
  ) {
    return await this.meetingService.removeSingleMeeting(
      removeMeetingInputDto,
      userId,
    );
  }
}
