import {Component, OnInit} from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {TodoModel} from "../../models/todo.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  backlogItems: TodoModel[] = [];
  todoItems: TodoModel[] = [];
  doneItems: TodoModel[] = [];

  items: TodoModel[] = [
    {
      title: 'Hard Item',
      subTitle: 'Hard Item Sub Title',
      complexity: 'HARD',
      text: 'Hard Item Text',
      status: 'BACKLOG'
    },
    {
      title: 'Medim Item',
      subTitle: 'Medimum Item Sub Title',
      complexity: 'MEDIUM',
      text: 'Medium Item Text',
      status: 'BACKLOG'
    },
    {
      title: 'Easy Item',
      subTitle: 'Easy Item Sub Title',
      complexity: 'EASY',
      text: 'Easy Item Text',
      status: 'DONE'
    },
    {
      title: 'Example Item',
      subTitle: 'Example Item Sub Title',
      complexity: 'HARD',
      text: 'Example Item Text',
      status: 'DONE'
    }
  ];

  constructor(
    private readonly todoService: TodoService
  ) {
  }

  async ngOnInit() {
    this.todoService.sendMessage();
    this.backlogItems = this.items.filter(x => x.status === 'BACKLOG');
    this.todoItems = this.items.filter(x => x.status === 'TODO');
    this.doneItems = this.items.filter(x => x.status === 'DONE');
  }

  drop(event: CdkDragDrop<TodoModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
