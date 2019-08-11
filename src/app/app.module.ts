import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { PetFormComponent } from './petForm/petForm.component';
import { SettingsComponent } from './settings/settings.component';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, INITIAL_STATE, rootReducer} from './store';
import { LocalStorage} from './localStorage';
import { MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule} from '@angular/material' ;
import { MatFormFieldModule, MatInputModule, MatExpansionModule, MatDatepickerModule, MatDatepicker} from '@angular/material';
import { MatNativeDateModule, MatRadioModule, MatSelectModule, MatOptionModule, MatTableModule} from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';
import { MatSidenavModule, MatSnackBarModule} from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
@NgModule({
   declarations: [
      AppComponent,
      ClockComponent,
      PetFormComponent,
      SettingsComponent,
      AboutComponent,
      HomeComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      MatGridListModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatMenuModule,
      MatToolbarModule,
      MatIconModule,
      MatCardModule,
      BrowserAnimationsModule,
      MatFormFieldModule,
      MatInputModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatRadioModule,
      MatSelectModule,
      MatOptionModule,
      MatSlideToggleModule,
      MatExpansionModule,
      MatSidenavModule,
      MatTableModule,
      MatSnackBarModule,
      AppRoutingModule,
      NgReduxModule
   ],
   exports: [
      MatButtonModule,
      MatMenuModule,
      MatToolbarModule,
      MatIconModule,
      MatCardModule,
      BrowserAnimationsModule,
      MatFormFieldModule,
      MatInputModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatRadioModule,
      MatSelectModule,
      MatOptionModule,
      MatSlideToggleModule,
      MatExpansionModule,
      MatTableModule,
      MatSidenavModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {
   constructor(ngRedux: NgRedux<IAppState>) {
      let initialState = LocalStorage.loadState();
      if (initialState === undefined) {
         initialState = INITIAL_STATE;
      }
      ngRedux.configureStore(rootReducer, initialState);
      ngRedux.subscribe(() => {
         LocalStorage.saveState(ngRedux.getState());
      });
   }
}
