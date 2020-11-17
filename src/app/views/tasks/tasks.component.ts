import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  public dataSource: MatTableDataSource<Task>;
  // поля для таблицы, должны совпадать с названиями переменных класса
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];

  // ссылки на компоненты таблицы
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Текущие задачи для отображения на странице
  tasks: Task[];

  @Input('tasks') // напрямую не присваиваем значения в переменную, только через @Input
  private set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Output()
  updateTask = new EventEmitter<Task>();

  constructor(private dataHandlerService: DataHandlerService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    // обязательно нужно создать для таблицы, в него присваивается любой источник
    this.dataSource = new MatTableDataSource();
    this.fillTable(); // заполняем таблицу всеми данными
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

  fillTable(): void {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.data = this.tasks; // обновить источник данных
    this.addTableObjects();

    // когда получаем новые данные..
    // чтобы можно было сортировать по столбцам "категория" и "приоритет", т.к. там не примитивные типы, а объекты
    // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
    this.dataSource.sortingDataAccessor = (task, colName) => {

      // по каким полям выполнять сортировку для каждого столбца
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }

        case 'title': {
          return task.title;
        }
      }
    };
  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
    this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
  }

  openEditTaskDialog(task: Task): void {
    // открытие диалогого окна
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Редактирование задачи'],
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result as Task) {
        this.updateTask.emit(task);
        return;
      }
    });
  }
}
