function buildWorker(delay) {
  var worker = {};

  worker.queue = [];
  worker.delay =delay;

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
