import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Quarto } from '../model/quarto.model';

@Injectable({
  providedIn: 'root',
})
export class QuartoService {
  private baseUrl: string = 'http://localhost:8080/quarto';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  showMessage(message: string, isError: boolean = false): void {
    this.snackBar.open(message, 'Fechar', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 10000,
      panelClass: isError ? 'msg-error' : 'msg-success',
    });
  }

  create(quarto: Quarto): Observable<Quarto> {
    return this.http.post<Quarto>(this.baseUrl, quarto);
  }

  findAll(): Observable<Quarto[]> {
    return this.http.get<Quarto[]>(`${this.baseUrl}`);
  }

  findById(id: string): Observable<Quarto> {
    let url = `${this.baseUrl}/${id}`;

    return this.http.get<Quarto>(url);
  }

  update(quarto: Quarto): Observable<Quarto> {
    return this.http.put<Quarto>(this.baseUrl, quarto);
  }

  delete(quarto: Quarto): Observable<Quarto> {
    let url = `${this.baseUrl}/${quarto.idQuarto}`;

    return this.http.delete<Quarto>(url);
  }
}
