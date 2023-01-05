import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMeetingInput } from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Meeting } from './entities/meeting.entity';
import { RemoveMeetingInputDto } from './dto/remove-meeting-input.dto';

@Injectable()
export class MeetingService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createMeetingInput: CreateMeetingInput, userId: number) {
    try {
      const targetTodo = await this.prismaService.todo.findUnique({
        where: {
          id: createMeetingInput.todoId,
        },
      });
      if (targetTodo.userId !== userId) throw new UnauthorizedException();
      const newMeeting = await this.prismaService.meeting.create({
        data: {
          name: createMeetingInput.name,
          todoId: createMeetingInput.todoId,
        },
      });
      return newMeeting;
    } catch (error) {
      throw new BadRequestException(
        `Class: ${MeetingService.name}  Handler: ${this.create.name}`,
      );
    }
  }

  async findAll(): Promise<Meeting[]> {
    const meetings = await this.prismaService.meeting.findMany();
    if (!meetings) throw new BadRequestException();
    return meetings;
  }

  async findOne(id: number): Promise<Meeting> {
    const meeting = await this.prismaService.meeting.findUnique({
      where: {
        id: id,
      },
    });
    if (!meeting) throw new BadRequestException();
    return meeting;
  }

  async updateSingleMeeting(
    updateMeetingInput: UpdateMeetingInput,
    userId: number,
  ) {
    const currentMeeting = await this.prismaService.meeting.findUnique({
      where: {
        id: updateMeetingInput.id,
      },
      include: {
        Todo: true,
      },
    });
    const isBelongsUser = currentMeeting.Todo.userId === userId;
    if (!isBelongsUser) throw new UnauthorizedException();
    if (updateMeetingInput.name && !updateMeetingInput.todoId) {
      const updatedMeeting = await this.prismaService.meeting.update({
        where: {
          id: updateMeetingInput.id,
        },
        data: {
          name: updateMeetingInput.name,
        },
      });
      if (!updatedMeeting) throw new BadRequestException();
      return updatedMeeting;
    } else if (!updateMeetingInput.name && updateMeetingInput.todoId) {
      await this.updateTodoValidation(updateMeetingInput, userId);
      const updatedMeeting = await this.prismaService.meeting.update({
        where: {
          id: updateMeetingInput.id,
        },
        data: {
          todoId: updateMeetingInput.todoId,
        },
      });
      if (!updatedMeeting) throw new BadRequestException();
      return updatedMeeting;
    } else if (updateMeetingInput.name && updateMeetingInput.todoId) {
      await this.updateTodoValidation(updateMeetingInput, userId);
      const updatedMeeting = await this.prismaService.meeting.update({
        where: {
          id: updateMeetingInput.id,
        },
        data: {
          name: updateMeetingInput.name,
          todoId: updateMeetingInput.todoId,
        },
      });
      if (!updatedMeeting) throw new BadRequestException();
      return updatedMeeting;
    }
    throw new BadRequestException();
  }

  async updateTodoValidation(
    updateMeetingInput: UpdateMeetingInput,
    userId: number,
  ) {
    const targetTodo = await this.prismaService.todo.findUnique({
      where: {
        id: updateMeetingInput.todoId,
      },
    });
    if (!targetTodo) throw new BadRequestException();
    if (targetTodo.userId !== userId) {
      throw new UnauthorizedException();
    }
  }

  async removeSingleMeeting(
    removeMeetingInputDto: RemoveMeetingInputDto,
    userId: number,
  ) {
    const currentMeeting = await this.prismaService.meeting.findUnique({
      where: {
        id: removeMeetingInputDto.id,
      },
      include: {
        Todo: true,
      },
    });
    if (!currentMeeting) throw new BadRequestException();
    const isBelongsUser = currentMeeting.Todo.userId === userId;
    if (!isBelongsUser) throw new UnauthorizedException();
    const removedMeeting = await this.prismaService.meeting.delete({
      where: {
        id: removeMeetingInputDto.id,
      },
    });
    if (!removedMeeting) throw new BadRequestException();
    return removedMeeting;
  }
}
