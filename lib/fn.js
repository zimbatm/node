// NOTE: it is important to use the "this" argument on apply and call outside of the contect of an object, so as to make it bindable


/*
 * Synchronous
 */

// Multiple-dispatch
// the retuned function returns void on call
function many() {
  var many = [], wrap;

  for (var i=0; l=arguments.length; i<l; i++) {
    var cb = arguments[i];
    Array.prototype.push.apply(many, cb.many || [cb]);
  }

  wrap = function () {
    for (var i=0, l=many.length; i<l; i++) {
      many[i].apply(this, arguments);
    }
  }
  wrap.many = many;
  return cb;
}


function bind(cb, context) {
  if (cb.bind) return cb;
  var wrap = function () {
    return cb.apply(context, arguments);
  }
  wrap.cb = cb;
  return wrap;
}

// returned function returns void on call
function once(cb) {
  if (cb.once) return cb;
  var done, wrap;
  wrap = function () {
    if (!done) {
      done = true;
      cb.apply(this, arguments);
    }
  }
  wrap.once = cb;
  return wrap;
}

// Partial application
// 
function curry(cb) {

}

// F o G
function compose() {

}



/*
 * Asynchronous
 */

