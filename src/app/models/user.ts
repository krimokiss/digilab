import { Room } from './room';
import { Message } from './message';
export class User {

    username!: string
    firstName!: string
    lastName!: string
    avatar!: string
    token!: string
    readonly _id?: string
    password?: string
    email?: string
    roomsID?: Room[]
    sentMessagesID?: Message[]
    receivedMessagesID?: Message[]
    isLoggedIn?: boolean
    country?: string
    city?: string
    street?: string
    zipCode?: number
    phoneNumber?: string
    dialCode?: string
    skills?: string[]
    role?: string
    friendsID?: User[]

}
