import { Room } from './room';
import { User } from './user';
export class Message {
    readonly _id?: string
    usersID?: User[]
    rommID?: Room[]
    friendID?: User[]
    date?: Date
    content?: string
}
