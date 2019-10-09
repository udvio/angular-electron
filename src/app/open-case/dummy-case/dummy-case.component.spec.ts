import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyCaseComponent } from './dummy-case.component';

describe('DummyCaseComponent', () => {
  let component: DummyCaseComponent;
  let fixture: ComponentFixture<DummyCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
