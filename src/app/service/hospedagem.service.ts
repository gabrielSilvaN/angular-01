import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Hospedagem } from '../model/hospedagem.model';

@Injectable({
  providedIn: 'root',
})
export class HospedagemService {
  private baseUrl: string = 'http://localhost:8080/hospedagem';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  showMessage(message: string, isError: boolean = false): void {
    this.snackBar.open(message, 'Fechar', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 3000,
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  create(hospedagem: Hospedagem): Observable<Hospedagem> {
    return this.http.post<Hospedagem>(this.baseUrl, hospedagem);
  }

  findAll(): Observable<Hospedagem[]> {
    return this.http.get<Hospedagem[]>(`${this.baseUrl}`);
  }

  findById(id: string): Observable<Hospedagem> {
    let url = `${this.baseUrl}/${id}`;

    return this.http.get<Hospedagem>(url);
  }

  update(hospedagem: Hospedagem): Observable<Hospedagem> {
    return this.http.put<Hospedagem>(this.baseUrl, hospedagem);
  }

  delete(hospedagem: Hospedagem): Observable<Hospedagem> {
    let url = `${this.baseUrl}/${hospedagem.idHospedagem}`;

    return this.http.delete<Hospedagem>(url);
  }
}
