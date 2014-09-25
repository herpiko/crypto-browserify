var test = require('tape')
var crypto = require('../')

test('randomBytes', function (t) {
    t.plan(5);
    t.equal(crypto.randomBytes(10).length, 10);
    t.ok(crypto.randomBytes(10) instanceof Buffer);
    crypto.randomBytes(10, function(ex, bytes) {
        t.error(ex);
        t.equal(bytes.length, 10);
        t.ok(bytes instanceof Buffer);
        t.end();
  });
});

test('randomBytes seem random', function (t) {

  var L = 1000
  var b = crypto.randomBytes(L)

  var mean = [].reduce.call(b, function (a, b) { return a + b}, 0) / L

  // test that the random numbers are plausably random.
  // Math.random() will pass this, but this will catch
  // terrible mistakes such as this blunder:
  // https://github.com/dominictarr/crypto-browserify/commit/3267955e1df7edd1680e52aeede9a89506ed2464#commitcomment-7916835

  // this doesn't check that the bytes are in a random *order*
  // but it's better than nothing.

  var expected = 256/2
  var smean = Math.sqrt(mean)

  t.ok(mean < expected + smean)
  t.ok(mean > expected - smean)

  t.end()

})


