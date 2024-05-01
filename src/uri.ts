
export interface Authority {
  userInfo: string | undefined;
  host: string;
  port: number | undefined;
}
export class URI {
  scheme: string;
  authority: Authority | undefined;
  path: string;
  query: { [key: string]: string | Array<string>; };
  fragment: { [key: string]: string; };

  constructor(scheme: string, authority: Authority | null | undefined, path: string, query?: { [key: string]: any; }, fragment?: { [key: string]: string; }) {
    this.scheme = scheme;
    this.authority = authority ?? undefined;
    this.path = path;
    this.query = query ?? {};
    this.fragment = fragment ?? {};
  }

  toString() {
    let uri = `${this.scheme}:`;
    if (this.authority) {
      uri += `//`;
      if (this.authority.userInfo) {
        uri += `${this.authority.userInfo}@`;
      }
      uri += this.authority.host;
      if (this.authority.port) {
        uri += `:${this.authority.port}`;
      }
    }
    uri += this.path;
    if (Object.keys(this.query).length > 0) {
      // TODO: handle joining array values
      uri += `?${Object.entries(this.query).map(([k, v]) => `${k}=${v}`).join('&')}`;
    }
    if (Object.keys(this.fragment).length > 0) {
      uri += `#${Object.entries(this.fragment).map(([k, v]) => `${k}=${v}`).join('&')}`;
    }
    return uri;
  }

  static parse(uri: string): URI {
    // 1. Parse and find out scheme 

    // 2. If scheme.hasAuthority is true, parse authority
    //    If scheme.hasAuthority is false, error out if authority is present

    // 3. Parse path

    // 4. Parse query

    // 5. Parse fragment
  }
}

