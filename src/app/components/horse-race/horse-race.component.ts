import { Component } from '@angular/core'
import { faHorse, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { finalize, takeUntil, tap } from 'rxjs/operators'
import {
    interval,
    of,
    Subject,
    Subscription,
    zip
} from 'rxjs'

interface HorseData {
    position: number
    color: string
}

/**
 * The maximum percentage (horizontally) the horse can travel
 */
const MAX_PERCENTAGE = 100

/**
 * Number of horses in the race
 */
const NUMBER_OF_HORSES = 5

/**
 * The amount of time between each movement turn
 */
const MOVEMENT_TURN_INTERVAL = 100

/**
 * The max percentage a horse can move in a single turn
 */
const MAX_MOVEMENT_PERCENT_PER_TURN = 2

/**
 * Various horse colors
 */
const HORSE_COLORS: string[] = [
    'red',
    'blue',
    'green',
    'purple',
    'orange'
]

@Component({
    selector: 'app-horse-race',
    templateUrl: './horse-race.component.html',
    styleUrls: ['./horse-race.component.scss'],
})
export class HorseRaceComponent {

    public faHorse: IconDefinition = faHorse

    public horses: HorseData[]

    private raceResults$: Subject<HorseData | null>
    public raceSubscription!: Subscription | null
    public raceStarted: boolean
    public raceWinner!: HorseData | null

    constructor() {

        // error handling
        if (NUMBER_OF_HORSES > HORSE_COLORS.length) {
            throw new Error('Number of colors should be greater or equal to number of horses')
        }

        // fill out the horses array
        this.horses = []
        for (let i = 0; i < NUMBER_OF_HORSES; i++) {
            this.horses.push({
                position: 0,
                color: HORSE_COLORS[i],
            })
        }

        // initilize the race variables
        this.raceStarted = false
        this.raceResults$ = new Subject<HorseData | null>()

        this.raceResults$.subscribe(
            ((winnerOrNull: HorseData | null) => {
                this.raceWinner = winnerOrNull
            })
        )
    }

    /**
     * - Resets the race subscription
     * - Resets the horse positons
     * - Pushes a null to the results subject
     */
    private resetRace(): void {

        // reset the subscription
        if (this.raceSubscription) {
            this.raceSubscription.unsubscribe()
            this.raceSubscription = null
        }

        // reset the horse position
        this.horses = this.horses.map((horse: HorseData) => (
            {
                ...horse,
                position: 0,
            }
        ))

        // reset the race
        this.raceStarted = false
        this.raceResults$.next(null)
    }

    /**
     * Gets the status string for the current race
     * @returns status of the race
     */
    getRaceStatus(): string {
        const winningHorse = this.raceWinner

        if (winningHorse) {
            const capitalizedColor: string = winningHorse.color.charAt(0).toUpperCase() + winningHorse.color.slice(1)
            return `${capitalizedColor} Wins!`
        }

        return 'I should be hidden right now'
    }
    /**
     * Starts the horse race!
     */
    startRace(): void {

        this.resetRace()

        this.raceStarted = true

        this.raceSubscription = zip(
            ...this.horses.map(
                () => of(...HorseRaceComponent.generatePositionArray())
            ),
            interval(MOVEMENT_TURN_INTERVAL)
        ).pipe(
            tap((horsePositions: number[]) => {

                // update the horse positions
                for (let i = 0; i < this.horses.length; i++) {
                    const currentHorse: HorseData = this.horses[i]
                    currentHorse.position = horsePositions[i]

                    // calculate if we have a winner
                    if (currentHorse.position >= MAX_PERCENTAGE) {
                        this.raceResults$.next(currentHorse)
                    }
                }
            }),
            takeUntil(this.raceResults$),
            finalize(() => {
                this.raceStarted = false
            })
        ).subscribe()
    }

    /**
     * Generates an array of positions moving from (1-100)
     * @returns position array
     */
    private static generatePositionArray(): number[] {

        const finalPositionArray: number[] = []
        let percentageRemaining: number = MAX_PERCENTAGE
        let currentPosition = 0
        let inifinteLoopGuard = 100

        while (percentageRemaining > 0 && --inifinteLoopGuard > 0) {

            const nextStep: number = Math.floor(
                Math.random() * Math.min(MAX_MOVEMENT_PERCENT_PER_TURN, percentageRemaining)
            ) + 1

            currentPosition += nextStep

            finalPositionArray.push(currentPosition)

            percentageRemaining -= nextStep
        }

        return finalPositionArray
    }
}
