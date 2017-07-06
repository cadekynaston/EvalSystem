require.config({
  paths: {
    tgz: './breakdown',
    chart: './chart',
  }
});
require(['tgz', 'chart'], function(tgz, chart, $) {
  console.log($);
  console.log(tgz);
  console.log(chart);
  var report = new Report();
  report.onLoad();
})
