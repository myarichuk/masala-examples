import {C, N, SingleParser, Tuple} from '@masala/parser';

export interface Email {
  username: string;
  domain: string;
  topDomain: string;
}
const letterOrDigit = C.letter().or(N.digit());

//special character must be followed by at least one letter or number
const specialCharacter = C.charIn('.-_').then(letterOrDigit).rep();

const username = letterOrDigit
  .or(specialCharacter)
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
