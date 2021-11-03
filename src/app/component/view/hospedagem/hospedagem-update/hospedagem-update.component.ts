import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospedagem } from 'src/app/model/hospedagem.model';
import { HospedagemService } from 'src/app/service/hospedagem.service';

@Component({
  selector: 'app-hospedagem-update',
  templateUrl: '../hospedagem-form/hospedagem-form.component.html',
  styleUrls: ['./../hospedagem-form/hospedagem-form.component.scss'],
})
export class HospedagemUpdateComponent implements OnInit {
  public title: string = 'Alterar dados da hospedagem';

  public hospedagem: Hospedagem = {
    dtCheckin: '',
    dtCheckout: '',
    idHospede: 0,
    idQuarto: 0,
    idHospedagem: 0,
  };

  public formulario: FormGroup;

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

    this.formulario = new FormGroup({
      dtCheckin: new FormControl(null, Validators.required),
      dtCheckout: new FormControl(null, Validators.required),
      idQuarto: new FormControl(null, Validators.required),
      idHospede: new FormControl(null, Validators.required),
    });
  }

  salvar() {
    if (this.formulario.valid) {
      this.service.update(this.formulario.value).subscribe(() => {
        this.service.showMessage('Hospedagem atualizada com sucesso!');
        this.router.navigate(['/hospedagens']);
      });
    } else {
      this.service.showMessage('Preencha corretamente os campos', true);
    }
  }
}
