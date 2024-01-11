import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  buttonClassToOpen = 'buttonToOpenForm';
  buttonClassToClose = 'buttonToCloseForm';

  showAddBookForm!: boolean; //true or false
  subscruption!: Subscription;

  constructor(private uiService: UiService) {
    this.subscruption = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddBookForm = value)); // sets the new value
  }

  openForm() {
    this.uiService.toggleAddBookForm();
  }
}
