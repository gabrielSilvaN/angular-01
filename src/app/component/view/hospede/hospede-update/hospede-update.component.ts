import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospede } from 'src/app/model/hospede.model';
import { HospedeService } from 'src/app/service/hospede.service';

@Component({
  selector: 'app-hotel-update',
  templateUrl: '../hospede-form/hospede-form.component.html',
  styleUrls: ['./../hospede-form/hospede-form.component.scss'],
})
export class HospedeUpdateComponent implements OnInit {
  public title: string = 'Alterar dados do hospede';

  public hospede: Hospede = {
    cpf: 0,
    dtNascimento: '',
    nmHospede: '',
    idHospede: 0,
  };

  public formulario: FormGroup;

  constructor(
    private service: HospedeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.service.findById(id).subscribe((hospede) => {
        this.hospede = hospede;
      });
    }

    this.formulario = new FormGroup({
      nmHospede: new FormControl(null, Validators.required),
      dtNascimento: new FormControl(null, Validators.required),
      cpf: new FormControl(null, [Validators.required]),
    });
  }

  salvar() {
    this.service.update(this.hospede).subscribe(
      () => {
        this.service.showMessage('Hospede atualizado com sucesso!');
        this.router.navigate(['/hospedes']);
      },
      (err) => {
        this.service.showMessage(
          'Não foi possível fazer o update do hospede',
          true
        );
      }
    );
  }
}
