var path = './action/';
var fileList = [];
fs.readdir(path, function (err, files) {
  if(err) throw err;
  files.forEach(function(file) {
    console.log(path+file);

    fs.stat(path+file, function(err, stats) {
        if( stats.isFile() ) {
            fileList.push(file);
        }
      console.log(stats);
    });
  });
});

if( fileList.length ) {
    fs.open('./action/index.ts', 'w', function(err, fd) {
      if(err) throw err;
      var buf = new Buffer('export {'+fileList.join(',\n')+'};');
      fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer) {
        if(err) throw err;
        console.log(err, written, buffer);
        fs.close(fd, function() {
          console.log('Done');
        });
      });
    });
}
