import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Building } from '../../model/building';
import { Router } from '@angular/router';
import { BuildingService } from '../../services/building.service';

@Component({
	selector: 'app-building-formNew',
	templateUrl: './building-formNew.component.html',
	styleUrls: ['./building-formNew.component.scss'],
})
export class BuildingFormNewComponent implements OnInit {
	building: Building = null;
	form: FormGroup = this.initForm();

	constructor(
		private router: Router,
		private buildingService: BuildingService,
		private formBuilder: FormBuilder
	) {}

	ngOnInit() {
		this.form = this.initForm();
	}

	initForm(building?: Building) {
		return this.formBuilder.group({
			name: new FormControl(
				building?.name || '',
				[Validators.required, Validators.maxLength(50)]
			),
			address: new FormControl(
				building?.address || '',
				[Validators.required, Validators.maxLength(50)]
			),
			index: new FormControl(
				building?.index || '', [Validators.required, Validators.pattern("^NO.*")]
			),
			sectorCode: new FormControl(
				{
					value: building?.sectorCode || '',
					disabled: building?.sectorCode,			
				}
			),
			energyUnitMax: new FormControl(
				{
					value: building?.energyUnitMax || '',
					disabled: building?.id,
				}
			),
			energyUnits: new FormControl(
				building?.energyUnits || '',
				[Validators.required, Validators.max(building?.energyUnitMax.valueOf())]
			),
		});
	}


	hasError(path: string, errorCode: string) {
		return this.form && this.form.hasError(errorCode, path);
	}

	navigateToBuildingsList() {
		this.router.navigate(['buildings']).then();
	}

	submit() {
		const buildingToSave = { ...this.form.value};

		this.form.controls["sectorCode"].disable();

		this.buildingService.post(buildingToSave).subscribe();
	}
}
