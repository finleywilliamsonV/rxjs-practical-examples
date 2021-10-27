import { User } from './user.model'

export const getPlaceholderUser: () => User = (
    () => {
        let placeholderId = 0

        return (): User => ({
            gender: 'male',
            name: 'biggs',
            email: 'cat@123.com',
            dob: new Date(),
            id: placeholderId++,
            image: 'http://tiny.cc/pcskuz',
        })
    }
)()
