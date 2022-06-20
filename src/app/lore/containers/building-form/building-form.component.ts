import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Building } from '../../model/building';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildingService } from '../../services/building.service';

@Component({
	selector: 'app-building-form',
	templateUrl: './building-form.component.html',
	styleUrls: ['./building-form.component.scss'],
})
export class BuildingFormComponent implements OnInit {
	building: Building = null;
	form: FormGroup = this.initForm();

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private buildingService: BuildingService,
		private formBuilder: FormBuilder
	) {}

	ngOnInit() {
		let id = this.route.snapshot.paramMap.get('id');

		if (id !== null) {
			this.buildingService.get(id).subscribe((data) => {
				this.form = this.initForm(data);
				this.building = data;
			});
		}
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
					disabled: building?.id,
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
		const buildingToupdate = { ...this.form.value, id: this.building.id , sectorCode: this.form.get('sectorCode').value, energyUnitMax: this.form.get('energyUnitMax').value};

		this.buildingService.put(buildingToupdate, this.building.id).subscribe();
	}
}
