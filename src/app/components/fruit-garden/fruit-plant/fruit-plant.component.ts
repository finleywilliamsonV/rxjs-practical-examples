import { Component, ViewContainerRef } from '@angular/core'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

@Component({
    selector: 'app-fruit-plant',
    templateUrl: './fruit-plant.component.html',
    styleUrls: ['./fruit-plant.component.scss'],
})
export class FruitPlantComponent {

    public faApple: IconDefinition = faApple
    public iconStyles!: Record<string, string>

    constructor(public viewContainerRef: ViewContainerRef) {}

    setIconStyle(color: string, x: number, y: number) {
        this.iconStyles = {
            color,
            position: 'absolute',
            left: `${x - 8}px`, // TODO: Figure out how to get this position without hardcoded vals
            top: `${y + 113}px`, // TODO: Figure out how to get this position without hardcoded vals
        }
    }

}
