import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Hospede } from 'src/app/model/hospede.model';
import { HospedeService } from 'src/app/service/hospede.service';
import { ConfirmDeleteComponent } from '../../template/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.scss'],
})
export class PaginadorComponent implements AfterViewInit {
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  hospedes: Hospede[] = [];
  displayedColumns: string[] = [
    'id',
    'nmHospede',
    'dtNascimento',
    'cpf',
    'acao',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: HospedeService, private dialog: MatDialog) {}

  excluir(hospede: Hospede): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        message: `Deseja realmente excluir o hóspede ${hospede.idHospede}?`,
        buttonText: {
          ok: 'Excluir',
          cancel: 'Desistir',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.service.delete(hospede).subscribe(
          () => {
            this.service.showMessage('Hóspede excluído com sucesso!');
          },
          (err) => {
            this.service.showMessage(
              'Não foi possível excluir o Hóspede',
              true
            );
          }
        );
      } else {
        this.service.showMessage('Operação de exclusão de Hóspede cancelada!');
      }
    });
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.service
            .findPaginator(
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex,
              this.paginator.pageSize
            )
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          this.resultsLength = data.totalElements;
          return data.content;
        })
      )
      .subscribe((data) => (this.hospedes = data));
  }
}

export interface HospedeApi {
  content: Hospede[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
