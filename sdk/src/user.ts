import axios from 'axios'

import { Account, Device, SDK, Software } from '.'

export class User {
  constructor(
    public readonly username: string,
    public readonly token: string,

    private readonly sdk: SDK
  ) {}

  public async devices(): Promise<Device[]> {
    const data = await this.sdk.get('/user/devices?token=' + this.token)
    const devices = []

    if (!data)
      return []

    for (const device of data)
      devices.push(new Device(device.ID, device.Name, device.Image, this.sdk))

    return devices
  }

  public async addDevice(device: Device): Promise<void> {
    await this.sdk.post('/user/device/add', {
      token: this.token,
      id: device.id
    })
  }

  public async removeDevice(device: Device): Promise<void> {
    await this.sdk.post('/user/device/remove', {
      token: this.token,
      id: device.id
    })
  }

  public async accounts(): Promise<Account[]> {
    const data = await this.sdk.get('/user/accounts?token=' + this.token)
    const accounts = []

    console.log(data)

    if (!data)
      return []

    for (const account of data)
      accounts.push(new Account(account.ID, account.Type, account.Name, account.Value, this.sdk))

    return accounts
  }

  public async addAccount(type: Account['type'], name: Account['name'], value: Account['value']): Promise<Account> {
    const { ID } = await this.sdk.post('/user/account/add', {
      token: this.token,
      type, name, value
    })

    return this.sdk.account(type, ID)
  }

  public async removeAccount(account: Account): Promise<void> {
    await this.sdk.post('/user/account/remove', {
      token: this.token,
      type: account.type,
      id: account.id
    })
  }

  public async software(): Promise<Software[]> {
    const data = await this.sdk.get('/user/software?token=' + this.token)
    const software = []

    if (!data)
      return []

    for (const unit of data)
      software.push(new Software(unit.ID, unit.Type, unit.Name, unit.Version, unit.Image, this.sdk))

    return software
  }

  public async addSoftware(software: Software): Promise<void> {
    await this.sdk.post('/user/software/add', {
      token: this.token,
      id: software.id
    })
  }

  public async removeSoftware(software: Software): Promise<void> {
    await this.sdk.post('/user/software/remove', {
      token: this.token,
      id: software.id
    })
  }

  public save(): User {
    localStorage.setItem('username', this.username)
    localStorage.setItem('token', this.token)

    return this
  }

  public signout(): User {
    localStorage.removeItem('username')
    localStorage.removeItem('token')

    return this
  }
}