# MySQL

> 📄 Introduction is based on the https://github.com/go-sql-driver/mysql project.

#### `type Config`

```go
// It can represent a Data Source Name(DSN).
type Config struct {
	User             string
	Passwd           string
	Net              string // Lowercase 'tcp' or 'udp'.
	Addr             string // Ip address or domain.
	DBName           string
	Params           map[string]string
	Collation        string
	Loc              *time.Location
	MaxAllowedPacket int
	ServerPubKey     string
	pubKey           *rsa.PublicKey
	TLSConfig        string
	tls              *tls.Config
	Timeout          time.Duration
	ReadTimeout      time.Duration
	WriteTimeout     time.Duration

	AllowAllFiles           bool
	AllowCleartextPasswords bool
	AllowNativePasswords    bool
	AllowOldPasswords       bool
	CheckConnLiveness       bool
	ClientFoundRows         bool
	ColumnsWithAlias        bool
	InterpolateParams       bool
	MultiStatements         bool
	ParseTime               bool
	RejectReadOnly          bool
}

// Always used this to init a config, because of the useful default setting.
// Such as AllowNativePasswords set to false will raise error in native connect user.
// Error info: Could not use requested auth plugin 'mysql_native_password'.
func NewConfig() *Config {
	return &Config{
		Collation:            defaultCollation,
		Loc:                  time.UTC,
		MaxAllowedPacket:     defaultMaxAllowedPacket,
		AllowNativePasswords: true,
		CheckConnLiveness:    true,
	}
}
```

