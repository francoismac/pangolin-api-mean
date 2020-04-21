import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Creer.AmiComponent } from './creer.ami.component';

describe('Creer.AmiComponent', () => {
  let component: Creer.AmiComponent;
  let fixture: ComponentFixture<Creer.AmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Creer.AmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Creer.AmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
