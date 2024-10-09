import { check, sleep } from "k6";
import http from "k6/http";

export let options = {
  stages: [
    { duration: "30s", target: 20 }, // ramp up to 20 users
    { duration: "1m", target: 20 }, // stay at 20 users for 1 minute
    { duration: "30s", target: 0 }, // ramp down to 0 users
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
