(function (root, factory) {
  // @ts-ignore
  if (typeof define === 'function' && define.amd) {
    // @ts-ignore
    define([], factory);
    // @ts-ignore
  } else if (typeof module === 'object' && module.exports) {
    // @ts-ignore
    module.exports = factory();
  } else {
    // @ts-ignore
    root.cmoHashNavigation = factory();
  }
}(this, function() {
  'use strict';

  interface IOptions {
    selector: string;
    childSelector: string;
    type: string;
    time: number;
    easing: string;
    cb: () => any
  }

  const easingFunctions: any = {
    linear: function(t:number) { return t; },
    easeInQuad: function(t:number) { return t * t; },
    easeOutQuad: function(t:number) { return t * (2 - t); },
    easeInOutQuad: function(t:number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
    easeInCubic: function(t:number) { return t * t * t; },
    easeOutCubic: function(t:number) { return (--t) * t * t + 1; },
    easeInOutCubic: function(t:number) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
    easeInQuart: function(t:number) { return t * t * t * t; },
    easeOutQuart: function(t:number) { return 1 - (--t) * t * t * t; },
    easeInOutQuart: function(t:number) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
    easeInQuint: function(t:number) { return t * t * t * t * t; },
    easeOutQuint: function(t:number) { return 1 + (--t) * t * t * t * t; },
    easeInOutQuint: function(t:number) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; },
  };
  
  function scrollToPos(nextPos: number, options: IOptions) {
    var currentPos = window.pageYOffset;
    var startTime = window.performance.now();
  
    function scrollAnimation(currentTime: number) {
      const interval = Math.abs(currentTime - startTime);
  
      if (interval <= options.time) {
        const easingFunction = easingFunctions[options.easing](interval / options.time);
        const newPos = Math.ceil(currentPos + ((easingFunction) * (nextPos - currentPos)));
        window.scrollTo(0, newPos);
        window.requestAnimationFrame(scrollAnimation);
      } else {
        window.scrollTo(0, nextPos);
        if (options.cb) options.cb();
      }
    }
  
    window.requestAnimationFrame(scrollAnimation);
  }
  
  function onScrollHandle(linksPosArr:[]) {
    window.addEventListener('scroll', function() {
      var currentPos = window.pageYOffset;
      linksPosArr.forEach(function(linkObj:any) {
        linkObj.linkEl.classList.remove('active');
        if (currentPos >= linkObj.topPos && currentPos < linkObj.bottomPos) {
          linkObj.linkEl.classList.add('active');
        }
      });
    });
  }
  
  function cmoHashNavigation(options: IOptions) {
    const nav: any = document.querySelector(options.selector);

    if(!nav) {
      console.info(`Missing selector: ${options.selector}`);
      return false;
    }    
    
    const links = nav.querySelectorAll(options.childSelector);
    const linksPosArr:any = [];
    const isSelector = options.type === 'select';

    [].forEach.call(links, function(link:any) {    
      const sectionSelector = link.dataset.hash;
      const sectionEl = document.querySelector(sectionSelector);

      if(!sectionEl) {
        console.info(`Missing selector: ${sectionSelector}`);
        return false;        
      }

      const linkEl = link;
      const topPos = sectionEl.offsetTop;
      const bottomPos = topPos + sectionEl.offsetHeight;

      linksPosArr.push({
        linkEl: linkEl,
        sectionEl: sectionEl,
        topPos: topPos,
        bottomPos: bottomPos,
      });

      if (!isSelector) {
        link.addEventListener('click', function() {
          var nextPos = sectionEl.offsetTop;
          scrollToPos(nextPos, options);
        });
      }
    });
  
    if (isSelector) {
      nav.addEventListener('change', function() {
        const sectionSelector = nav.options[nav.selectedIndex].dataset.hash;
        const sectionEl = document.querySelector(sectionSelector);
        const nextPos = sectionEl.offsetTop;
        scrollToPos(nextPos, options);        
      })
    }

    onScrollHandle(linksPosArr);
  }

  return cmoHashNavigation;
}))