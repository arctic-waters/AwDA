import axios from 'axios'

import { Device, Software, User, Account } from '.'

export class SDK {
  constructor(
    public readonly url: string
  ) {}

  public async login(username: string, password: string): Promise<User> {
    return new User(username, (await this.post('/auth/login', { username, password })).Token, this)
  }

  public async signup(username: string, password: string): Promise<User> {
    await this.post('/auth/signup', { username, password })
    return this.login(username, password)
  }

  public load(): User | undefined {
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')

    if (!username || !token)
      return

    return new User(username, token, this)
  }

  public async devices(): Promise<Device[]> {
    const data = await this.get('/devices')
    const devices = []

    for (const device of data)
      devices.push(new Device(device.ID, device.Name, device.Image, this))

    return devices
  }

  public async device(id: number): Promise<Device> {
    const data = await this.get('/device?id=' + id)
    return new Device(data.ID, data.Name, data.Image, this)
  }

  public async allSoftware(): Promise<Software[]> {
    const data = await this.get('/software/all')
    const software = []

    for (const unit of data)
      software.push(new Software(unit.ID, unit.Type, unit.Name, unit.Version, unit.Image, this))

    return software
  }

  public async software(id: number): Promise<Software> {
    const data = await this.get('/software?id=' + id)
    return new Software(data.ID, data.Type, data.Name, data.Version, data.Image, this)
  }

  public async account(type: Account['type'], id: number): Promise<Account> {
    const data = await this.get(`/account?type=${type}&id=${id}`)
    return new Account(data.ID, data.Email ? Account.Type.Email : Account.Type.Password, data.Name, data.Email ? data.Email : data.Hash, this)
  }

  public async get(path: string): Promise<any> {
    const result = await axios.get(this.url + path)

    if (result.status != 200)
      throw new Error('Error fetching data')

    return result.data
  }

  public async post(path: string, data: any = undefined): Promise<any> {
    const result = await axios.post(this.url + path, data)

    if (result.status != 200)
      throw new Error('Error fetching data')

    return result.data
  }
}
