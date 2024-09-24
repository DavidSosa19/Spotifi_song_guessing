import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SdkPlayerComponent } from './components/sdk-player/sdk-player.component';
import { PetCanvaComponent } from './components/pet-canva/pet-canva.component';
import { MusicDetailsComponent } from './components/music-details/music-details.component';
import { DialogsComponent } from './components/dialogs/dialogs.component';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    SdkPlayerComponent,
    PetCanvaComponent,
    MusicDetailsComponent,
    DialogsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PrimeNgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
