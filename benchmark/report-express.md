npm run test:express

> benchmark@1.0.0 test:express
> autocannon -d 100 -c 10000 http://127.0.0.1:3991 > report-express.md && echo '
> Express.js benchmark done
>
> '

Running 100s test @ http://127.0.0.1:3991
10000 connections

| Stat    | 2.5%   | 50%    | 97.5%  | 99%    | Avg       | Stdev    | Max     |
| ------- | ------ | ------ | ------ | ------ | --------- | -------- | ------- |
| Latency | 426 ms | 492 ms | 637 ms | 828 ms | 498.94 ms | 90.14 ms | 8414 ms |

| Stat      | 1%     | 2.5%    | 50%     | 97.5%   | Avg       | Stdev    | Min    |
| --------- | ------ | ------- | ------- | ------- | --------- | -------- | ------ |
| Req/Sec   | 3,771  | 11,535  | 15,343  | 16,447  | 15,172.35 | 1,559.12 | 3,771  |
| Bytes/Sec | 951 kB | 2.91 MB | 3.87 MB | 4.14 MB | 3.82 MB   | 393 kB   | 950 kB |

Req/Bytes counts sampled once per second.

# of samples: 100

1551k requests in 101.3s, 382 MB read
24k errors (24k timeouts)

Express.js benchmark done
