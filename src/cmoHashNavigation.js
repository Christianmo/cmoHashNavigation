(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.cmoHashNavigation = factory();
  }
}(this, function() {
  'use strict';
  var easingFunctions = {
    linear: function(t) { return t; },
    easeInQuad: function(t) { return t * t; },
    easeOutQuad: function(t) { return t * (2 - t); },
    easeInOutQuad: function(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
    easeInCubic: function(t) { return t * t * t; },
    easeOutCubic: function(t) { return (--t) * t * t + 1; },
    easeInOutCubic: function(t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
    easeInQuart: function(t) { return t * t * t * t; },
    easeOutQuart: function(t) { return 1 - (--t) * t * t * t; },
    easeInOutQuart: function(t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
    easeInQuint: function(t) { return t * t * t * t * t; },
    easeOutQuint: function(t) { return 1 + (--t) * t * t * t * t; },
    easeInOutQuint: function(t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; },
  };
  
  function scrollToPos(nextPos, options) {
    var currentPos = window.pageYOffset;
    var startTime = window.performance.now();
  
    function scrollAnimation(currentTime) {
      var interval = Math.abs(currentTime - startTime);
  
      if (interval <= options.time) {
        var easingFunction = easingFunctions[options.easing](interval / options.time);
        var newPos = Math.ceil(currentPos + ((easingFunction) * (nextPos - currentPos)));
        window.scrollTo(0, newPos);
        window.requestAnimationFrame(scrollAnimation);
      } else {
        window.scrollTo(0, nextPos);
      }
    }
  
    window.requestAnimationFrame(scrollAnimation);
  }
  
  function onScrollHandle(linksPosArr) {
    window.addEventListener('scroll', function() {
      var currentPos = window.pageYOffset;
      linksPosArr.forEach(function(linkObj) {
        linkObj.linkEl.classList.remove('active');
        if (currentPos >= linkObj.topPos && currentPos < linkObj.bottomPos) {
          linkObj.linkEl.classList.add('active');
        }
      });
    });
  }
  
  function cmoHashNavigation(options) {
    var nav = document.querySelector(options.selector);
    var links = nav.querySelectorAll('a');
    var linksPosArr = [];
  
    [].forEach.call(links, function(link) {
      var section = link.getAttribute('href');
      if (section[0] === '#') {
        var sectionEl = document.querySelector(section);
        var linkEl = link;
        var topPos = sectionEl.offsetTop;
        var bottomPos = topPos + sectionEl.offsetHeight;
  
        linksPosArr.push({
          linkEl: linkEl, sectionEl: sectionEl, topPos: topPos, bottomPos: bottomPos,
        });
        link.addEventListener('click', function() {
          var nextPos = sectionEl.offsetTop;
          scrollToPos(nextPos, options);
        });
      }
    });
  
    onScrollHandle(linksPosArr);
  }

  return cmoHashNavigation;
}))