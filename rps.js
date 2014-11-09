#! /usr/bin/env node

var AWS = require('aws-sdk');
var region = process.argv[2];
var loadBalancerName = process.argv[3];

if (!loadBalancerName || !region) {
  console.error('Usage: rps <region> <load-balancer-name> ');
  process.exit(1);
}

AWS.config.update({
  region: region
});

var cloudWatch = new AWS.CloudWatch();
var now = Date.now() / 1000;
var period = 60;
var options = {
  Namespace: "AWS/ELB",
  MetricName: "RequestCount",
  Statistics: ["Sum"],
  StartTime: now - period,
  EndTime: now,
  Period: period,
  Dimensions: [{
    Name: "LoadBalancerName",
    Value: loadBalancerName
  }]
};

cloudWatch.getMetricStatistics(options, function (err, data) {
  if (err) return console.error(err.message);

  if (data.Datapoints && data.Datapoints.length > 0) {
    console.log((data.Datapoints[0].Sum / period).toFixed(0));
  } else {
    console.error('No data found for ELB', loadBalancerName, 'in region', region);
  }
});