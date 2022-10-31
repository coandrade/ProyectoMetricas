import { Injectable } from '@nestjs/common';
import { User } from './user';
@Injectable()
export class UserService {
  private users: User[] = [
    new User(1, 'admin', 'admin', ['Read', 'Write', 'Delete']), // Permissions: All
    new User(2, 'user1', 'user1', ['Read']), // Permissions: Get
    new User(2, 'user2', 'user2', ['Write']), // Permissions: Add and Update
    new User(2, 'user3', 'user3', ['Delete']), // Permissions: Delete
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
