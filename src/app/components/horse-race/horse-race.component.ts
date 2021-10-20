import { Component } from '@angular/core'
import { faHorse, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import {
    finalize,
    takeUntil,
    tap
} from 'rxjs/operators'
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
const MAX_PERCENTAGE: number = 80

@Component({
    selector: 'app-horse-race',
    templateUrl: './horse-race.component.html',
    styleUrls: ['./horse-race.component.scss'],
})
export class HorseRaceComponent {

    public faHorse: IconDefinition = faHorse

    public blueHorse: HorseData = {
        position: 0,
        color: 'blue',
    }

    public redHorse: HorseData = {
        position: 0,
        color: 'red',
    }

    private raceResults$: Subject<HorseData | null>
    public raceSubscription!: Subscription | null
    public raceStarted: boolean
    public raceWinner!: HorseData | null

    constructor() {
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

        if (this.raceSubscription) {
            this.raceSubscription.unsubscribe()
            this.raceSubscription = null
        }

        this.redHorse.position = 0
        this.blueHorse.position = 0
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

        return ''
    }
    /**
     * Starts the horse race!
     */
    startRace(): void {

        this.resetRace()

        this.raceStarted = true

        this.raceSubscription = zip(
            of(...HorseRaceComponent.generatePositionArray()),
            of(...HorseRaceComponent.generatePositionArray()),
            interval(500)
        ).pipe(
            tap(([bluePosition, redPosition]) => {
                this.blueHorse.position = bluePosition
                this.redHorse.position = redPosition

                // calculate if we have a winner
                if (bluePosition >= MAX_PERCENTAGE) {
                    this.raceResults$.next(this.blueHorse)
                } else if (redPosition >= MAX_PERCENTAGE) {
                    this.raceResults$.next(this.redHorse)
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
        const maxStep: number = 10
        let percentageRemaining: number = MAX_PERCENTAGE
        let currentPosition: number = 0
        let inifinteLoopGuard: number = 100

        while (percentageRemaining > 0 && --inifinteLoopGuard > 0) {

            const nextStep: number = Math.floor(Math.random() * Math.min(maxStep, percentageRemaining)) + 1

            currentPosition += nextStep

            finalPositionArray.push(currentPosition)

            percentageRemaining -= nextStep
        }

        return finalPositionArray
    }
}
