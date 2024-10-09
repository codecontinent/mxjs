import { check, sleep } from "k6";
import http from "k6/http";
import { Trend } from "k6/metrics";

// Define a custom metric to track response times
const responseTimeTrend = new Trend("response_time");

export const options = {
  stages: [
    { duration: "10s", target: 1000 }, // Ramp up to 1000 users over 10 seconds
    { duration: "30s", target: 1000 }, // Stay at 1000 users for 30 seconds
    { duration: "10s", target: 0 }, // Ramp down to 0 users
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
