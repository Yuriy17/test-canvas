module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
        "extends": [
            "airbnb-base",
            "prettier"
        ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "max-len": [1, 110, 2, { "ignoreComments": true }],
        "camelcase": "warn",
		"linebreak-style": 0,
        "no-underscore-dangle": "off",
    }
};
