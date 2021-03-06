import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { HorseRaceComponent } from './components/horse-race/horse-race.component'
import { BowlingBallComponent } from './components/bowling-ball/bowling-ball.component'
import { ComponentContainerComponent } from './components/component-container/component-container.component'
import { FruitGardenComponent } from './components/fruit-garden/fruit-garden.component'
import { FruitPlantComponent } from './components/fruit-garden/fruit-plant/fruit-plant.component'
import { DirectoryComponent } from './components/directory/directory.component'

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HorseRaceComponent,
        BowlingBallComponent,
        ComponentContainerComponent,
        FruitGardenComponent,
        FruitPlantComponent,
        DirectoryComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FontAwesomeModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
