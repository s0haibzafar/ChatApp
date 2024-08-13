import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Material 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

//hot-toast
import { HotToastModule } from '@ngneat/hot-toast';

//firebase
import { environment } from "src/environments/environment";
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { provideAuth,getAuth } from '@angular/fire/auth';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideStorage, getStorage } from "@angular/fire/storage"
import { ProfileComponent } from './components/profile/profile.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    [HotToastModule.forRoot()],
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideStorage(()=> getStorage()),
    provideFirestore(()=> getFirestore()),
    MatMenuModule,
    MatAutocompleteModule,
    MatListModule,
    MatDividerModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
