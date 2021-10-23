import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hospede } from 'src/app/model/hospede.model';
import { HospedeService } from 'src/app/service/hospede.service';

@Component({
  selector: 'app-hospede-form',
  templateUrl: './hospede-form.component.html',
  styleUrls: ['./hospede-form.component.scss'],
})
export class HospedeFormComponent implements OnInit {
  title: string = 'Cadastrar novo hospede';

  hospede: Hospede = {
    cpf: 0,
    dtNascimento: '',
    nmHospede: '',
    idHospede: 0,
  };

  constructor(private service: HospedeService, private router: Router) {}

  ngOnInit(): void {}

  salvar() {
    this.service.create(this.hospede).subscribe(() => {
      this.service.showMessage('Hospede cadastrado com sucesso!');
      this.router.navigate(['/hospedes']);
    });
  }
}
