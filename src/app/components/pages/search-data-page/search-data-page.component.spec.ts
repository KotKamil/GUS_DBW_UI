import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDataPageComponent } from './search-data-page.component';

describe('SearchDataPageComponent', () => {
  let component: SearchDataPageComponent;
  let fixture: ComponentFixture<SearchDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDataPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
