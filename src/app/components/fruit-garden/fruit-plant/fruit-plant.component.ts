import { Component } from '@angular/core'
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

    setIconStyle(color: string, x: number, y: number) {
        this.iconStyles = {
            color,
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
        }
    }

}
