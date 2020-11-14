import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  public dataSource: MatTableDataSource<Task>;
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  tasks: Task[];

  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandlerService.taskSubject.subscribe(tasks => this.tasks = tasks);
    // обязательно нужно создать для таблицы, в него присваивается любой источник
    this.dataSource = new MatTableDataSource();
    this.refreshTable();
  }

  toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
  }

  private getPriorityColor(task: Task): string {
    if (task.priority && task.priority.color) {
      return task.priority.color;
    }
    return '#fff';
  }

  refreshTable(): void {
    this.dataSource.data = this.tasks; // обновить источник данных
  }
}
