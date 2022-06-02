import {C, N, SingleParser, Tuple} from '@masala/parser';

export interface Email {
  username: string;
  domain: string;
  topDomain: string;
}

const username = C.letter()
  .or(N.digit())
  .or(C.charIn('.-_'))
  .rep()
  .map((parsed: Tuple<unknown>) => {
    return parsed.array().join('');
  });

//(very) simple email parser, definitely does not match the full spec :D
//note: full spec is much more complex than this and would require much larger parser
//see https://stackoverflow.com/a/38787343/320103
export const emailParser: SingleParser<Email> = username
  .then(C.char('@').drop())
  .then(C.letters())
  .then(C.char('.').drop())
  .then(C.letters())
  .map((parsed: Tuple<unknown>) => {
    return {
      username: parsed.at(0),
      domain: parsed.at(1),
      topDomain: parsed.at(2),
    } as Email;
  });
