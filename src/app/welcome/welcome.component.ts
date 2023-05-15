import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  @ViewChild('name') nameKey!: ElementRef;
  storeUser() {
    localStorage.setItem('name', this.nameKey.nativeElement.value);
  }
}
