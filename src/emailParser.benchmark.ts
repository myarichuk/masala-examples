import {Streams} from '@masala/parser';
import * as Benchmark from 'benchmark';
import {emailParser} from './emailParser';

const suite = new Benchmark.Suite('Email Parser vs. Regex');
const dummyEmail = 'foobar-foo.bar@foobar.com';
const emailRegex =
  /[a-zA-Z][a-zA-Z0-9].+([.-_][a-zA-Z0-9].+)?[a-zA-Z0-9].+@[a-zA-Z]{1,}.[a-zA-Z]{1,}/;

suite
  .add('EmailParser#RegExp', () => {
    emailRegex.test(dummyEmail);
  })
  .add('EmailParser#Masala', () => {
    emailParser.parse(Streams.ofString(dummyEmail));
  })
  .on('cycle', (event: {target: unknown}) => {
    console.log(String(event.target));
  })
  .run();
