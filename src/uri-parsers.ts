
export function parseScheme(originalUri: string): [string, string] {
  
  const scheme = originalUri.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/);
  
  if (!scheme) {
    throw new Error('Invalid URI: scheme is missing');
  }
  return [scheme[1], originalUri.slice(scheme[0].length)];
}