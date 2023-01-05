import { FindAllTodosResponseDto } from './dto/find-all-todos-response.dto';
import { FindSingleTodoResponseDto } from './dto/find-single-todo-response.dto';
import { GetUserIdDecorator } from './decorators/get-user-id.decorator';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { UseGuards } from '@nestjs/common';
import { UpdateSingleTodoResponseDto } from './dto/update-single-todo-response.dto';
import { CustomAccessTokenGuard } from 'src/auth/guards/custom-access-token.guard';
import { GetRolesDecorator } from 'src/auth/decorators/get-roles.decorator';
import { CustomRolesGuard } from 'src/auth/guards/custom-roles.guard';

@UseGuards(CustomAccessTokenGuard)
@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => Todo)
  createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
    @GetUserIdDecorator() userId: number,
    @Context() context,
  ) {
    return this.todoService.create(createTodoInput, userId);
  }

  @Query(() => [FindAllTodosResponseDto], { name: 'todos' })
  @UseGuards(CustomRolesGuard)
  @GetRolesDecorator('Admin')
  async findAll() {
    return await this.todoService.findAll();
  }

  @Query(() => FindSingleTodoResponseDto, { name: 'todo' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.todoService.findOne(id);
  }

  @Mutation(() => UpdateSingleTodoResponseDto)
  updateTodo(
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
    @GetUserIdDecorator() userId: number,
  ) {
    return this.todoService.update(updateTodoInput, userId);
  }

  @Mutation(() => Todo)
  async removeTodo(
    @Args('id', { type: () => Int }) id: number,
    @GetUserIdDecorator() userId: number,
  ) {
    return await this.todoService.remove(id, userId);
  }
}
