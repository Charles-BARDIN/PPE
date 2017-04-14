export class Admin {
  public id: number;
  public mail: string;

  constructor(admin: {
    id: number,
    mail: string
  }) {
    this.id = admin.id;
    this.mail = admin.mail;
  }
}
