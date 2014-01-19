![status](https://secure.travis-ci.org/wearefractal/mongo-ton.png?branch=master)

## Information

<table>
<tr> 
<td>Package</td><td>mongo-ton</td>
</tr>
<tr>
<td>Description</td>
<td>MongoDB native types for ton</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.4</td>
</tr>
</table>

This is identical to bson-ton but uses node-mongodb-native types which differ slightly.

## Usage

```coffee-script
ton = require 'ton'
require 'mongo-ton'

str = ton.stringify {bson doc}
doc = ton.parse str
```

## Comparison

### Initial document

```javascript
{
    _id: new ObjectID("4fa202c54cc3da640c000001"),
    string: "test",
    regex: /test/,
    date: new Date('1/2/1978'),
    int: 42,
    float: 33.3333,
    bool: true,
    code: new Code('console.log(i);', {
        i: 1
    }),
    long: Long.fromNumber(20),
    binary: new Binary(new Buffer("test")),
    minkey: new MinKey,
    maxkey: new MaxKey,
    double: new Double(100),
    ref: new DBRef('space', new ObjectID("4fa202c54cc3da640c000002"), 'stuff'),
    arr: [1, 2, 3]
}
```

### ton.stringify

All types and data preserved.

```javascript
{
    "_id": new ObjectID("4fa202c54cc3da640c000001"),
    "string": "test",
    "regex": /test/,
    "date": new Date("1978-01-02T07:00:00.000Z"),
    "int": 42,
    "float": 33.3333,
    "bool": true,
    "code": new Code("console.log(i);", {
        "i": 1
    }),
    "long": new Long(20, 0),
    "binary": new Binary(new Buffer("test"), "0"),
    "minkey": new MinKey(),
    "maxkey": new MaxKey(),
    "double": new Double(100),
    "ref": new DBRef("space", new ObjectID("4fa202c54cc3da640c000002"), "stuff"),
    "arr": [1, 2, 3]
}
```

### JSON.stringify

All types and some data lost - you would have to reconstruct this manually.

```javascript
{
    "_id": "4fa202c54cc3da640c000001",
    "string": "test",
    "regex": {},
    "date": "1978-01-02T07:00:00.000Z",
    "int": 42,
    "float": 33.3333,
    "bool": true,
    "code": {
        "scope": {
            "i": 1
        },
        "code": "console.log(i);"
    },
    "long": "20",
    "binary": "dGVzdA==",
    "minkey": {
        "_bsontype": "MinKey"
    },
    "maxkey": {
        "_bsontype": "MaxKey"
    },
    "double": 100,
    "ref": {
        "$ref": "space",
        "$id": "4fa202c54cc3da640c000002",
        "$db": "stuff"
    },
    "arr": [1, 2, 3]
}
```

## LICENSE

(MIT License)

Copyright (c) 2012 Fractal <contact@wearefractal.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
