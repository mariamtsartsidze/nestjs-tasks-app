import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { get } from 'http';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/vreate-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    console.log(filterDto);
    if (Object.keys(filterDto).length) {
      console.log('yes');
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      console.log('no');
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  // @Post()
  // createTask(@Body() body) {
  //   console.log("body: ", body);
  // }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
