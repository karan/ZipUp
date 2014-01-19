![status](https://secure.travis-ci.org/wearefractal/ton.png?branch=master)

## Information

<table>
<tr> 
<td>Package</td><td>ton</td>
</tr>
<tr>
<td>Description</td>
<td>Typed Object Notation</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.4</td>
</tr>
</table>

## Prefix

JSON supports 6 types - Number, String, Boolean, Array, Object, and null. Wouldn't it be nice if you could define your own types? Why be limited to 6 types? ObjectIDs, KoolKlass10, Integer32, you name it - adding your own types is a breeze.

## Usage

```coffee-script
ton = require 'ton'
obj =
  d: new Date('1/9/1979')
  i: Infinity
  x: NaN
  w: "test"
  a: true

str = ton.stringify obj
ton.parse str
```

## Types supported

These are included by default in ton:

```
Number
String
Boolean
Array
Object
null
undefined
Date
RegExp
Function
NaN
Infinity
```

### Adding types

```coffee-script
# Your function either returns a value or undefined
# If it returns a value that will be used in the stringify/parse process
# Your output should be valid javascript
ton.add 'CoolType', (val) -> "new CoolType(#{val.name})" if val instanceof CoolType

# Now this will work
str = ton.stringify test: new CoolType("tom")
# str === {"test":new CoolType("tom")}
```

### Removing types

```coffee-script
# All of the built-in types can be removed as well
ton.remove 'CoolType'
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
