import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/model/hotel.model';
import { HotelService } from 'src/app/service/hotel.service';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.scss'],
})
export class HotelFormComponent implements OnInit {
  public title: string = 'Cadastrar novo hotel';

  public hotel: Hotel = {
    endereco: '',
    nmHotel: '',
    qtdEstrelas: 0,
  };

  public formulario: FormGroup;

  constructor(private service: HotelService, private router: Router) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nmHotel: new FormControl(null, Validators.required),
      endereco: new FormControl(null, Validators.required),
      qtdEstrelas: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]),
    });
  }

  salvar() {
    if (this.formulario.valid) {
      this.service.create(this.formulario.value).subscribe(
        () => {
          this.service.showMessage('Hotel cadastrado com sucesso!');
          this.router.navigate(['/hoteis']);
        },
        (err) => {
          this.service.showMessage('Não foi possível cadastrar o hotel', true);
        }
      );
    } else {
      this.service.showMessage("Preencha corretamente os campos", true)
    }
  }
}
