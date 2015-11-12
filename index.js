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
  , log : function () { 
        var str = JSON.parse(_command('git log --no-color --pretty=format:\'[ "%H", "%s", "%cr", "%an" ],\' --abbrev-commit'));
        str = str.substr(0, str.length-1)
        return JSON.parse('[' + str + ']');
    }
  , buildNumber : function () {
      
        var git_tag = this.tag().trim();
        var git_long = this.long().trim();
        var git_short = this.short().trim();
        var git_branch = this.branch().trim();

        var build_version = '';

        if (git_tag != git_long) {
            build_version += git_tag;
        } else {
            build_version += git_branch;
        }

        build_version += '.' + git_short;

        var now = new Date();
      
        return build_version;
          
    }
    , buildDate : function () {
      
        var now = new Date();
        return now.getFullYear() + "-" + ('0'+(now.getMonth()+1)).slice(-2) + "-" + now.getDate() + "-" + ('0'+now.getHours()).slice(-2) + ":" + ('0'+now.getMinutes()).slice(-2) + ":" + ('0'+now.getSeconds()).slice(-2);
          
    }
}
