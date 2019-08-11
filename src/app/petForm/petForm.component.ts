import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MomentService } from '../moment/moment.service';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { SET_PET_DATA} from '../actions';
import { PET_SPECIES, HUMAN } from '../model/species';
import { PetFormData } from '../model/petFormData';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-pet-form',
  templateUrl: './petForm.component.html',
  styleUrls: ['./petForm.component.css']
})
export class PetFormComponent implements OnInit, OnDestroy {

  public petTypes: string[];
  public minDate;
  public maxDate;
  public ageText;

  public petForm: FormGroup;
  private petFormDataSubscriber: any;
  private petFormData: PetFormData;

  @select('petFormData') petFormDataObservable: Observable<PetFormData>;

  constructor(private momentService: MomentService, private ngRedux: NgRedux<IAppState>) {
    this.petTypes = PET_SPECIES.map((p) => p.type);
    this.minDate = new Date(2000, 0);
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.petFormDataSubscriber = this.petFormDataObservable.subscribe((data) => this.handlePetFormDataChange(data));
    this.petForm = new FormGroup({
      name: new FormControl(this.petFormData.name, [Validators.required, Validators.maxLength(20)]),
      type: new FormControl(this.petFormData.type, []),
      dateOfBirth: new FormControl(this.petFormData.dateOfBirth, [Validators.required]),
    });
    this.generateAgeText(this.petForm.value.type, this.petForm.value.dateOfBirth);
  }
  ngOnDestroy(): void {
    this.petFormDataSubscriber.unsubscribe();
  }

  handlePetFormDataChange(data: PetFormData) {
    this.petFormData = data;
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.petForm.controls[controlName].hasError(errorName);
  }

  apply(): void {
    if (this.petForm.valid) {
      this.ngRedux.dispatch({type: SET_PET_DATA, petFormData: this.petForm.value});
    }
  }

  dateChange(event: any): void {
    this.generateAgeText(this.petForm.value.type, event.value);
  }

  selectionChange(event: any): void {
    this.generateAgeText(event.value, this.petForm.value.dateOfBirth);
  }

  generateAgeText(type: string, dateOfBirth: string): void {
    const petLifeExpectancy: number = PET_SPECIES.find((p) => p.type === type).lifeExpectancy;
    const lifeExpectancyFactor: number = HUMAN.lifeExpectancy / petLifeExpectancy;
    this.ageText = this.momentService.ageText(new Date(dateOfBirth), lifeExpectancyFactor, false);
  }
}
