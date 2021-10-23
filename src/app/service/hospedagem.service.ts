import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Hotel } from '../model/hotel.model';

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

  create(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.baseUrl, hotel);
  }

  findAll(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.baseUrl}`);
  }

  findById(id: string): Observable<Hotel> {
    let url = `${this.baseUrl}/${id}`;

    return this.http.get<Hotel>(url);
  }

  update(hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(this.baseUrl, hotel);
  }

  delete(hotel: Hotel): Observable<Hotel> {
    let url = `${this.baseUrl}/${hotel.idHotel}`;

    return this.http.delete<Hotel>(url);
  }
}
