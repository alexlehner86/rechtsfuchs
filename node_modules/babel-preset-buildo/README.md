# babel-preset-buildo

> A babel preset that groups *babel plugins* and *presets* used at buildo.

## Installation

`npm install --save-dev babel-preset-buildo`

## Usage

```json
{
  "presets": ["buildo"]
}
```



## Options

The preset accepts options:

```json
{
  "presets": [
    ["buildo", {
      "env": "react",
      "targets": {
        "chrome": 52,
        "node": 4
      }
    }]
  ]
}
```

`env`: Available environments are `react` and `node`. The default is `node`.

The other options should be `babel-preset-env`'s [options](https://github.com/babel/babel-preset-env/blob/master/README.md#options).
