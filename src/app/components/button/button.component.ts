import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  // receives data from other components
  @Input() text!: string;
  @Input() color!: string;
  @Input() class!: string;

  // sends data, events
  // notify you of any action or change of status.
  @Output() btnClick = new EventEmitter();

  onClick() {
    this.btnClick.emit();
  }
}
