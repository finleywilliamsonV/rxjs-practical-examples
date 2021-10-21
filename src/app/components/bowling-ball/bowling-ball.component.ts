import {
    combineLatest,
    concat,
    interval,
    of,
    zip
} from 'rxjs'
import { Component } from '@angular/core'
import { faBowlingBall, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { map, tap } from 'rxjs/operators'

const PERCENT_OFF_SCREEN: number = -10
const PERCENT_MOVEMENT_PER_TURN: number = 0.1
const TIME_BETWEEN_TURNS: number = 10

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

    private travelPositionArray: number []

    constructor() {
        let travelDistanceRemaining: number = Math.abs(PERCENT_OFF_SCREEN * 2) + 100 // in percent
        let currentPosition: number = PERCENT_OFF_SCREEN
        this.travelPositionArray = [currentPosition]

        while (travelDistanceRemaining > 0) {
            currentPosition += PERCENT_MOVEMENT_PER_TURN
            travelDistanceRemaining -= PERCENT_MOVEMENT_PER_TURN
            this.travelPositionArray.push(currentPosition)
        }

        this.bowlingBalls = [
            {
                color: BALL_COLORS[0],
                position: PERCENT_OFF_SCREEN,
            },
            {
                color: BALL_COLORS[1],
                position: PERCENT_OFF_SCREEN,
            }
        ]

        this.rollTheBalls()
    }

    // eslint-disable-next-line class-methods-use-this
    public asNumber(numOrString: number | string): number {
        return parseInt(String(numOrString), 10)
    }

    private rollTheBalls() {
        concat(
            ...this.bowlingBalls.map((bowlingBall: BowlingBallData) => combineLatest([
                of(bowlingBall),
                zip(
                    of(...this.travelPositionArray),
                    interval(TIME_BETWEEN_TURNS)
                ).pipe(
                    map(([position]) => position)
                )
            ]))
        ).pipe(
            tap(console.log),
            tap(
                ([currentBall, currentPosition]) => {
                    // eslint-disable-next-line no-param-reassign
                    currentBall.position = currentPosition
                }
            )
        ).subscribe()
    }
}
