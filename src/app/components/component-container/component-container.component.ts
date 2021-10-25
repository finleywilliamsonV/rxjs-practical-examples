import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-component-container',
    templateUrl: './component-container.component.html',
    styleUrls: ['./component-container.component.scss'],
})
export class ComponentContainerComponent {

    @Input('title') title!: string
    @Input('operators') operatorsUsed!: string[]
}
