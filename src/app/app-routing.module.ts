import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildingFormComponent } from './lore/containers/building-form/building-form.component';
import { BuildingFormNewComponent } from './lore/containers/building-formNew/building-formNew.component';
import { BuildingListComponent } from './lore/containers/building-list/building-list.component';


const routes: Routes = [
	{ path: 'buildings', component: BuildingListComponent },
	{ path: 'building/new', component: BuildingFormNewComponent },
	{ path: 'building/:id', component: BuildingFormComponent },
	{ path: '**', redirectTo: '/buildings', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
