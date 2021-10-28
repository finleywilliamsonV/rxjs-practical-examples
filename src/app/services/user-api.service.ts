import {
    delay,
    map,
    mergeMap,
    take,
    takeWhile
} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { interval, Observable, of } from 'rxjs'
import { User } from '../models/user.model'
import { UserApiResult, UserData } from '../models/user-api-result.model'
import { getPlaceholderUser } from '../models/user.functions'

const USE_PLACEHOLDER_USERS = true
@Injectable({
    providedIn: 'root',
})
export class UserApiService {

    private static nextUserId = 0

    /**
     * Constructs the Users Service
     * @param httpClient
     */
    // eslint-disable-next-line no-unused-vars
    constructor(private httpClient: HttpClient) { }

    /**
     * Fetches a user from the API
     * @returns An observable of the trimmed user data
     */
    fetchNewUser(): Observable<User> {

        // set this true during development, so we don't overload the API
        if (USE_PLACEHOLDER_USERS) {
            return of(getPlaceholderUser())
                .pipe(
                    // built-in delay
                    delay(100)
                )
        }

        // fetch user data from endpoint and parse
        return this.httpClient.get<UserApiResult>('https://randomuser.me/api/')
            .pipe(
                map(UserApiService.trimUserData),
                take(1)
            )
    }

    /**
     * Fetches a batch of users and emits the requests in a stream
     * @returns An observable of the fetched users
     */
    fetchBatchUsers(numberOfUsers: number): Observable<User> {
        return interval()
            .pipe(
                takeWhile((userNumber: number) => userNumber < numberOfUsers),
                mergeMap(() => this.fetchNewUser())
            )
    }

    /**
     * Parses User API data into a User
     * @param apiResult Result from the User API endpoint
     * @returns The parsed user data
     */
    private static trimUserData(apiResult: UserApiResult): User {
        const userData: UserData = apiResult.results[0]
        return {
            gender: userData.gender,
            name: `${userData.name.title} ${userData.name.first} ${userData.name.last}`,
            email: userData.email,
            dob: new Date(userData.dob.date),
            id: UserApiService.nextUserId++,
            image: userData.picture.large,
        } as User
    }
}
