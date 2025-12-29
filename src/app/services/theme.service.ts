import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Using a Signal for modern, reactive performance
  private isDark = signal<boolean>(false);

  constructor() {
    this.loadTheme();
  }

  toggleTheme() {
    this.isDark.set(!this.isDark());
    this.applyTheme();
  }

  private applyTheme() {
    const theme = this.isDark() ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-preference', theme);
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem('theme-preference');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    this.isDark.set(savedTheme === 'dark' || (!savedTheme && prefersDark));
    this.applyTheme();
  }

  get darkMode() {
    return this.isDark;
  }
}