import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  @ViewChild('name') nameKey!: ElementRef; // Accessing the 'name' input field using ViewChild

  // Method to store the user's name in the local storage
  storeUser() {
    localStorage.setItem('name', this.nameKey.nativeElement.value);
  }
}
