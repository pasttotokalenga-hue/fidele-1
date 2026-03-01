import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = '/api/login';

  currentUser = signal<any>(null);

  constructor() {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        this.currentUser.set(JSON.parse(savedUser));
      }
    }

    effect(() => {
      if (typeof window !== 'undefined') {
        const user = this.currentUser();
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.removeItem('user');
        }
      }
    });
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(user => this.currentUser.set(user))
    );
  }

  signup(userData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>('/api/signup', userData);
  }

  logout() {
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }
}
