import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from 'src/app/component/template/confirm-delete/confirm-delete.component';
import { Hotel } from 'src/app/model/hotel.model';
import { HotelService } from 'src/app/service/hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss'],
})
export class HotelListComponent implements OnInit {
  hoteis: Hotel[] = [];
  displayedColumns: Array<string> = [
    'idHotel',
    'nmHotel',
    'endereco',
    'qtdEstrelas',
    'acao',
  ];

  constructor(private service: HotelService, private dialog: MatDialog) {}

  atualizarDados() {
    this.service.findAll().subscribe((hoteis) => {
      this.hoteis = hoteis;
    });
  }

  ngOnInit(): void {
    this.atualizarDados();
  }

  excluir(hotel: Hotel) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        message: `Deseja realmente excluir o hotel Nº ${hotel.idHotel}`,
        buttonText: {
          ok: 'Excluir',
          cancel: 'Desistir',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.service.delete(hotel).subscribe(() => {
          this.service.showMessage('Hotel excluído com sucesso!');
          this.atualizarDados();
        });
      }
    });
  }
}
