ton = require 'ton'
require '../'
should = require 'should'
require 'mocha'

doc =
  _id: new ObjectID("4fa202c54cc3da640c000001")
  string: "test"
  regex: /test/
  int: 42
  float: 33.3333
  bool: true
  code: new Code('console.log(i);', {i:1})
  long: Long.fromNumber 20
  binary: new Binary new Buffer "test"
  minkey: new MinKey
  maxkey: new MaxKey
  double: new Double 100
  ref: new DBRef('space', new ObjectID("4fa202c54cc3da640c000002"), 'stuff')
  arr: [1, 2, 3]

describe 'mongo-ton', ->
  describe 'stringify()', ->
    it 'should work', (done) ->
      str = ton.stringify doc
      should.exist str
      str.should.equal '{"_id":new ObjectID("4fa202c54cc3da640c000001"),"string":"test","regex":/test/,"int":42,"float":33.3333,"bool":true,"code":new Code("console.log(i);", {"i":1}),"long":new Long(20, 0),"binary":new Binary(new Buffer("test"), "0"),"minkey":new MinKey(),"maxkey":new MaxKey(),"double":new Double(100),"ref":new DBRef("space", new ObjectID("4fa202c54cc3da640c000002"), "stuff"),"arr":[1,2,3]}'
      done()

  describe 'parse()', ->
    it 'should work', (done) ->
      str = ton.stringify doc
      should.exist str
      ndoc = ton.parse str
      should.exist ndoc
      done()