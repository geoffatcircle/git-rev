var exec = require('child_process').execSync

function _command (cmd, cb) {
    try {
        return exec(cmd, { cwd: __dirname }).toString();
    } catch (err) {
        return '';
    }
}

module.exports = { 
    short : function () { 
      return _command('git rev-parse --short HEAD').toString();
    }
  , long : function () { 
      return _command('git rev-parse HEAD');
    }
  , branch : function () { 
      return _command('git rev-parse --abbrev-ref HEAD');
    }
  , tag : function () { 
      return _command('git describe --always --tag --abbrev=0');
    }
  , log : function (cb) { 
        var str = JSON.parse(_command('git log --no-color --pretty=format:\'[ "%H", "%s", "%cr", "%an" ],\' --abbrev-commit'));
        str = str.substr(0, str.length-1)
        return JSON.parse('[' + str + ']');
    }
}
