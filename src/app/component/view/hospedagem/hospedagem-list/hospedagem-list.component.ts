import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from 'src/app/component/template/confirm-delete/confirm-delete.component';
import { Hospedagem } from 'src/app/model/hospedagem.model';
import { HospedagemService } from 'src/app/service/hospedagem.service';

@Component({
  selector: 'app-hospedagem-list',
  templateUrl: './hospedagem-list.component.html',
  styleUrls: ['./hospedagem-list.component.scss'],
})
export class HospedagemListComponent implements OnInit {
  hospedagens: Hospedagem[] = [];
  displayedColumns: Array<string> = [
    'idHospedagem',
    'idQuarto',
    'idHospede',
    'dtCheckin',
    'dtCheckout',
    'acao',
  ];

  constructor(private service: HospedagemService, private dialog: MatDialog) {}

  atualizarDados() {
    this.service.findAll().subscribe((hospedagens) => {
      this.hospedagens = hospedagens;
    });
  }

  ngOnInit(): void {
    this.atualizarDados();
  }

  excluir(hospedagem: Hospedagem) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        message: `Deseja realmente excluir a hospedagem Nº ${hospedagem.idHospedagem}`,
        buttonText: {
          ok: 'Excluir',
          cancel: 'Desistir',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.service.delete(hospedagem).subscribe(() => {
          this.service.showMessage('Hospedagem excluída com sucesso!');
          this.atualizarDados();
        });
      }
    });
  }
}
