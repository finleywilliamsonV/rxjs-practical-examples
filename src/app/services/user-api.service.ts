import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map, take, tap } from 'rxjs/operators'
import { User } from '../models/user.model'
import { UserApiResult, UserData } from '../models/user-api-result.model'

@Injectable({
    providedIn: 'root',
})
export class UserApiService {

    private static nextUserId: number = 0

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

        // fetch user data from endpoint and parse
        return this.httpClient.get<UserApiResult>('https://randomuser.me/api/')
            .pipe(
                map(UserApiService.trimUserData),
                take(1)
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
