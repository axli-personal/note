### `package bufio`

#### `type Reader`

```go
// ----Structure and New----

type Reader struct {
	buf          []byte
	rd           io.Reader
	r, w         int
	err          error
	lastByte     int
	lastRuneSize int
}


// If rd is strict suitable for your request, then return rd.
// Else a new Reader is create to satisfy your request.
func NewReaderSize(rd io.Reader, size int) *Reader {
    
    // Check if rd is enough.
	b, ok := rd.(*Reader)
	if ok && len(b.buf) >= size {
		return b
	}
    
    // Check if size too small.
	if size < 16 {
		size = 16
	}
    
    // Create a new reader.
	r := new(Reader)
    *r = Reader{
        buf:          make([]byte, size),
		rd:           rd,
		lastByte:     -1,
		lastRuneSize: -1,
	}
	return r
}
```

```go
// ----Method----

// Get the length of the underlying buffer.
func (b *Writer) Size() int { return len(b.buf) }


// Get the number of unread byte in buffer.
func (b *Reader) Buffered() int { return b.w - b.r }


// Reset create reuse current buffer to create a new reader.
func (b *Reader) Reset(r io.Reader) {
    *b = Reader{
		buf:          b.buf,
		rd:           r,
		lastByte:     -1,
		lastRuneSize: -1,
	}
}


// Read data from reader to the destination slice.
func (b *Reader) Read(p []byte) (n int, err error) {
    
    // It will pretend to read and return unhandle error when buffer is empty.
	if len(p) == 0 {
		if b.Buffered() > 0 {
			return 0, nil
        } else {
            return 0, b.readErr()
        }
	}
    
    // It will read from the underlying reader when buffer is empty.
	if b.Buffered() == 0 {
        
        // Check if exist unhandle error
		if b.err != nil {
			return 0, b.readErr()
		}
        
        // Read directly to destination slice when buffer is too small.
		if len(p) >= len(b.buf) {
			n, b.err = b.rd.Read(p)
			if n > 0 {
				b.lastByte = int(p[n-1])
				b.lastRuneSize = -1
			}
			return n, b.readErr()
		}
        
		// Read to buffer.
		b.r = 0
		b.w = 0
		n, b.err = b.rd.Read(b.buf)
		if n == 0 {
			return 0, b.readErr()
		}
		b.w += n
	}

	// Copy from buffer when buffer isn't empty.
	n = copy(p, b.buf[b.r:b.w])
	b.r += n
	b.lastByte = int(b.buf[b.r-1])
	b.lastRuneSize = -1
	return n, nil
}
```

