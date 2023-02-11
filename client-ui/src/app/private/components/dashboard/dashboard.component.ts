import {Component, OnInit} from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  constructor(
    private readonly todoService: TodoService
  ) {
  }

  async ngOnInit() {
    this.todoService.sendMessage();
  }
}
