import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hospede } from 'src/app/model/hospede.model';
import { HospedeService } from 'src/app/service/hospede.service';

@Component({
  selector: 'app-hospede-form',
  templateUrl: './hospede-form.component.html',
  styleUrls: ['./hospede-form.component.scss'],
})
export class HospedeFormComponent implements OnInit {
  public title: string = 'Cadastrar novo hospede';

  public hospede: Hospede = {
    cpf: 0,
    dtNascimento: '',
    nmHospede: '',
    idHospede: 0,
  };

  public formulario: FormGroup;

  constructor(private service: HospedeService, private router: Router) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nmHospede: new FormControl(null, Validators.required),
      dtNascimento: new FormControl(null, Validators.required),
      cpf: new FormControl(null, [Validators.required]),
    });
  }

  salvar() {
    if (this.formulario.valid) {
      this.service.create(this.formulario.value).subscribe(
        () => {
          this.service.showMessage('Hospede cadastrado com sucesso!');
          this.router.navigate(['/hospedes']);
        },
        (err) => {
          this.service.showMessage(
            'Não foi possível cadastrar o hóspede',
            true
          );
        }
      );
    } else {
      this.service.showMessage('Preencha corretamente os campos', true);
    }
  }
}
