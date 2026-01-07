import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
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

  // Returns true if we are on the Admin OR Client pages
  isDashboardRoute(): boolean {
    const url = this.router.url;
    return url.startsWith('/admin') || url.startsWith('/client');
  }
}