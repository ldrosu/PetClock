import { Component, OnInit, OnDestroy, AfterContentInit, AfterViewInit} from '@angular/core';
import { ViewChild, ElementRef, Input, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { D3Service } from '../d3/d3.service';
import { Geometry } from '../model/geometry';
import { ColorScheme } from '../model/colorScheme';
import { PetFormData } from '../model/petFormData';
import { Species, HUMAN, PET_SPECIES } from '../model/species';

import { select } from '@angular-redux/store';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})

export class ClockComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {

  @Input() category: string;

  @ViewChild('hourHand') hourHandElement: ElementRef;
  @ViewChild('minuteHand') minuteHandElement: ElementRef;
  @ViewChild('secondHand') secondHandElement: ElementRef;
  @ViewChild('daysText') daysTextGroupElement: ElementRef;

  public imagePath;
  public colorScheme: ColorScheme;
  private colorSchemeSubscriber: any;
  @select('colorScheme') colorSchemeObservable: Observable<ColorScheme>;

  private petFormData: PetFormData;
  private petFormDataSubscriber: any;
  @select('petFormData') petFormDataObservable: Observable<PetFormData>;

  private step: number;
  private PET_SPECIES: Species[] = PET_SPECIES;
  readonly human: Species = HUMAN;
  public cursiveName = 'You'; // Default human
  public geometry: Geometry;

  constructor(private d3Service: D3Service, private renderer: Renderer2) {
  }

  handleColorSchemeChange(scheme: ColorScheme) {
    this.colorScheme = scheme;
    if (this.category !== 'human') {
      if (this.petFormData !== undefined) {
        const sp: Species = this.PET_SPECIES.find((p) => p.type === this.petFormData.type);
        if (scheme.markings === 'white') {
          this.imagePath = sp.imagePath_white;
        } else {
          this.imagePath = sp.imagePath_black;
        }
      }
    } else {
      if (scheme.markings === 'white') {
        this.imagePath = HUMAN.imagePath_white;
      } else {
        this.imagePath = HUMAN.imagePath_black;
      }
    }
  }

  handlePetFormDataChange(petFormData: PetFormData) {
    if (this.category === 'human') { return; }

    this.petFormData = petFormData;
    this.cursiveName = petFormData.name;
    const sp: Species = this.PET_SPECIES.find((p) => p.type === petFormData.type);
    if (this.colorScheme !== undefined) {
      if (this.colorScheme.markings === 'white') {
        this.imagePath = sp.imagePath_white;
      } else {
        this.imagePath = sp.imagePath_black;
      }
    }
  }

  ngOnInit() {
    this.colorSchemeSubscriber = this.colorSchemeObservable.subscribe((data) => this.handleColorSchemeChange(data));
    this.petFormDataSubscriber = this.petFormDataObservable.subscribe((data) => this.handlePetFormDataChange(data));

    let lifeSpanFactor = 1;
    if (this.category !== 'human') {
      const petLifeExpectancy = this.PET_SPECIES.find((p) => p.type === this.petFormData.type).lifeExpectancy;
      lifeSpanFactor = HUMAN.lifeExpectancy / petLifeExpectancy;
    }
    this.geometry = new Geometry(lifeSpanFactor, this.d3Service.getPathFromArc);
    this.step = Math.ceil(1000 / lifeSpanFactor);
  }

  ngAfterViewInit() {
    const textPathElements: [] = this.daysTextGroupElement.nativeElement.querySelectorAll('textPath');
    for (let i = 0; i < textPathElements.length; i++) {
      this.renderer.setAttribute(textPathElements[i], 'href', window.location.href + '#daysText' + this.category + i);
    }
  }

  ngAfterContentInit() {
    this.rotateHands(0);
    if (true) {
      setInterval(() => {
        this.rotateHands(this.step / 2);
      }, this.step);
    }
  }

  ngOnDestroy() {
    this.colorSchemeSubscriber.unsubscribe();
    this.petFormDataSubscriber.unsubscribe();
  }

  rotateHands(duration: number) {
    this.geometry.setDate();
    this.d3Service.rotateElementWithTransition(this.secondHandElement.nativeElement, this.geometry.secondHandAngle - 90, duration);
    this.d3Service.rotateElement(this.minuteHandElement.nativeElement, this.geometry.minuteHandAngle - 90);
    this.d3Service.rotateElement(this.hourHandElement.nativeElement,  this.geometry.hourHandAngle - 90);
  }
}
