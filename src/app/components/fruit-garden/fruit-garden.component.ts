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

    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    soilClicked(e: MouseEvent) {

        const componentFactory: ComponentFactory<FruitPlantComponent> = this.componentFactoryResolver
            .resolveComponentFactory<FruitPlantComponent>(FruitPlantComponent)

        const componentRef: ComponentRef<FruitPlantComponent> = this.viewContainerRef
            .createComponent<FruitPlantComponent>(componentFactory)

        componentRef.instance.setIconPosition(e.offsetX, e.offsetY)
    }
}
