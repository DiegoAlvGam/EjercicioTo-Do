import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;

constructor(private http: HttpClient) { }

login(username: string, password: string): Observable<boolean> {
  return this.http.get<any>('./bd.json').pipe(
    map(data => {
      const usuario = data.usuarios.find((u: any) => u.username === username && u.password === password);
      return usuario ? true : false;
    })
  );
}
logout(): void {
  this.isAuthenticated = false;
}

isLoggedIn(): boolean {
  return this.isAuthenticated;
}

}
