import { Component } from '@angular/core'
import { faBowlingBall, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import {
    concat, interval, of, zip
} from 'rxjs'
import { tap } from 'rxjs/operators'

const PERCENT_OFF_SCREEN: number = -40

const BALL_COLORS: string[] = [
    'red',
    'blue',
    'green',
    'purple',
    'orange'
]

interface BowlingBallData {
    color: string
    position: number
}

@Component({
    selector: 'app-bowling-ball',
    templateUrl: './bowling-ball.component.html',
    styleUrls: ['./bowling-ball.component.scss'],
})
export class BowlingBallComponent {

    public faBowlingBall: IconDefinition = faBowlingBall
    public bowlingBalls: BowlingBallData[]

    constructor() {
        let travelDistanceRemaining: number = Math.abs(PERCENT_OFF_SCREEN * 2) + 100 // in percent
        let currentPosition: number = PERCENT_OFF_SCREEN
        const travelPositionArray: number[] = [currentPosition]

        while (travelDistanceRemaining > 0) {
            currentPosition += 10
            travelDistanceRemaining -= 10
            travelPositionArray.push(currentPosition)
        }

        console.log('travelPositionArray:', travelPositionArray)

        this.bowlingBalls = [
            {
                color: BALL_COLORS[0],
                position: 0,
            },
            {
                color: BALL_COLORS[1],
                position: 0,
            }
        ]

        concat(
            ...this.bowlingBalls.map(() => zip(
                of(...travelPositionArray),
                interval(500)
            ))
        ).pipe(
            tap((x) => console.log('x:', x))
        ).subscribe()

    }

}
