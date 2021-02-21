import { SDK, Vulnerability } from '.'

export class Software {
  constructor(
    public readonly id: number,
    public readonly type: Software.Type,
    public readonly name: string,
    public readonly version: string,
    public readonly image: string,

    private readonly sdk: SDK
  ) {}

  public async vulnerabilities(): Promise<Vulnerability[]> {
    const data = await this.sdk.get('/software/vulnerabilities?id=' + this.id)

    const vulnerabilities = []

    for (const vulnerability of data)
      vulnerabilities.push(new Vulnerability(vulnerability.ID, vulnerability.Name, vulnerability.Description, vulnerability.Severity, this.sdk))

    return vulnerabilities
  }
}

export namespace Software {
  export enum Type {
    Software = 'software',
    Service = 'service'
  }
}