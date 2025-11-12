/*
Promise.allSettled(promises) is a helper function that runs promises in parallel and aggregates the settled statuses (either fulfilled or rejected) into a result array.

Promise.all():
Promise.all() resolves only when all given promises resolve, and will reject immediately if any of the promises reject (or non-promises throw an error). 
It is useful in cases when you have interdependent tasks, where it makes sense to reject immediately upon any of them rejecting.

Promise.allSettled():
Promise.allSettled() resolves when all the given promises have either fulfilled or rejected. Unlike Promise.all(), 
it does not immediately reject upon any of the promises rejecting, 
instead it waits for all promises to complete, even if some of them fail. 
Therefore, it is useful in cases when you have multiple asynchronous tasks that are not interdependent, where you may want to know the result of each promise.
*/

function resolveTimeout(value, delay) {
  return new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        resolve(value)
      }, delay)
    }
  );
}

function rejectTimeout(reason, delay) {
  return new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        reject(reason)
      }, delay)
    }
  );
}

// 1. All promises fulfilled
// const statusesPromise = Promise.allSettled([
//   resolveTimeout(['potatoes', 'tomatoes'], 1000),
//   resolveTimeout(['oranges', 'apples'], 5000)
// ]);
// const statuses = await statusesPromise;
// console.log(statuses); 



// // 2. One promise rejected
// const statusesPromise2 = Promise.allSettled([
//   resolveTimeout(['potatoes', 'tomatoes'], 1000),
//   rejectTimeout(new Error('Out of fruits!'), 5000)
// ]);
// const statuses2 = await statusesPromise2;
// console.log(statuses2); 


// 3 All promises rejected
const statusesPromise3 = Promise.allSettled([
  rejectTimeout(new Error('Out of vegetables!'), 1000),
  rejectTimeout(new Error('Out of fruits!'), 10000)
]);
const statuses3 = await statusesPromise3;
console.log(statuses3); 
