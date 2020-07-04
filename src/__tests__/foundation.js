import {parseError} from '../foundation/index'
const fixtureStack = `TypeError: Error raised
  at bar https://192.168.31.8:8000/c.js:2:9
  at foo https://192.168.31.8:8000/b.js:4:15
  at calc http://192.168.31.8:8000/a.js:4:3
  at <anonymous>:1:11
  at http://192.168.31.8:8000/a.js:22:3
`
const fixtureFirefoxStack = `
  bar@http://192.168.31.8:8000/c.js:2:9
  foo@http://192.168.31.8:8000/b.js:4:15
  calc@http://192.168.31.8:8000/a.js:4:3
  <anonymous>:1:11
  http://192.168.31.8:8000/a.js:22:3
`

test(`accept the error from Firfox, return the format JSON`, () => {
  let message = parseError({stack: fixtureFirefoxStack})
  expect(message.message).toBe('')
  expect(message.stack.length).toBe(4)
  let m = message.stack[0]
  expect(m.line).toBe(2)
  expect(m.column).toBe(9)
  expect(m.filename).toBe('http://192.168.31.8:8000/c.js')
})

test(`accept the error from Chrome, return the format JSON`, () => {
  let message = parseError({stack: fixtureStack})
  expect(message.message).toBe('Error raised')
  expect(message.stack.length).toBe(4)
  let m = message.stack[0]
  expect(m.line).toBe(2)
  expect(m.column).toBe(9)
  expect(m.filename).toBe('https://192.168.31.8:8000/c.js')
})
