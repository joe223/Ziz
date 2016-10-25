fis.match('/src/**/*.js', {
  useHash: false,
  parser: fis.plugin('babel',  {
    sourceMaps: true
  }),
  optimizer: fis.plugin('uglify-js'),
  release: '/dist/$0'
});

fis.match('*.css', {
  useHash: false,
  optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
  useHash: false
});
