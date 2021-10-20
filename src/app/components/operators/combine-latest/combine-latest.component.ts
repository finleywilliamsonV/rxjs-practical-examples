import { Component, OnInit } from '@angular/core'
import { faHorse, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { interval, of, zip } from 'rxjs'
import {
    delay, tap, map, take
} from 'rxjs/operators'

interface HorseIconData {
    position: number
    color: string
}

const MAX_PERCENTAGE: number = 80

@Component({
    selector: 'app-combine-latest',
    templateUrl: './combine-latest.component.html',
    styleUrls: ['./combine-latest.component.scss'],
})
export class CombineLatestComponent {

    public faHorse: IconDefinition = faHorse

    public blueHorse: HorseIconData = {
        position: 0,
        color: 'red',
    }

    public redHorse: HorseIconData = {
        position: 0,
        color: 'red',
    }

    private bluePositionArray: number[]
    private redPositionArray: number[]

    public bluePosition: number
    public redPosition: number

    constructor() {
        this.bluePositionArray = CombineLatestComponent.generatePositionArray()
        this.redPositionArray = CombineLatestComponent.generatePositionArray()

        this.bluePosition = 0
        this.redPosition = 0
    }

    startRace(): void {

        const bluePositions$ = zip(
            of(...this.bluePositionArray),
            interval(500)
        ).pipe(
            map((zippedVals: [number, number]) => zippedVals[0]),
            tap((bluePos) => {
                this.bluePosition = bluePos
                console.log(`blue: ${bluePos}`)
            })
        ).subscribe()

        const redPositions$ = zip(
            of(...this.redPositionArray),
            interval(500)
        ).pipe(
            map((zippedVals: [number, number]) => zippedVals[0]),
            tap((redPos) => {
                this.redPosition = redPos
                console.log(`red: ${redPos}`)
            })
        ).subscribe()
    }

    /**
     * Generates an array of positions moving from (1-100)
     * @returns position array
     */
    private static generatePositionArray(): number[] {

        let sanityBreak: number = 100

        const positionArray: number[] = []

        let percentageRemaining: number = MAX_PERCENTAGE
        const maxStep: number = 10

        let currentPosition: number = 0

        while (percentageRemaining > 0 && --sanityBreak > 0) {
            const nextStep: number = Math.floor(Math.random() * maxStep) + 1
            currentPosition += nextStep
            if (currentPosition > MAX_PERCENTAGE) {
                currentPosition = MAX_PERCENTAGE
            }
            positionArray.push(currentPosition)
            percentageRemaining -= nextStep
        }

        console.log('positionArray:', positionArray)

        return positionArray
    }
}
