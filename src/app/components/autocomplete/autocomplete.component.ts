import { Component, OnInit } from '@angular/core'
import { Subject } from 'rxjs'
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
    public input$: Subject<string>

    constructor(private userApiService: UserApiService) {

        // init users array
        this.users = []

        // init input subject
        this.input$ = new Subject<string>()

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

    public onInputEvent($event: Event) {
        this.input$.next(($event.target as HTMLInputElement).value)
    }

    /* eslint-disable class-methods-use-this */
    public clearInput() {
        console.log('CLEAR')
        this.input$.next('')
    }
}
