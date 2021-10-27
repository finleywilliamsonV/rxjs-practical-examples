import {
    delay,
    finalize,
    mergeMap,
    repeat,
    scan,
    takeWhile,
    tap
} from 'rxjs/operators'
import {
    BehaviorSubject,
    Observable,
    of,
    interval
} from 'rxjs'
import { Injectable } from '@angular/core'
import { User } from '../models/user.model'
import { UserApiService } from './user-api.service'

const USE_FAKE_USERS = true

@Injectable({
    providedIn: 'root',
})
export class UserStorageService {

    /**
     * Cached storage of requested users
     */
    private readonly userCache: Record<string, User>

    /**
     * Emits the loaded state of the user cache
     */
    public userCacheLoaded$: BehaviorSubject<boolean>

    /**
     * Constructs the user storage service
     */
    // eslint-disable-next-line no-unused-vars
    constructor(private userApi: UserApiService) {
        this.userCache = {}
        this.userCacheLoaded$ = new BehaviorSubject<boolean>(true)

        this.batchAddUsers(10).subscribe()
    }

    /**
    * Returns a user from the user cache
    * @param id the id of the user to retrieve
    * @returns An observable of the user data
    */
    addNewUser(id?: number): Observable<User> {

        // set this true during development, so the API doesn't freak out
        if (USE_FAKE_USERS) {
            return of({
                gender: 'male',
                name: 'biggs',
                email: 'cat@123.com',
                dob: new Date(),
                id: id ?? -1,
                image: 'http://tiny.cc/pcskuz',
            }).pipe(
                delay(100),
                tap((newUser: User) => {

                    // store the user in the cache
                    this.userCache[newUser.id] = newUser
                })
            )
        }

        // attempt to retreive from cache
        if (id && this.userCache[id]) {
            return of(this.userCache[id])
        }

        // fetch user data from endpoint, then store
        return this.userApi.fetchNewUser()
            .pipe(
                tap((newUser: User) => {
                    this.userCache[newUser.id] = newUser
                })
            )

    }

    /**
     * Builds the user cache with a certain number of users, bypassing the built-in wait
     */
    batchAddUsers(numberOfUsers: number): Observable<User> {

        // emit that the user cache is loading
        this.userCacheLoaded$.next(false)

        // start with an undefined observable
        return interval()
            .pipe(
                takeWhile((userNumber: number) => userNumber < numberOfUsers),
                mergeMap((userId: number) => this.addNewUser(userId)),
                finalize(() => {
                    console.log('this.userCache:', this.userCache)
                    this.userCacheLoaded$.next(true)
                })
            )
    }
}
