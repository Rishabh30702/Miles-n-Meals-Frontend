import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router'; // Import Router
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) {}

  // This function checks if the current URL starts with '/admin'
  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }
}