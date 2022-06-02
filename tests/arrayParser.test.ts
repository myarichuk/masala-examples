import {Streams} from '@masala/parser';
import {arrayParser} from '../src/arrayParser';

describe('arrayParser', () => {
  it.each`
    expr                 | result
    ${'[]'}              | ${[]}
    ${'[123]'}           | ${[123]}
    ${'[1,2,3]'}         | ${[1, 2, 3]}
    ${'["aa",23,"bbb"]'} | ${['aa', 23, 'bbb']}
  `("should parse '$expr'", ({expr, result}) => {
    const parsed = arrayParser.parse(Streams.ofString(expr));
    expect(parsed.isAccepted()).toBe(true);
    expect(parsed.value.array()).toEqual(result);
  });

  it.each(['[123', '1,2,3]', '["aa",,23,"bbb"]', '[', '[[]', '[]]'])(
    "should fail parsing '%s'",
    expr => {
      const parsed = arrayParser.parse(Streams.ofString(expr));
      expect(parsed.isAccepted()).toBe(false);
    }
  );
});
