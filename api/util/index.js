const mongoose = require("mongoose");

function errorHandler(fn) {
  return async function (req, res, next) {
    try {
      let nextCalled = false;
      const result = await fn(req, res, (params) => {
        nextCalled = true;
        next(params);
      });
      if (!res.headersSent && !nextCalled) {
        res.json(result);
      }
    } catch (e) {
      next(e);
    }
  };
}

// function withTransaction(fn) {
//   return async function (req, res, next) {
//     let result;
//     const session = await mongoose.startSession();

//     try {
//       await session.withTransaction(async () => {
//         result = await fn(req, res, session);
//         return result;
//       });

//       res.status(200).json(result);
//     } catch (error) {
//       await session.abortTransaction();
//       next({ message: "Transaction failed", error });
//     } finally {
//       session.endSession();
//     }
//   };
// }

module.exports = {
  errorHandler,
};
