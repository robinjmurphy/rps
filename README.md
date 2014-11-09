# rps

> Instantaneous requests per second for Elastic Load Balancers

Uses [CloudWatch ELB metrics](http://docs.aws.amazon.com/ElasticLoadBalancing/latest/DeveloperGuide/US_MonitoringLoadBalancerWithCW.html#available_metrics) to return the number of requests per second for a given Elastic Load Balancer over the last minute.

## Installation

```
npm install -g rps
```

## Usage

First export your AWS credentials:

```
export AWS_SECRET_ACCESS_KEY=...
export AWS_ACCESS_KEY_ID=...
```

Then call `rps` with an AWS region and load balancer name:

```
rps <region> <load-balancer-name>
```
