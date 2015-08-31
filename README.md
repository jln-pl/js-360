# js-360

> It is a 360° viewer for products. Made with [RxJS](https://github.com/Reactive-Extensions/RxJS) and EcmaScript 6.

This library adds `JS360.generate360view(...)` function as `window` property. Now you can rotate your product!

Works with a mouse or touch devices. 

## Installation

```sh
npm install js-360
```

## Usage

You can find usage example in "demo" folder.

* Add library to your html file:

```html
<script src="js360.min.js"></script>
```

* create container with images inside

```html
<div id="container-id">
    <img src="...">
    <img src="...">
    ...
    <img src="...">
</div>
```

* use library

```js
JS360.generate360view('container-id');
```
### Browserify

With [Browserify](http://browserify.org/) it's enough to do the following

```js
var js360 = require('js-360');

js360.generate360view('container-id');
```

## License

MIT
