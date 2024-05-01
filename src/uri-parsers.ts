import { Authority } from './uri';

export function parseScheme(originalUri: string): [string, string] {
  
  const scheme = originalUri.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/);
  
  if (!scheme) {
    throw new Error('Invalid URI: scheme is missing or invalid');
  }
  return [scheme[1], originalUri.slice(scheme[0].length)];
}

export function parseAuthority(uriWithoutScheme: string): [Authority, string] {
  if (!uriWithoutScheme.startsWith("//")) {
    throw new Error('Invalid URI: authority string is invalid');
  }
  uriWithoutScheme = uriWithoutScheme.slice(2);
  const indexOfAt = uriWithoutScheme.indexOf('@');
  const indexOfColon = uriWithoutScheme.indexOf(':', indexOfAt);
  const indexOfSlash = uriWithoutScheme.indexOf('/');

  const authority: Authority = {
    userInfo: undefined,
    host: '',
    port: undefined
  }

  if (indexOfAt !== -1) {
    authority.userInfo = uriWithoutScheme.slice(0, indexOfAt);
  }

  if (indexOfColon !== -1) {
    authority.host = uriWithoutScheme.slice(indexOfAt + 1, indexOfColon);
    authority.port = parseInt(uriWithoutScheme.slice(indexOfColon + 1, indexOfSlash));
  } else {
    authority.host = uriWithoutScheme.slice(indexOfAt + 1, indexOfSlash);
  }

  const rest = uriWithoutScheme.slice(indexOfSlash);

  console.log(authority, rest);

  return [authority, rest];

}

export function parsePath(uriWithoutAuthority: string): [string, string] {
  const indexOfQuestion = uriWithoutAuthority.indexOf('?');
  const indexOfHash = uriWithoutAuthority.indexOf('#');

  if (indexOfHash !== -1 && indexOfHash < indexOfQuestion) {
    throw new Error("Invalid URI: fragment before query")
  }

  if (indexOfQuestion === -1) {
    if (indexOfHash === -1) {
      return [uriWithoutAuthority, ''];
    }
    return [uriWithoutAuthority.slice(0, indexOfHash), uriWithoutAuthority.slice(indexOfHash)];
  } else {
    return [uriWithoutAuthority.slice(0, indexOfQuestion), uriWithoutAuthority.slice(indexOfQuestion)];
  }
}