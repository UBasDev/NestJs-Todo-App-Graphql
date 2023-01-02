import { FindAllTodosResponseDto } from './dto/find-all-todos-response.dto';
import { FindSingleTodoResponseDto } from './dto/find-single-todo-response.dto';
import { GetUserIdDecorator } from './decorators/get-user-id.decorator';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { UseGuards } from '@nestjs/common';
import { UpdateSingleTodoResponseDto } from './dto/update-single-todo-response.dto';
import { CustomAccessTokenGuard } from 'src/auth/guards/custom-access-token.guard';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => Todo)
  @UseGuards(CustomAccessTokenGuard)
  createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
    @GetUserIdDecorator() userId: number,
  ) {
    return this.todoService.create(createTodoInput, userId);
  }

  @Query(() => [FindAllTodosResponseDto], { name: 'todos' })
  @UseGuards(CustomAccessTokenGuard)
  async findAll() {
    return await this.todoService.findAll();
  }

  @Query(() => FindSingleTodoResponseDto, { name: 'todo' })
  @UseGuards(CustomAccessTokenGuard)
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.todoService.findOne(id);
  }

  @Mutation(() => UpdateSingleTodoResponseDto)
  @UseGuards(CustomAccessTokenGuard)
  updateTodo(
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
    @GetUserIdDecorator() userId: number,
  ) {
    return this.todoService.update(updateTodoInput, userId);
  }

  @Mutation(() => Todo)
  @UseGuards(CustomAccessTokenGuard)
  async removeTodo(
    @Args('id', { type: () => Int }) id: number,
    @GetUserIdDecorator() userId: number,
  ) {
    return await this.todoService.remove(id, userId);
  }
}
