import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TodoModel} from "../../models/todo.model";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() item: TodoModel | undefined;
}
