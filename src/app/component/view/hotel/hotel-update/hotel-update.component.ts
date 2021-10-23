import { Component, OnInit } from '@angular/core';
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
  }

  salvar() {
    this.service.update(this.hotel).subscribe(() => {
      this.service.showMessage('Hotel atualizado com sucesso!');
      this.router.navigate(['/hoteis']);
    });
  }
}
