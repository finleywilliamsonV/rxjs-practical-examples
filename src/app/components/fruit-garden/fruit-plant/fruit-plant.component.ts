import { AfterViewInit, Component, ViewContainerRef } from '@angular/core'
import { faSeedling, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { interval } from 'rxjs'
import { map, tap } from 'rxjs/operators'

@Component({
    selector: 'app-fruit-plant',
    templateUrl: './fruit-plant.component.html',
    styleUrls: ['./fruit-plant.component.scss'],
})
export class FruitPlantComponent implements AfterViewInit {

    public faSeedling: IconDefinition = faSeedling
    public iconStyles!: Record<string, string>
    public iconTransform!: string

    constructor(public viewContainerRef: ViewContainerRef) {
        this.iconStyles = {
            color: 'lightgreen',
            position: 'absolute',
        }
    }

    ngAfterViewInit(): void {
        interval(10)
            .pipe(
                map((val) => (val + 1) / 4),
                tap((val) => {
                    this.iconTransform = `grow-${val} up-${val * 0.45}`
                })
            )
            .subscribe()
    }

    setIconPosition(x: number, y: number) {
        this.iconStyles = {
            ...this.iconStyles,
            left: `${x - 8}px`, // TODO: Figure out how to get this position without hardcoded vals
            top: `${y + 106}px`, // TODO: Figure out how to get this position without hardcoded vals
        }
    }

}
