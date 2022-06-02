import {F, C, N} from '@masala/parser';

const number = N.digits();
const string = C.stringLiteral();

//we don't care about parsing the brackets, so drop them from parsing
const openingBracket = C.char('[').drop();
const closingBracket = C.char(']').drop();

const singleValue = F.try(number).or(string); //match either number or string literals
const multipleValues = singleValue.then(C.char(',').drop()).rep();
const multipleOrSingleValues = F.try(multipleValues.then(singleValue)).or(
  singleValue
);

//javascript-style array parser that can accept either numbers or strings
export const arrayParser = F.try(openingBracket.then(closingBracket))
  .or(openingBracket.then(multipleOrSingleValues).then(closingBracket))
  .eos(); //parse till the end of the input stream
