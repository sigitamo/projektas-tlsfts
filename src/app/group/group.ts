import { User } from '../user/user';

export class Group {
    name: string;
    index: number;
    members: number;
    usernames: String[]; 
    constructor(name: string, index: number, members: number, usernames: String[]) {
        this.name = name;
        this.index = index;
        this.members = members;
        this.usernames = usernames;
    }
}