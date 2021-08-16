const { exit } = require('process');
let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lineIndex = 0

let q = 0 // base
let m = 0 // modulo
let s = "" // string
let t = 0 // number of substings to calculate hash for
let ranges = []

let powersOfQ = []
let hashes = new Map()

rl.on('line', function (line) {
  if (lineIndex == 0) {
    q = parseInt(line)
  } else if (lineIndex == 1) {
    m = parseInt(line)
  } else if (lineIndex == 2) {
    calculateHashes(line)
    calculatePowersOfQ(line.length)
  } else if (lineIndex == 3) {
    t = parseInt(line)
  } else if (lineIndex < 3 + t) {
    ranges.push(line.split(" ").map(num => num * 1)) 
  } else {
    ranges.push(line.split(" ").map(num => num * 1))
    rl.close()
  }

  lineIndex += 1
})

rl.on('close', function () {
  for (const range of ranges) {
    console.log(prefixHash(range[0], range[1]))
  }
})

//// Magic formula:  H[k, l] = H[0, l] - H[0, k - 1] * q ^ ([l - k)

function prefixHash(k, l) {
  const hashZeroToL = modulo(hashes.get(l), m)

  if (k == 1) {
    return hashZeroToL
  }

  const hashZeroToKMinusOne = k == 1 ? 0 : modulo(hashes.get(k - 1), m)
  const qToPowerOfLengthOfSubstring = modulo(powersOfQ[l - k + 1], m)

  const result = modulo((hashZeroToL + m - (hashZeroToKMinusOne * qToPowerOfLengthOfSubstring)), m)

  return result
}

function calculatePowersOfQ(stringLength) {
  powersOfQ = new Array(stringLength + 1)
  powersOfQ[0] = 1

  for (let i = 1; i <= stringLength; i++) {
    powersOfQ[i] = modulo(powersOfQ[i - 1] * q, m)
  }
}

function calculateHashes(string) {
  const hash1 = string.charCodeAt(0) // first character 
  hashes.set(1, hash1)

  for (let l = 2; l <= string.length; l++) {
    const previousHash = hashes.get(l - 1)
    const newHash = modulo(previousHash * q + string.charCodeAt(l - 1), m)
    hashes.set(l, newHash)
  }

}

// proper a mod n
function modulo(a, n) {
  return ((a % n ) + n ) % n
}

// TESTING

// q = 1000
// m = 1000009
// s = "abcdefgh"
// t = 7

// ranges = [
//   [1, 1],
//   [1, 5],
//   [2, 3],
//   [3, 4],
//   [4, 4],
//   [1, 8],
//   [5, 8]
// ]

// calculatePowersOfQ(s.length)

// calculateHashes(s)

// for (let i = 0; i < t; i++) {
//   let range = ranges[i]
//   console.log("range:", range)
//   console.log(prefixHash(range[0], range[1]))
// }