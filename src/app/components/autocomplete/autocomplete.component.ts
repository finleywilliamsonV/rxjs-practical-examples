import { Component, OnInit } from '@angular/core'
import { scan, takeWhile, tap, finalize } from 'rxjs/operators'
import { User } from '../../models/user.model'
import { UserApiService } from '../../services/user-api.service'

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {

    public users: User[]

    constructor(private userApiService: UserApiService) {

        // init users array
        this.users = []

        // add 10 users to the array
        const numberOfUsers = 10
        this.userApiService.fetchBatchUsers(numberOfUsers)
            .pipe(
                tap((newUser: User) => this.users.push(newUser)),
                scan((acc: number) => acc + 1, 0),
                takeWhile((usersAdded: number) => usersAdded < numberOfUsers),
                finalize(() => {
                    console.log('this.users', this.users)
                })
            )
            .subscribe()
    }

    ngOnInit(): void {
    }

}
