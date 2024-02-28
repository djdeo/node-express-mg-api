exports.wrapResponse = (code, data, message) => {
  return { code, data, message}
}

exports.catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}