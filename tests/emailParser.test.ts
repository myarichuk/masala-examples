import {Streams} from '@masala/parser';
import {emailParser} from '../src/emailParser';

describe('emailParser', () => {
  it.each`
    expr                           | result
    ${'foo@bar.com'}               | ${{username: 'foo', domain: 'bar', topDomain: 'com'}}
    ${'john.doe123@notgoogle.foo'} | ${{username: 'john.doe123', domain: 'notgoogle', topDomain: 'foo'}}
    ${'john-doe@notgoogle.foo'}    | ${{username: 'john-doe', domain: 'notgoogle', topDomain: 'foo'}}
  `("should parse '$expr'", ({expr, result}) => {
    const parsed = emailParser.parse(Streams.ofString(expr));
    expect(parsed.isAccepted()).toBe(true);
    expect(parsed.value).toEqual(result);
  });

  it.each(['foo', 'foo@bar', 'foo@', '@bar', 'bar.com', '@.com'])(
    "should fail parsing '%s'",
    expr => {
      const parsed = emailParser.parse(Streams.ofString(expr));
      expect(parsed.isAccepted()).toBe(false);
    }
  );
});
