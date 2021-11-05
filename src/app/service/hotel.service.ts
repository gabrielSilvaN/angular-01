import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
// import { HotelApi } from '../component/view/paginador/paginador.component';
import { Hotel } from '../model/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private baseUrl: string = 'http://localhost:8080/hotel';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  showMessage(message: string, isError: boolean = false): void {
    this.snackBar.open(message, 'Fechar', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 0,
      panelClass: isError ? 'msg-error' : 'msg-success',
    });
  }

  create(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.baseUrl, hotel);
  }

  // findPaginator(
  //   sort: string,
  //   order: SortDirection,
  //   page: number,
  //   size: number
  // ): Observable<HotelApi> {
  //   //?sort=${sort}&order=${order}&page=${page + 1}
  //   let requestUrl = `${this.baseUrl}/paginator/?page=${page}&size=${size}`;
  //   //&sort=${sort}&order=${order}

  //   requestUrl += order == 'desc' ? '&sort=' + sort : '&unsort=' + sort;
  //   return this.http.get<HotelApi>(requestUrl);
  // }

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
