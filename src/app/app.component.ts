import {Component, EventEmitter, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Todo';
  tasks: Task[];
  categories: Category[];
  selectedCategory: Category;

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandlerService.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.dataHandlerService.searchTasks(
      this.selectedCategory,
      null,
      null,
      null
    ).subscribe((task: Task[]) => {
      this.tasks = task;
    });
  }

  onUpdateTask(task: Task): void {
    console.log(task);
  }
}
