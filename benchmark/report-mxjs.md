npm run test:mxjs

```
> benchmark@1.0.0 test:mxjs
> autocannon -d 100 -c 10000 http://127.0.0.1:3992 && echo '
> Mx.js benchmark done
>
> '

Running 100s test @ http://127.0.0.1:3992
10000 connections

```

| Stat    | 2.5%   | 50%    | 97.5%  | 99%    | Avg       | Stdev    | Max     |
| ------- | ------ | ------ | ------ | ------ | --------- | -------- | ------- |
| Latency | 151 ms | 214 ms | 269 ms | 283 ms | 216.71 ms | 81.17 ms | 9312 ms |

| Stat      | 1%      | 2.5%   | 50%     | 97.5%   | Avg       | Stdev    | Min     |
| --------- | ------- | ------ | ------- | ------- | --------- | -------- | ------- |
| Req/Sec   | 14,143  | 27,999 | 43,199  | 48,831  | 42,753.36 | 5,500.76 | 14,140  |
| Bytes/Sec | 3.08 MB | 6.1 MB | 9.41 MB | 10.6 MB | 9.32 MB   | 1.2 MB   | 3.08 MB |

Req/Bytes counts sampled once per second.

# of samples: 100

4293k requests in 101.64s, 932 MB read
8k errors (8k timeouts)

Mx.js benchmark done
