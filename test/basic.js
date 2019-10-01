const JSONStream = require('../')
const t = require('tap')
const origJSONStream = require('JSONStream')

const {resolve, basename} = require('path')
const fixdir = resolve(__dirname, 'fixtures')
const {readdirSync} = require('fs')
const fixtures = readdirSync(fixdir).filter(f => /\.js$/.test(f))
//fixtures.length = 0
//fixtures.push('shallow-values.js')

t.test('run through the fixtures', t => {
  t.plan(fixtures.length)
  t.jobs = fixtures.length

  fixtures.forEach(f => t.test(basename(f, '.js'), t => {
    const {data, path, map} = require(fixdir + '/' + f)
    const stream = JSONStream.parse(path, map)
    const orig = origJSONStream.parse(path, map)
    const output = []
    const headerFooter = {}
    const origOutput = []
    const origHeaderFooter = {}

    stream.on('data', d => output.push(d))
    stream.on('header', h => headerFooter.header = h)
    stream.on('footer', f => headerFooter.footer = f)

    orig.on('data', d => origOutput.push(d))
    orig.on('header', h => origHeaderFooter.header = h)
    orig.on('footer', f => origHeaderFooter.footer = f)

    orig.on('end', () => {
      t.same(output, origOutput)
      t.same(headerFooter, origHeaderFooter)
      t.matchSnapshot(headerFooter)
      t.matchSnapshot(output)
      t.end()
    })

    stream.end(JSON.stringify(data))
    orig.end(JSON.stringify(data))
  }))
})

t.test('bad json emits an error', t => {
  const {JSONStreamError} = JSONStream
  t.throws(() => new JSONStream().end('{:}'), JSONStreamError)
  t.throws(() => new JSONStream().write('{:}'), JSONStreamError)
  const jse = new JSONStreamError(new Error('yolo'))
  t.match(jse, {
    name: 'JSONStreamError',
    message: 'yolo',
  })
  jse.name = 'adsfasdf'
  t.equal(jse.name, 'JSONStreamError')
  t.end()
})

t.test('takes end cb', t => new JSONStream().end(() => t.end()).resume())
t.test('takes end cb with chunk', t => new JSONStream().end('{}', () => t.end()).resume())
t.test('takes a write cb', t => new JSONStream().write(Buffer.from('{}'), () => t.end()))

t.test('only write data', t => {
  t.throws(() => new JSONStream().write({foo:'bar'}), TypeError)
  t.end()
})
