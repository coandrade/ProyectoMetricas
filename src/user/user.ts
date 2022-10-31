import { PermissionsGC } from './permissions.enum';

export class User {
  id: number;
  username: string;
  password: string;
  permissions: string[];

  constructor(
    id: number,
    username: string,
    password: string,
    permissions: string[],
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.permissions = <string[]>[];

    const hasRead = () => permissions.some((el) => el == 'Read');
    const hasWrite = () => permissions.some((el) => el == 'Write');
    const hasDelete = () => permissions.some((el) => el == 'Delete');

    if (hasRead()) {
      this.permissions.push(PermissionsGC.GetGC); // Cultura gastronómica
    }

    if (hasWrite()) {
      this.permissions.push(PermissionsGC.Create); // Cultura gastronómica
      this.permissions.push(PermissionsGC.Update); // Cultura gastronómica
    }

    if (hasDelete()) {
      this.permissions.push(PermissionsGC.Delete); // Cultura gastronómica
    }
  }
}
