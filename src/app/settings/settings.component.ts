import { Component, OnInit, OnDestroy } from '@angular/core';
import { ColorScheme, COLOR_SCHEMES} from '../model/colorScheme';
import { NgRedux, select} from '@angular-redux/store';
import { SET_COLOR_SCHEME} from '../actions';
import { IAppState} from '../store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit, OnDestroy {
  readonly COLOR_SCHEMES = COLOR_SCHEMES;
  private selectedIndex: number;
  private colorScheme: ColorScheme;
  private colorSchemeSubscriber: any;
  @select('colorScheme') colorSchemeObservable: Observable<ColorScheme>;

  constructor(private ngRedux: NgRedux<IAppState>, private router: Router) {

  }

  ngOnInit(): void {
    this.colorSchemeSubscriber = this.colorSchemeObservable.subscribe((data) => this.handleColorSchemeChange(data));
  }

  ngOnDestroy(): void {
    this.colorSchemeSubscriber.unsubscribe();
  }

  handleColorSchemeChange(scheme: ColorScheme): void {
    this.colorScheme = scheme;
    const index = COLOR_SCHEMES.findIndex((p) => p.name === scheme.name);
    this.selectedIndex = (index >= 0 ? index : 0);
  }

  setColorScheme(index: number): void {
    this.selectedIndex = index;
    this.ngRedux.dispatch({type: SET_COLOR_SCHEME, colorScheme: COLOR_SCHEMES[this.selectedIndex]});
  }

  colorSchemeSelected(): void {
    setTimeout(() => this.router.navigate(['/home']), 200);
  }

}
