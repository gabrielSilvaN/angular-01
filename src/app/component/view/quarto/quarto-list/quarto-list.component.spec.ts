import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartoListComponent } from './quarto-list.component';

describe('QuartoListComponent', () => {
  let component: QuartoListComponent;
  let fixture: ComponentFixture<QuartoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuartoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuartoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
