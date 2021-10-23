import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/model/hotel.model';
import { HotelService } from 'src/app/service/hotel.service';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.scss'],
})
export class HotelFormComponent implements OnInit {
  title: string = 'Cadastrar novo hotel'


  hotel: Hotel = {
    endereco: '',
    nmHotel: '',
    qtdEstrelas: 0,
  };

  constructor(private service: HotelService, private router: Router) {}

  ngOnInit(): void {}

  salvar() {
    this.service.create(this.hotel).subscribe(() => {
      this.service.showMessage('Hotel cadastrado com sucesso!')
      this.router.navigate(['/hoteis'])
    })
  }
}
