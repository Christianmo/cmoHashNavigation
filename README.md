## CMO Hash Navigation

Small library to handle scroll navigation on one page websites

### Install
```
npm i cmohashnavigation
```

```javascript
import cmoHashNavigation from 'cmohashnavigation';
```

### Setting

```javascript
  cmoHashNavigation({
    selector: '.nav',
    childSelector: '.hash-link',
    time: 2000,
    easing: 'easeInOutQuad',
    cb: () => console.log("animation finished"),
  });    

  cmoHashNavigation({
    selector: '.options',
    childSelector: '.option-link',
    type: 'select',
    time: 2000,
    easing: 'easeInOutQuad',
    cb: () => console.log("animation finished"),
  });
```

### Options

Option | Type | Default | Description
------ | ---- | ------- | -----------
selector | string | null | the selector, it could be a class, id, or tagname
childSelector | string | null | the child selector, it could be a class, id, or tagname
type | string | null | if is 'select', it will handle as select field
time | integer | null | the animation duration
cb | function | null | callback to execute when animation finish
easing | string | null | could be one of these easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic, easeInOutCubic, easeInQuart, easeOutQuart, aseInOutQuart, easeInQuint, easeOutQuint, easeInOutQuint.

### Demo

For more details see [the proyect website](https://christianmo.github.io/cmoHashNavigation/).