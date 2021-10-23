import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospedagem } from 'src/app/model/hospedagem.model';
import { HospedagemService } from 'src/app/service/hospedagem.service';
import { HotelService } from 'src/app/service/hotel.service';

@Component({
  selector: 'app-hospedagem-update',
  templateUrl: '../hospedagem-form/hospedagem-form.component.html',
  styleUrls: ['./../hospedagem-form/hospedagem-form.component.scss'],
})
export class HospedagemUpdateComponent implements OnInit {
  title: string = 'Alterar dados da hospedagem';

  hospedagem: Hospedagem = {
    dtCheckin: '',
    dtCheckout: '',
    idHospede: 0,
    idQuarto: 0,
    idHospedagem: 0,
  };

  constructor(
    private service: HospedagemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.service.findById(id).subscribe((hospedagem) => {
        this.hospedagem = hospedagem;
      });
    }
  }

  salvar() {
    this.service.update(this.hospedagem).subscribe(() => {
      this.service.showMessage('Hospedagem atualizada com sucesso!');
      this.router.navigate(['/hospedagens']);
    });
  }
}
