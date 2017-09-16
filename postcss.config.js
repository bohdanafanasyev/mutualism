module.exports = {
  plugins: [
    require('postcss-import'),
    require('precss'),
    require('postcss-cssnext')({
      browsers: ['last 2 versions', '> 5%'],
    })
  ]
};
