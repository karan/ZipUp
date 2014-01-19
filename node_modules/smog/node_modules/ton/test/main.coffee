ton = require '../'
should = require 'should'
require 'mocha'

describe 'ton', ->
  describe 'JSON types', ->
    it 'should be correct', (done) ->
      o =
        test: null
        hi: "string"
        num: 1
        bool: true
        arr: [1, 2, true, null, "hi"]
        empty: {}
        obj: 
          nest: [1, 2, true, null, "hi"]


      str = ton.stringify o
      should.exist str
      str.should.equal JSON.stringify o
      out = ton.parse str
      out.should.eql o
      done()

  describe 'Date', ->
    it 'should be correct', (done) ->
      d = new Date Date.now()
      o = test: d
      str = ton.stringify o
      expected = "{\"test\":new Date(\"#{d.toISOString()}\")}"
      should.exist str
      str.should.equal expected

      out = ton.parse str
      out.should.eql o
      done()

  describe 'RegExp', ->
    it 'should be correct', (done) ->
      o = test: /()/g
      str = ton.stringify o
      expected = '{"test":/()/g}'
      should.exist str
      str.should.equal expected

      out = ton.parse str
      out.test.toString().should.equal o.test.toString()
      done()

  describe 'NaN', ->
    it 'should be correct', (done) ->
      o = test: NaN
      str = ton.stringify o
      expected = '{"test":NaN}'
      should.exist str
      str.should.equal expected

      out = ton.parse str
      isNaN(out.test).should.equal.true
      done()

  describe 'Infinity', ->
    it 'should be correct', (done) ->
      o = test: Infinity
      str = ton.stringify o
      expected = '{"test":Infinity}'
      should.exist str
      str.should.equal expected

      out = ton.parse str
      out.should.eql o
      done()

  describe 'undefined', ->
    it 'should be correct', (done) ->
      o = test: undefined
      str = ton.stringify o
      expected = '{"test":undefined}'
      should.exist str
      str.should.equal expected

      out = ton.parse str
      out.should.eql o
      done()

  describe 'Function', ->
    it 'should be correct', (done) ->
      o = test: (a, b) -> a+b 
      str = ton.stringify o
      should.exist str

      out = ton.parse str
      out.test.toString().should.equal o.test.toString()
      done()