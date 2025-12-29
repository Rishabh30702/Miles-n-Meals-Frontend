import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../services/theme.service'; // Verify this path matches your folder structure

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  // Inject service to allow the template to react to theme changes
  public themeService = inject(ThemeService);

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    console.log('User Feedback:', this.formData);
    alert('Thank you for reaching out! Your message has been sent.');
    // Reset form after submission
    this.formData = { name: '', email: '', subject: '', message: '' };
  }
}