import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hospedagem } from 'src/app/model/hospedagem.model';
import { HospedagemService } from 'src/app/service/hospedagem.service';

@Component({
  selector: 'app-hospedagem-form',
  templateUrl: './hospedagem-form.component.html',
  styleUrls: ['./hospedagem-form.component.scss'],
})
export class HospedagemFormComponent implements OnInit {
  title: string = 'Cadastrar nova hospedagem';

  hospedagem: Hospedagem = {
    dtCheckin: '',
    dtCheckout: '',
    idHospede: 0,
    idQuarto: 0,
    idHospedagem: 0,
  };

  constructor(private service: HospedagemService, private router: Router) {}

  ngOnInit(): void {}

  salvar() {
    this.service.create(this.hospedagem).subscribe(() => {
      this.service.showMessage('Hospedagem cadastrada com sucesso!');
      this.router.navigate(['/hospedagens']);
    });
  }
}
