/* eslint-disable @typescript-eslint/no-require-imports */
const { exec } = require("child_process");
const { writeFile } = require("fs");
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

const config = {
  d: 10, // Duration of the test in seconds
  c: 1000, // Number of connections to use

  // list of frameworks to benchmark
  express: { port: 3991, name: "Express.js" },
  mxjs: { port: 3992, name: "MxJs" },
};

// Function to run a benchmark command in a separate thread
function runBenchmarkInThread(command) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, {
      workerData: { command },
    });

    worker.on("message", (result) => resolve(result));
    worker.on("error", (err) => reject(err));
    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

// Function to write the concatenated results to a markdown file
function writeReportToFile(results) {
  const fileName = "benchmark-results-autocannon.md";
  const data = `# Benchmark Results\n\n${results}`;

  writeFile(fileName, data, (err) => {
    if (err) throw err;
    console.log(`Results saved to ${fileName}`);
  });
}

// If this is a worker thread, execute the benchmark command
if (!isMainThread) {
  const { command } = workerData;
  exec(command, (err, stdout, stderr) => {
    if (err) {
      parentPort.postMessage(`Error: ${stderr}`);
    } else {
      parentPort.postMessage(stdout);
    }
  });
}

// Main function that runs benchmarks in parallel threads
if (isMainThread) {
  (async function () {
    try {
      const expressCommand = `npx autocannon -d ${config.d} -c ${config.c} http://127.0.0.1:${config.express.port}`;
      const mxjsCommand = `npx autocannon -d ${config.d} -c ${config.c} http://127.0.0.1:${config.mxjs.port}`;

      // Run benchmarks in parallel threads
      const [expressResults, mxjsResults] = await Promise.all([
        runBenchmarkInThread(expressCommand),
        runBenchmarkInThread(mxjsCommand),
      ]);

      // Concatenate results
      let benchmarkResults = "";
      benchmarkResults += `## ${config.express.name} Benchmark - ${new Date().toISOString()}\n\`\`\`\n${expressResults}\n\`\`\`\n\n`;
      benchmarkResults += `## ${config.mxjs.name} Benchmark - ${new Date().toISOString()}\n\`\`\`\n${mxjsResults}\n\`\`\`\n\n`;

      // Write to the file
      writeReportToFile(benchmarkResults);
    } catch (error) {
      console.error("Error running benchmarks:", error);
    }
  })();
}
