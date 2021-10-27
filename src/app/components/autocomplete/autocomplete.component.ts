import { Component, OnInit } from '@angular/core'
import { UserStorageService } from '../../services/user-storage.service'

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {

    constructor(private userStorageService: UserStorageService) {

    }

    ngOnInit(): void {
    }

}
