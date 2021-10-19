# json

#### `func marshal`

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

