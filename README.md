

####Install
`git clone https://github.com/vkz/mode-finder.git`
`cd mode-finder`
`npm install`

You should now be able to do the [Example session](#example-session).

####Use

```shell
bash-3.2$ ./bin/mode-finder -h
util.error: Use console.error instead

Usage:
  mode-finder [OPTIONS] [ARGS]


Options:
  -h, --help : Help
  -o OUTPUT, --output=OUTPUT : Output to file (default: stdout)
  -i INPUT, --input=INPUT : File to check for modes (default: stdin)
```

####Example session

```
bash-3.2$ ls -l test/
total 32
-rw-r--r--  1 kozin  LD\Domain Users  273 Jan 21 20:08 test_no_mode.bemhtml
-rw-r--r--  1 kozin  LD\Domain Users  346 Jan 21 21:12 test_ok1.bemhtml
-rw-r--r--  1 kozin  LD\Domain Users  282 Jan 21 21:18 test_ok2.bemhtml
-rw-r--r--  1 kozin  LD\Domain Users  363 Jan 21 21:12 test_this_mode.bemhtml

bash-3.2$ find . -name '*.bemhtml' | xargs -n1 -L1 -I % ./bin/mode-finder -i %
/Users/kozin/Documents/mode-finder/test/test_no_mode.bemhtml
/Users/kozin/Documents/mode-finder/test/test_this_mode.bemhtml
```

