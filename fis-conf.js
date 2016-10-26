

fis.hook('commonjs', {
  baseUrl: './modules',
  extList: ['.js', '.jsx']
});

fis.match('/src/(**.js)', {
  useHash: false,
  parser: fis.plugin('babel-5.x',  {
    sourceMaps: true,
    blacklist: ['regenerator'],
    stage: '3'
  }),
  release: '/dist/blade.js'
  // release: '/dist/$1'
});

// 改用 npm 方案，而不是用 fis-components
fis.hook('node_modules');

// 设置成是模块化 js
fis.match('/{node_modules,modules}/**.{js,jsx}', {
  isMod: true
});

fis.match('::package', {
  // 本项目为纯前段项目，所以用 loader 编译器加载，
  // 如果用后端运行时框架，请不要使用。
  postpackager: fis.plugin('loader', {
    useInlineMap: true
  })
});

fis.match('/src/**.js', {
    isMod: true
});

fis.media('prod').match('/src/(**.js)', {
    useHash: false,
    parser: fis.plugin('babel-5.x',  {
      sourceMaps: true,
      blacklist: ['regenerator'],
      stage: '3'
    }),
    optimizer: fis.plugin('uglify-js'),
    release: '/dist/blade.min.js'
});

fis.match('*.css', {
  useHash: false,
  optimizer: fis.plugin('clean-css')
});
