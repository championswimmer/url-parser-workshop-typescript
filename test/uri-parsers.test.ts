import { expect } from 'chai';
import { parseScheme, parseAuthority, parsePath } from "../src/uri-parsers";

describe("parseScheme", () => {
  it("should return the scheme and the rest of the URI (with authority)", () => {

    const [scheme, rest] = parseScheme("http://example.com");

    expect(scheme).to.equal("http");
    expect(rest).to.equal("//example.com");

  });

  it("should return the scheme and the rest of the URI (without authority)", () => {

    const [scheme, rest] = parseScheme("mailto:arnav@email.com");

    expect(scheme).to.equal("mailto");
    expect(rest).to.equal("arnav@email.com");

  });

  it("should fail if the URI does not have a scheme", () => {

    expect(() => parseScheme("example.com")).to.throw("Invalid URI: scheme is missing or invalid");

    expect(() => parseScheme("123x://abc.com")).to.throw("Invalid URI: scheme is missing or invalid");

    expect(() => parseScheme("a@b://abc.com")).to.throw("Invalid URI: scheme is missing or invalid");
  });
});

describe("parseAuthority", () => {
  describe("should return the authority and the rest of the URI", () => {
    it("userInfo + host + port", () => {
      const [auth, rest] = parseAuthority("//user:pass@localhost:3000/");

      expect(auth.userInfo).to.equal("user:pass");
      expect(auth.host).to.equal("localhost");
      expect(auth.port).to.equal(3000);
      expect(rest).to.equal("/");
    });

    it("host + port", () => {
      const [auth, rest] = parseAuthority("//localhost:3000/");

      expect(auth.userInfo).to.be.undefined;
      expect(auth.host).to.equal("localhost");
      expect(auth.port).to.equal(3000);
      expect(rest).to.equal("/");
    });

    it("host", () => {
      const [auth, rest] = parseAuthority("//localhost/");

      expect(auth.userInfo).to.be.undefined;
      expect(auth.host).to.equal("localhost");
      expect(auth.port).to.be.undefined;
      expect(rest).to.equal("/");
    });

    it("host (IP)", () => {
      const [auth, rest] = parseAuthority("//192.168.1.1/");

      expect(auth.userInfo).to.be.undefined;
      expect(auth.host).to.equal("192.168.1.1");
      expect(auth.port).to.be.undefined;
      expect(rest).to.equal("/");
    });
  });
});

describe("parsePath", () => {
  describe("should return the path and the rest of the URI", () => {
    it("path + query + fragment", () => {
      const [path, rest] = parsePath("/path/to/resource?query=string#fragment");

      expect(path).to.equal("/path/to/resource");
      expect(rest).to.equal("?query=string#fragment");
    })

    it("path + query", () => {
      const [path, rest] = parsePath("/path/to/resource?query=string");

      expect(path).to.equal("/path/to/resource");
      expect(rest).to.equal("?query=string");
    })

    it("path + fragment", () => {
      const [path, rest] = parsePath("/path/to/resource#fragment");

      expect(path).to.equal("/path/to/resource");
      expect(rest).to.equal("#fragment");
    })

    it("path", () => {
      const [path, rest] = parsePath("/path/to/resource");

      expect(path).to.equal("/path/to/resource");
      expect(rest).to.equal("");
    })
  });

  describe("should fail for invalid query and fragment", () => {
    it ("fragment before query", () => {
      expect(() => parsePath("/path/to/resource#fragment?query=string")).to.throw("Invalid URI: fragment before query");
    })
  })
})