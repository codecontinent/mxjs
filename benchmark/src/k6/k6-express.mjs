import { check, sleep } from "k6";
import http from "k6/http";
import { Trend } from "k6/metrics";

// Define a custom metric to track response times
const responseTimeTrend = new Trend("response_time");

export let options = {
  stages: [
    { duration: "15s", target: 10000 }, // ramp up to 10k users
    { duration: "30s", target: 10000 }, // stay at 10k users for half-minute
    { duration: "10s", target: 5000 }, // ramp down to 5k users
    { duration: "30s", target: 5000 }, // stay at 5k users for half-minute
    { duration: "5s", target: 0 }, // ramp down to 0 users
  ],
};

export default function () {
  const res = http.get("http://127.0.0.1:3991"); // Change this URL to your server
  // Track the response time
  responseTimeTrend.add(res.timings.duration);

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(1); // Wait for 1 second between iterations
}
