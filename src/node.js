(function(process) {
  var stdlibPath = process.env['NODE_STDLIB'] || process.installPrefix + '/lib/node/libraries',
    bootPath = stdlibPath + '/__boot.js',
    bootCode = cat(bootPath, 'utf-8'),
    global = getGlobal(),
    ret;


  // Fixing exports, things all stdlib implementations want ...

  global.process = process;

  
  // Run!
  ret = process.compile(bootCode, bootPath);
  if (typeof ret == "function") {
    ret(process);
  }


/**********************************************************************/

// Utility functions

  function cat(path, encoding) {
    var fs = process.fs,
      fd = fs.open(path, process.O_RDONLY, 0644),
      buff = '', pos = 0, pair;
    
    while(true) {
      pair = fs.read(fd, 16*1024, pos, encoding);
      if (pair[1] > 0) {
        buff += pair[0];
        pos += pair[1];
      } else {
        break;
      }
    }

    fs.close(fd);
    return buff;
  }

  function getGlobal() { return this; }
})
