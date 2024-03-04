const { catchAsync } = require("../utils");
const AppError = require("../utils/appError");
const APIFeature = require("../utils/APIFeature");
// getAll
exports.getAll = Model => catchAsync(async (req, res, next) => {
  const features = new APIFeature(Model.find({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  res.status(200).json({
    code: 200,
    data: {
      total: doc.length,
      items: doc,
      // page: features.queryStr.page,
      // pageSize: features.queryStr.limit
    },
    message: "Retrieved ALL documents"
  });
});

exports.getOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findById(req.params.id).select("-__v");

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({
    code: 200,
    data: {
      doc
    },
    message: "Retrieved ONE document"
  });
});

exports.addOne = Model => catchAsync(async (req, res, next) => {
  const newDoc = new Model(req.body);
  const doc = await newDoc.save();

  res.status(201).json({
    code: 201,
    data: {
      doc
    },
    message: "Created ONE document"
  });
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    code: 200,
    data: {
      doc
    },
    message: "Updated ONE document"
  });
});

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  res.status(204).json({
    code: 204,
    data: null,
    message: "Deleted ONE document"
  });
});
