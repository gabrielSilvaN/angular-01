import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hospedagem } from 'src/app/model/hospedagem.model';
import { HospedagemService } from 'src/app/service/hospedagem.service';

@Component({
  selector: 'app-hospedagem-form',
  templateUrl: './hospedagem-form.component.html',
  styleUrls: ['./hospedagem-form.component.scss'],
})
export class HospedagemFormComponent implements OnInit {
  public title: string = 'Cadastrar nova hospedagem';

  public hospedagem: Hospedagem = {
    dtCheckin: '',
    dtCheckout: '',
    idHospede: 0,
    idQuarto: 0,
    idHospedagem: 0,
  };

  public formulario: FormGroup;

  constructor(private service: HospedagemService, private router: Router) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      dtCheckin: new FormControl(null, Validators.required),
      dtCheckout: new FormControl(null, Validators.required),
      idQuarto: new FormControl(null, Validators.required),
      idHospede: new FormControl(null, Validators.required),
    });
  }

  salvar() {
    if (this.formulario.valid) {
      this.service.create(this.formulario.value).subscribe(() => {
        this.service.showMessage('Hospedagem cadastrada com sucesso!');
        this.router.navigate(['/hospedagens']);
      });
    } else {
      this.service.showMessage('Preencha corretamente os campos', true);
    }
  }
}
