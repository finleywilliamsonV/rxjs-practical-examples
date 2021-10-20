export interface UserName {
    title: string
    first: string
    last: string
}

export interface UserStreet {
    number: number
    name: string
}

export interface UserCoordinates {
    latitude: string
    longitude: string
}

export interface UserTimezone {
    offset: string
    description: string
}

export interface UserLocation {
    street: UserStreet
    city: string
    state: string
    country: string
    postcode: number
    coordinates: UserCoordinates
    timezone: UserTimezone
}

export interface UserLogin {
    uuid: string
    username: string
    password: string
    salt: string
    md5: string
    sha1: string
    sha256: string
}

export interface UserDob {
    date: string
    age: number
}

export interface UserRegistered {
    date: string
    age: number
}

export interface UserId {
    name: string
    value: string
}

export interface UserPicture {
    large: string
    medium: string
    thumbnail: string
}

export interface UserData {
    gender: string
    name: UserName
    location: Location
    email: string
    login: UserLogin
    dob: UserDob
    registered: UserRegistered
    phone: string
    cell: string
    id: UserId
    picture: UserPicture
    nat: string
}

export interface UserInfo {
    seed: string
    results: number
    page: number
    version: string
}

export interface UserApiResult {
    results: UserData[]
    info: UserInfo
}
