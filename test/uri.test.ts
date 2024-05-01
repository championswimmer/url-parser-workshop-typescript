import { assert } from 'chai';
import { URI } from '../src/uri';



describe('URI builder', () => {
  it('can form a URI with authority, path, query and fragment', () => {
    const uri1 = new URI(
      "https",
      {
        userInfo: undefined,
        host: "example.com",
        port: 443,
      },
      "/path",
      { q: ["a"] },
      { y: "aaa" }
    )
    assert.equal(uri1.toString(), "https://example.com:443/path?q=a#y=aaa")
  })
})

describe('URI parser', () => {
  it('can form a URI object given string', () => {
    const uri = URI.parse("https://example.com:443/path?q=a#y=aaa")
    assert.equal(uri.scheme, "https")
    assert.equal(uri.authority?.host, "example.com")
    assert.equal(uri.authority?.port, 443)
    assert.equal(uri.path, "/path")
  })
})