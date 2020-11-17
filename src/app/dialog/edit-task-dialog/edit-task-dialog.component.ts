import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Task} from 'src/app/model/Task';
import {DataHandlerService} from '../../service/data-handler.service';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {
  private dialogTitle: string; // заголовок окна
  private task: Task; // задача для редактирования/создания
  private tmpTitle: string; // сохраняем в отдельную переменную, чтобы изминения не сказывалдись на скамлй задаче

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // для возможности работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [Task, string], // данные, которые передали в диалоговое окно
    private dataHandler: DataHandlerService, // ссылка на сервис для работы с данными
    private dialog: MatDialog, // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
  ) {
  }

  ngOnInit(): void {
    this.task = this.data[0]; // задача для редактирования/создания
    this.dialogTitle = this.data[1]; // текст для диалогового окна
    this.tmpTitle = this.task.title; // инициализация нач значений
  }

  // нажали ОК
  private onConfirm(): void {
    // считываем все значения для сохранения в поля задачи
    this.task.title = this.tmpTitle;

    // передаем добавленную/измененную задачу в обработчик
    // что с ним будут делать - уже на задача этого компонента
    this.dialogRef.close(this.task);
  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  private onCancel(): void {
    this.dialogRef.close(null);
  }
}
