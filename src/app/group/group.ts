import { User } from '../user/user';

export class Group {
    name: string;
    index: number;
    members: number;
    usernames: User[]; 
    constructor(name: string, index: number, members: number, usernames: User[]) {
        this.name = name;
        this.index = index;
        this.members = members;
        this.usernames = usernames;
    }
}