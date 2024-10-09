import { check, sleep } from "k6";
import http from "k6/http";

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
  // console.log("MxJs test...");
  let res = http.get("http://127.0.0.1:3992"); // replace with your Express.js app URL
  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time is less than 200ms": (r) => r.timings.duration < 200,
  });
  sleep(1);
}
