import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { CombineLatestComponent } from './components/operators/combine-latest/combine-latest.component'

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CombineLatestComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
