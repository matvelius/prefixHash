const { exit } = require('process');
let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lineIndex = 0
let a = 0 // base
let m = 0 // modulo
let s = "" // string
let t = 0 // number of substings to calculate hash for
let ranges = []

rl.on('line', function (line) {

  if (lineIndex == 0) {

    a = parseInt(line)

  } else if (lineIndex == 1) {

    m = parseInt(line)

  } else if (lineIndex == 2) {

    s = line

  } else if (lineIndex == 3) {

    t = parseInt(line)

  } else {

    ranges.push(line.split(" "))
    // ... some kind of an initial calculation to help with efficiency ...

    if (ranges.length == t) {
      ranges.forEach(range => {
        console.log(hash(s.substring(range[0] - 1, range[1])))
      })

      rl.close()
      exit(0)
    }

  }

  lineIndex += 1

})

function hash(s) {
  const sLength = s.length
  let hashValue = 0
  let previousHashValue = 0

  for (let i = 0; i < sLength; i++) {
    if (i < sLength - 1) {
      hashValue = (hashValue + s.charCodeAt(i)) * a % m
    } else {
      hashValue = (hashValue + s.charCodeAt(i)) % m
    }
  }

  return hashValue
}