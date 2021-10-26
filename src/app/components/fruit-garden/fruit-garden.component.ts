import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    ViewContainerRef
} from '@angular/core'
import { FruitPlantComponent } from './fruit-plant/fruit-plant.component'

@Component({
    selector: 'app-fruit-garden',
    templateUrl: './fruit-garden.component.html',
    styleUrls: ['./fruit-garden.component.scss'],
})
export class FruitGardenComponent {

    /**
     * Constructs a garden where fruit can be planted
     * @param viewContainerRef
     * @param componentFactoryResolver
     */
    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    /**
     * Handler for click events that plants fruit plants
     * @param mE the mouse event from the click
     */
    soilClicked(mE: MouseEvent) {

        // create a component factory to create FruitPlantComponents
        const componentFactory: ComponentFactory<FruitPlantComponent> = this.componentFactoryResolver
            .resolveComponentFactory<FruitPlantComponent>(FruitPlantComponent)

        // generate the new FruitPlantRef
        const componentRef: ComponentRef<FruitPlantComponent> = this.viewContainerRef
            .createComponent<FruitPlantComponent>(componentFactory)

        componentRef.instance.setIconPosition(mE.offsetX, mE.offsetY)
    }

    clearAllFruit(): void {
        this.viewContainerRef.clear()
    }
}
