function buildWorker() {
  var worker = {};

  worker.queue = [];
  worker.delay = 1000;

  worker.startJob = function() {
    setTimeout(function() {
      var job = worker.queue.pop();

      job();

      if (worker.queue.length > 0) {
        worker.startJob();
      }
    }, worker.delay);
  }

  worker.push = function(job) {
    worker.queue.push(job);

    if (worker.queue.length == 1) {
      worker.startJob();
    }
  }

  return worker;
}
