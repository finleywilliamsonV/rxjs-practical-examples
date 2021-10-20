import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { User } from '../models/user.model'
import { UserApiService } from './user-api.service'

@Injectable({
    providedIn: 'root',
})
export class UserStorageService {

    /**
     * Cached storage of requested users
     */
    private readonly userCache: Record<string, User>

    /**
     * Constructs the user storage service
     */
    // eslint-disable-next-line no-unused-vars
    constructor(private userApi: UserApiService) {
        this.userCache = {}
    }

    /**
    * Returns a user from the user cache
    * @param id the id of the user to retrieve
    * @returns An observable of the user data
    */
    getUser(id: string): Observable<User | null> {

        // attempt to retreive from cache
        if (this.userCache[id]) {
            return of(this.userCache[id])
        }

        // fetch user data from endpoint, store, then return
        return this.userApi.fetchNewUser()
            .pipe(
                tap((newUser: User) => {
                    this.userCache[newUser.id] = newUser
                })
            )
    }
}
