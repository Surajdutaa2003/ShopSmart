import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Address, User } from '../../models/auth.model';
import { OrderPlacedDetails } from '../../models/order.model';
import { environment } from '../../environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.authBaseUrl;

  private isLoggedIn = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem("user")!)?.isLoggedIn ?? false)
  isLoggedIn$ = this.isLoggedIn.asObservable()

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          this.http.patch(`${this.apiUrl}/${user.id}`, { isLoggedIn: true }).subscribe();
          const newUser = { ...user }
          delete newUser.password
          localStorage.setItem("user", JSON.stringify(newUser))
          this.toggleIsLoggedIn(true)
          return user;
        }
        throw new Error('Invalid email or password');
      }),
      catchError(error => throwError(() => new Error(error.message || 'Something went wrong')))
    );
  }

  signup(name: string, email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      switchMap(users => {
        if (users.find(u => u.email === email)) {
          return throwError(() => new Error('Email already exists'));
        }
        const newUser: User = { id: String(users.length + 1), name, email, password, address: [], orderPlaced: [] };
        return this.http.post(this.apiUrl, newUser);
      }),
      catchError(error => throwError(() => new Error(error.message || 'Something went wrong')))
    );
  }

  logout() {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        this.toggleIsLoggedIn(false);
        return;
      }
      const userId = JSON.parse(userStr).id;
      if (!userId) {
        this.toggleIsLoggedIn(false);
        return;
      }

      this.http.get<User>(`${this.apiUrl}/${userId}`).subscribe({
        next: user => {
          if (user && user.isLoggedIn) {
            this.http.patch(`${this.apiUrl}/${userId}`, { isLoggedIn: false }).subscribe({
              next: () => {
                localStorage.removeItem("user");
                this.toggleIsLoggedIn(false);
                this.router.navigate(['/home/product'])
              },
              error: err => {
                console.error("Failed to update isLoggedIn in backend:", err);
              }
            });
          } else {
            localStorage.removeItem("user");
            this.toggleIsLoggedIn(false);
          }
        },
        error: err => {
          localStorage.removeItem("user");
          this.toggleIsLoggedIn(false);
        }
      });
    } catch (err) {
      localStorage.removeItem("user");
      this.toggleIsLoggedIn(false);
    }
  }

  getCurrentUser(): Observable<User | null> {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      return throwError(() => new Error("No user found in localStorage."));
    }
    const userId = JSON.parse(userStr).id;
    if (!userId) {
      return throwError(() => new Error("User ID not present."));
    }

    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      map(user => {
        if (user && user.isLoggedIn) {
          return user;
        }
        return null;
      }),
      catchError(err => {
        return throwError(() => new Error("Failed to fetch user from backend."));
      })
    );
  }

  addNewAddress(payload: Address): Observable<User> {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      return throwError(() => new Error("No user found in localStorage."));
    }
    
    const userData = JSON.parse(userStr);
    const userId = userData.id;
    
    if (!userId) {
      return throwError(() => new Error("User ID not present."));
    }
    
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      switchMap(user => {
        if (!user.address) {
          user.address = [];
        }
        user.address.push(payload);
        return this.http.patch<User>(`${this.apiUrl}/${userId}`, { 
          address: user.address 
        }).pipe(
          map(() => {
            const updatedUser = { ...userData };
            updatedUser.address = user.address;
            localStorage.setItem("user", JSON.stringify(updatedUser));
            return user;
          })
        );
      }),
      catchError(err => {
        return throwError(() => new Error("Failed to add address. " + (err.message || '')));
      })
    );
  }

  addUserOrderPlaced(payload: OrderPlacedDetails): Observable<User> {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      return throwError(() => new Error("No user found in localStorage."));
    }
    
    const userData = JSON.parse(userStr);
    const userId = userData.id;
    
    if (!userId) {
      return throwError(() => new Error("User ID not present."));
    }
    
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      switchMap(user => {
        if (!user.orderPlaced) {
          user.orderPlaced = [];
        }
        
        user.orderPlaced.push(payload);
        
        return this.http.patch<User>(`${this.apiUrl}/${userId}`, { 
          orderPlaced: user.orderPlaced 
        }).pipe(
          map(() => {
            const updatedUser = { ...userData };
            updatedUser.orderPlaced = user.orderPlaced;
            localStorage.setItem("user", JSON.stringify(updatedUser));
            return user;
          })
        );
      }),
      catchError(err => {
        return throwError(() => new Error("Failed to add order. " + (err.message || '')));
      })
    );
  }

  getUserLatestOrder(): Observable<OrderPlacedDetails | null> {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      return throwError(() => new Error("No user found in localStorage."));
    }
    
    const userData = JSON.parse(userStr);
    const userId = userData.id;
    
    if (!userId) {
      return throwError(() => new Error("User ID not present."));
    }
    
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      map(user => {
        if (!user.orderPlaced || user.orderPlaced.length === 0) {
          return null;
        }
        
        const sortedOrders = [...user.orderPlaced].sort((a, b) => {
          return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
        });
        
        return sortedOrders[0];
      }),
      catchError(err => {
        console.error("Failed to fetch latest order:", err);
        return throwError(() => new Error("Failed to retrieve order history. " + (err.message || '')));
      })
    );
  }

  toggleIsLoggedIn(value: boolean): void {
    this.isLoggedIn.next(value)
  }
}