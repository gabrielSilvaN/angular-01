import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmDeleteComponent } from './component/template/confirm-delete/confirm-delete.component';
import { FooterComponent } from './component/template/footer/footer.component';
import { HeaderComponent } from './component/template/header/header.component';
import { SidenavComponent } from './component/template/sidenav/sidenav.component';
import { HomeComponent } from './component/view/home/home.component';
import { HospedagemFormComponent } from './component/view/hospedagem/hospedagem-form/hospedagem-form.component';
import { HospedagemListComponent } from './component/view/hospedagem/hospedagem-list/hospedagem-list.component';
import { HospedagemUpdateComponent } from './component/view/hospedagem/hospedagem-update/hospedagem-update.component';
import { HospedeFormComponent } from './component/view/hospede/hospede-form/hospede-form.component';
import { HospedeListComponent } from './component/view/hospede/hospede-list/hospede-list.component';
import { HospedeUpdateComponent } from './component/view/hospede/hospede-update/hospede-update.component';
import { HotelFormComponent } from './component/view/hotel/hotel-form/hotel-form.component';
import { HotelListComponent } from './component/view/hotel/hotel-list/hotel-list.component';
import { HotelUpdateComponent } from './component/view/hotel/hotel-update/hotel-update.component';
import { QuartoFormComponent } from './component/view/quarto/quarto-form/quarto-form.component';
import { QuartoListComponent } from './component/view/quarto/quarto-list/quarto-list.component';
import { QuartoUpdateComponent } from './component/view/quarto/quarto-update/quarto-update.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    HotelListComponent,
    HomeComponent,
    HotelFormComponent,
    QuartoListComponent,
    QuartoFormComponent,
    HospedeListComponent,
    HospedeFormComponent,
    HospedagemListComponent,
    HospedagemFormComponent,
    HotelUpdateComponent,
    HospedeUpdateComponent,
    ConfirmDeleteComponent,
    HospedagemUpdateComponent,
    QuartoUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
