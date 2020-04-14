# Simple nodejs key-value http server with TTL support
Used mainly for catching remote iiot devices keepalives.
Expected to run on extreme resources-limited container such as heroku.
Keys not updated in TTL interval will be deleted from keystore.

#### Install
Install prereqs:
```npm install```
#### Usage
Run:
```node index.js```

#### ENV variables:
* PORT (default 5000) // 0 for random unused port
* TTL (default 12000) // 2 minutes
* DEBUG (default 0) // no debug messages in console
* BIND (default 127.0.0.1) // bind to localhost
* MAXSIZE (default 100) // keeping last 100 keys in memory, 0 for unlimited

#### Run with parameters:
```PORT=1234 TTL=60000 DEBUG=1 BIND=0.0.0.0 MAXSIZE=200 node index.js```

#### Set key to value
* HTTP GET /?key=value
#### Get key value:
* HTTP GET /?key

Originally written by Ivan Void, modded by @hackruu:
addded TTL, DEBUG, BIND, MAXSIZE options.
