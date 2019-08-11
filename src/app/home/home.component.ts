import { Component, OnInit, AfterViewInit, OnDestroy, AfterContentInit, AfterContentChecked } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { PetFormData } from '../model/petFormData';
import { select } from '@angular-redux/store';
import { HUMAN, PET_SPECIES } from '../model/species';
import { Observable } from 'rxjs';
import { MomentService } from '../moment/moment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private snackBarMessage;
  private petFormDataSubscriber: any;

  @select('petFormData') petFormDataObservable: Observable<PetFormData>;

  constructor(public snackBar: MatSnackBar, private momentService: MomentService) {}

  ngOnInit() {
    this.petFormDataSubscriber = this.petFormDataObservable.subscribe((data) => this.handlePetFormDataChange(data));
    setTimeout(() => this.openSnackBar(this.snackBarMessage, 'Hide'), 100);
  }

  ngOnDestroy(): void {
    this.snackBar.dismiss();
    this.petFormDataSubscriber.unsubscribe();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  handlePetFormDataChange(petFormData: PetFormData) {

    const petLifeExpectancy: number = PET_SPECIES.find((p) => p.type === petFormData.type).lifeExpectancy;
    const humanLifeExpectancy = HUMAN.lifeExpectancy;
    const lifeExpectancyFactor = humanLifeExpectancy / petLifeExpectancy;
    const ageText = this.momentService.ageText(petFormData.dateOfBirth, lifeExpectancyFactor);
    this.snackBarMessage = `${petFormData.name}, the ${petFormData.type}, is ${ageText} old!`;
  }

}
