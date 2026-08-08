import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Birthday } from './birthday/birthday'; // 1. Import Birthday

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Birthday], // 2. Add Birthday here
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'birthday-surprise';
}
