# Encoding

计算机之间经常需要进行通信并交换数据, 而这就需要对结构化的数据进行编码和解码.

编码和解码往往都参照事先制定好的规范(需综合考虑传输数据量, 传输信息量和通用性).

额外传输类型信息可以增强规范通用性, 但没有一个规范都能够处理所有类型的数据.

## JSON

### 特点

支持类型: bool, number, string, array, object and null.

JSON缺点: 不区分number类型, 浮点数精度可能不理想, 不支持有环结构, 传输数据量大.

JSON优点: 文本格式带来的可读性, 简单的形式可以支持大量的类型.

### 表示

* `[]byte`: base64 string.
* `map[string][any]`：object.
* `channel`, `complex`, `function`: raise error.
* `cyclic type`: infinite recursion.

### API

#### Marshal

```go
// Convert to json string.
func Marshal(v interface{}) ([]byte, error)

// Beautify the output.
func MarshalIndent(v interface{}, prefix, indent string) ([]byte, error)

// Specail: Type []byte will be convert to base64 string.
// Special: Anonymous struct's fields will be treated as fields in the outer struct.

// Three type of tags. I use '[]' for optional arg and '<>' for required arg.
// 1) `json:"name"`
// 2) `json:"[name],<<omitempty|string>|omitempty,string>"
// 3) `json:"-"`

// Note: Take care of usage of ',' above.
// Note: 'omitempty' mean omit default value when convert.
// Note: 'string' only use for intger, float and bool field.
```

#### Encoder and Decoder

Encoder can encode a value and pass it to a writer followed by a newline character.

Decoder does the reverse; the decode process will be complex, so it has more options.

## Go Binary

Go Binary is a encode and decode standard only in go language.

## [Base64](https://www.rfc-editor.org/rfc/rfc8259.html)

One upon a time, transmitting 8-bit data was problematic due to noisy.

And transmitting 7-bit ASCII format is more reliable because of the **check bit**.

By the way, you can inspect ASCII format data just through a text editor.

So there are many standard helping you transform the 8-bit data into ASCII, such as Base64.

Go supports this through package `encoding/base64` with a much similar interface.
