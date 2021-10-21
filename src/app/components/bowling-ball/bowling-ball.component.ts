import {
    combineLatest,
    concat,
    interval,
    of,
    zip
} from 'rxjs'
import { Component } from '@angular/core'
import { faBowlingBall, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { finalize, map, tap } from 'rxjs/operators'

const STARTING_PERCENT: number = 25
const PERCENT_MOVEMENT_PER_TURN: number = 0.1
const TIME_BETWEEN_TURNS: number = 1

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
    isRolling: boolean
}

@Component({
    selector: 'app-bowling-ball',
    templateUrl: './bowling-ball.component.html',
    styleUrls: ['./bowling-ball.component.scss'],
})
export class BowlingBallComponent {

    faBowlingBall: IconDefinition = faBowlingBall
    bowlingBalls: BowlingBallData[]
    private travelPositionArray: number []
    rollingInProgress: boolean

    // @ViewChildren('bowlingBallIcons') iconRefs!: QueryList<FaIconComponent>
    // bowlingBallIcons: FaIconComponent[]

    constructor() {
        this.bowlingBalls = []
        this.travelPositionArray = []
        this.rollingInProgress = false

        // this.bowlingBallIcons = []

        this.setupTravelPositionArray()
        this.setupBallArray()
    }

    // ngAfterViewInit(): void {
    //     this.bowlingBallIcons = this.iconRefs.toArray()
    //     console.log('this.bowlingBallIcons:', this.bowlingBallIcons)
    // }

    private setupTravelPositionArray(): void {
        let travelDistanceRemaining: number = 100 - Math.abs(STARTING_PERCENT * 2) // in percent
        let currentPosition: number = STARTING_PERCENT
        this.travelPositionArray = [currentPosition]

        while (travelDistanceRemaining > 0) {
            currentPosition += PERCENT_MOVEMENT_PER_TURN
            travelDistanceRemaining -= PERCENT_MOVEMENT_PER_TURN
            this.travelPositionArray.push(currentPosition)
        }
    }

    private setupBallArray(): void {
        this.bowlingBalls = BALL_COLORS.map((color: string) => (
            {
                color,
                position: STARTING_PERCENT,
                isRolling: false,
            }
        ))
    }

    public rollTheBalls() {

        this.rollingInProgress = true

        concat(
            ...this.bowlingBalls.map((bowlingBall: BowlingBallData) =>
                combineLatest([
                    of(bowlingBall),
                    zip(
                        of(...this.travelPositionArray),
                        interval(TIME_BETWEEN_TURNS)
                    ).pipe(
                        map(([position]) => position),
                        tap(() => {
                            bowlingBall.isRolling = true
                        }),
                        finalize(() => {
                            bowlingBall.isRolling = false
                        })
                    )
                ]))
        ).pipe(
            tap(
                ([currentBall, currentPosition]: [BowlingBallData, number]) => {
                    currentBall.position = currentPosition
                }
            ),
            finalize(() => {
                this.travelPositionArray.reverse()
                this.rollingInProgress = false
            })
        ).subscribe()
    }
}
