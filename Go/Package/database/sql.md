> 📄 Usage for specific database is in Root/Go/Driver.
>
> 📄 Basic concept about dabase is in Root/Database.

#### `func Open`

```go
// The detail usage was given by specific driver.
// Open may just validate its arguments without real connection.
func Open(driverName, dataSourceName string) (*DB, error)
```

#### `type DB`

```go
// Set the max time for all connections.
func (db *DB) SetConnMaxLifetime(d time.Duration)

// Set the max time for idle connections.
func (db *DB) SetConnMaxIdleTime(d time.Duration)

// Set the max number for idle connections.
func (db *DB) SetMaxIdleConns(n int)

// Set the max number for open connections.
func (db *DB) SetMaxOpenConns(n int)

// Start a ping test.
func (db *DB) PingContext(ctx context.Context) error

// Exec used for action without fetching data from database.
func (db *DB) ExecContext(ctx context.Context, query string, args ...interface{}) (Result, error)

// Query used for action to fetch data from database.
func (db *DB) QueryContext(ctx context.Context, query string, args ...interface{}) (*Rows, error)

// Prepare the action and wait the args to be provided.
// You need to close the Stmt after finishing your work.
func (db *DB) PrepareContext(ctx context.Context, query string) (*Stmt, error)

// Rollback the database when context was canceled before commit.
// Return error when the driver unsupport your options.
func (db *DB) BeginTx(ctx context.Context, opts *TxOptions) (*Tx, error)

// Stop any new action but not interupt exist action.
func (db *DB) Close() error
```

#### `type NamedArg`

```go
// When args fill by order donesn't satisfy your needs, give them a name instead.
type NamedArg struct {
    Name string
    Value interface{}
}

// Remember: alway use this function to create a NamedArg.
func Named(name string, value interface{}) NamedArg

// If you care about the NULL value in database, use the wrapped null type in sql or driver.
```

#### `type Result`

```go
// Whether support those API according to specific driver.
type Result interface {
	// Get the key generated.
    LastInsertId() (int64, error)
    RowsAffected() (int64, error)
}
```

#### `func Rows`

```go
// Close will stop iteration and be called when iteration finish.
func (rs *Rows) Close() error
// Prepare the next row.
func (rs *Rows) Next() bool
// Return the error raised in iteration.
func (rs *Rows) Err() error
// Scan need address to change data psssed in.
func (rs *Rows) Scan(dest ...interface{}) error
```

#### `type Stmt`

```go
// Fill args to the prepared statement.
func (s *Stmt) QueryContext(ctx context.Context, args ...interface{}) (*Rows, error)
func (s *Stmt) ExecContext(ctx context.Context, args ...interface{}) (Result, error)
```

#### `type IsolationLevel`

```go
type IsolationLevel int

// The isolation levels defined by the ANSI/ISO SQL standard are listed as follows.
const (
	LevelReadUncommitted IsolationLevel = 1
	LevelReadCommitted   IsolationLevel = 2
	LevelWriteCommitted  IsolationLevel = 3
	LevelSerializable    IsolationLevel = 6
)
```

#### `type Tx`

```go
// Operations on the transaction fail with ErrTxDone After call below functions.
func (tx *Tx) Rollback() error
func (tx *Tx) Commit() error

// Wrap an exist Stmt.
func (tx *Tx) StmtContext(ctx context.Context, stmt *Stmt) *Stmt

// Other API have the same usage as DB.
```

