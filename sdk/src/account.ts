import { SDK, Vulnerability } from '.'

export class Account {
  constructor(
    public readonly id: number,
    public readonly type: Account.Type,
    public readonly name: string,
    public readonly value: string,

    private readonly sdk: SDK
  ) {}

  public async update(): Promise<void> {
    await this.sdk.post('/account/edit', {
      id: this.id,
      type: this.type,
      name: this.name,
      value: this.value
    })
  }

  public async vulnerabilities(): Promise<number> {
    const data = await this.sdk.get('/account/vulnerabilities?id=' + this.id + '&type=' + this.type)
    return data.Breaches
  }
}

export namespace Account {
  export enum Type {
    Email = 'email',
    Password = 'password'
  }
}