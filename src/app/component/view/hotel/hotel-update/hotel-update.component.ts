import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/app/model/hotel.model';
import { HotelService } from 'src/app/service/hotel.service';

@Component({
  selector: 'app-hotel-update',
  templateUrl: '../hotel-form/hotel-form.component.html',
  styleUrls: ['./../hotel-form/hotel-form.component.scss'],
})
export class HotelUpdateComponent implements OnInit {
  title: string = 'Alterar dados do hotel';

  hotel: Hotel = {
    endereco: '',
    nmHotel: '',
    qtdEstrelas: 0,
    idHotel: 0,
  };

  public formulario: FormGroup;

  constructor(
    private service: HotelService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.service.findById(id).subscribe((hotel) => {
        this.hotel = hotel;
      });
    }

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
      this.service.update(this.formulario.value).subscribe(
        () => {
          this.service.showMessage('Hotel atualizado com sucesso!');
          this.router.navigate(['/hoteis']);
        },
        (err) => {
          this.service.showMessage('Não foi possível atualizar o hotel', true);
        }
      );
    } else {
      this.service.showMessage('Preencha corretamente os campos', true);
    }
  }
}
