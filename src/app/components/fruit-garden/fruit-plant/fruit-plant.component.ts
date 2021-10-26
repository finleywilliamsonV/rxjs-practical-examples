import {
    AfterViewInit,
    Component,
    ViewChild,
    ViewContainerRef
} from '@angular/core'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { faSeedling, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import {
    finalize,
    map,
    takeWhile,
    tap
} from 'rxjs/operators'
import { interval, Observable } from 'rxjs'
import { FruitData, getNextFruitData } from '../fruit-db'

const MAX_GROW_VAL_PLANT = 50
const FINAL_VAL_FRUIT = 30

@Component({
    selector: 'app-fruit-plant',
    templateUrl: './fruit-plant.component.html',
    styleUrls: ['./fruit-plant.component.scss'],
})
export class FruitPlantComponent implements AfterViewInit {

    public faSeedling: IconDefinition = faSeedling
    public faApple: IconDefinition = faApple
    public iconStyles!: Record<string, string>
    public iconTransform!: string

    @ViewChild('icon') iconRef!: FaIconComponent

    constructor(public viewContainerRef: ViewContainerRef) {
        this.iconStyles = {
            color: 'lightgreen',
            position: 'absolute',
        }
    }

    /**
     * After view is intialized, start to grow the plant
     */
    ngAfterViewInit(): void {
        this.growThePlant().subscribe()
    }

    /**
     * Sets the initial position of the icon
     * @param x
     * @param y
     */
    setIconPosition(x: number, y: number) {
        this.iconStyles = {
            ...this.iconStyles,
            left: `${x - 8}px`, // TODO: Figure out how to get this position without hardcoded vals
            top: `${y + 106}px`, // TODO: Figure out how to get this position without hardcoded vals
        }
    }

    /**
     * Observable that grows the plant
     * @returns
     */
    private growThePlant(): Observable<number> {

        // run every 10 ms
        return interval(10)
            .pipe(

                // scale back the piped values
                map((growVal) => (growVal + 1) / 4),

                // apply the values to the icon transform
                tap((growVal) => {
                    this.iconTransform = this.generateIconTransform(growVal)
                }),

                // take while the growVal is less than the max
                takeWhile((growVal: number) => growVal <= MAX_GROW_VAL_PLANT),

                // when the plant is done growing, turn into a fruit
                finalize(() => {
                    this.turnIntoFruit()
                })
            )
    }

    /**
     * Turns the plant into a fruit
     */
    private turnIntoFruit(): void {

        // gets the next fruit data
        const newFruit: FruitData = getNextFruitData()

        // set the new icon
        this.iconRef.icon = newFruit.icon

        // set the new styles
        this.iconStyles = {
            ...this.iconStyles,
            color: newFruit.color,
        }

        // set the icon transform
        this.iconTransform = this.generateIconTransform(FINAL_VAL_FRUIT * newFruit.scaling)

        // rerender the icon
        this.iconRef.render()
    }

    /**
     * Generates the icon transform string
     * @param baseVal
     * @returns
     */
    private generateIconTransform = (growVal: number) => `grow-${growVal} up-${growVal * 0.45}`
}
