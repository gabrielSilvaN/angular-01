import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { HospedeApi } from '../component/view/paginador/paginador.component';
import { Hospede } from '../model/hospede.model';

@Injectable({
  providedIn: 'root',
})
export class HospedeService {
  private baseUrl: string = 'http://localhost:8080/hospede';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  showMessage(message: string, isError: boolean = false): void {
    this.snackBar.open(message, 'Fechar', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 3000,
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  findPaginator(
    sort: string,
    order: SortDirection,
    page: number,
    size: number
  ): Observable<HospedeApi> {
    //?sort=${sort}&order=${order}&page=${page + 1}
    let requestUrl = `${this.baseUrl}/paginator/?page=${page}&size=${size}`;
    //&sort=${sort}&order=${order}

    requestUrl += order == 'desc' ? '&sort=' + sort : '&unsort=' + sort;
    return this.http.get<HospedeApi>(requestUrl);
  }

  create(hospede: Hospede): Observable<Hospede> {
    return this.http.post<Hospede>(this.baseUrl, hospede);
  }

  findAll(): Observable<Hospede[]> {
    return this.http.get<Hospede[]>(`${this.baseUrl}`);
  }

  findById(id: string): Observable<Hospede> {
    let url = `${this.baseUrl}/${id}`;

    return this.http.get<Hospede>(url);
  }

  update(hospede: Hospede): Observable<Hospede> {
    return this.http.put<Hospede>(this.baseUrl, hospede);
  }

  delete(hospede: Hospede): Observable<Hospede> {
    let url = `${this.baseUrl}/${hospede.idHospede}`;

    return this.http.delete<Hospede>(url);
  }
}
