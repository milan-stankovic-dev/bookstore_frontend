import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagingButtonsComponent } from './paging-buttons.component';

describe('PagingButtonsComponent', () => {
  let component: PagingButtonsComponent;
  let fixture: ComponentFixture<PagingButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagingButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagingButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
