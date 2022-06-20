import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingFormNewComponent } from './building-formNew.component';

describe('BuildingFormNewComponent', () => {
	let component: BuildingFormNewComponent;
	let fixture: ComponentFixture<BuildingFormNewComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BuildingFormNewComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BuildingFormNewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
