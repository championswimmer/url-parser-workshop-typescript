import { assert } from 'chai';
import { URI } from '../src/uri';



describe('URI', () => {
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