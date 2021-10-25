import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core'
import { FruitPlantComponent } from './fruit-plant/fruit-plant.component'

@Component({
    selector: 'app-fruit-garden',
    templateUrl: './fruit-garden.component.html',
    styleUrls: ['./fruit-garden.component.scss'],
})
export class FruitGardenComponent implements OnInit {

    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    ngOnInit(): void {
        console.log('this.viewContainerRef:', this.viewContainerRef)
    }

    soilClicked(e: MouseEvent) {

        const componentFactory = this.componentFactoryResolver
            .resolveComponentFactory<FruitPlantComponent>(FruitPlantComponent)

        const componentRef = this.viewContainerRef.createComponent<FruitPlantComponent>(componentFactory)

        componentRef.instance.setIconStyle('red', e.offsetX, e.offsetY)
    }
}
