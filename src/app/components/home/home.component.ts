import { Component } from '@angular/core'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

    public horseRaceOperators: string[] = [
        'interval',
        'of',
        'zip',
        'tap',
        'takeUntil',
        'finalize'
    ]

    public bowlingBallOperators: string[] = [
        'combineLatest',
        'concat',
        'interval',
        'of',
        'zip',
        'finalize',
        'map',
        'tap'
    ]
}
