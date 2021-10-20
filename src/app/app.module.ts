import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { HorseRaceComponent } from './components/horse-race/horse-race.component'
import { BowlingBallComponent } from './components/bowling-ball/bowling-ball.component'

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HorseRaceComponent,
        BowlingBallComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FontAwesomeModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
