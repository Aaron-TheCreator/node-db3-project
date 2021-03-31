const db = require('./scheme-model.js');
const ExpressError = require('../expressError.js');
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const scheme = await db.findById(req.params.scheme_id);
    if (scheme) {
      req.scheme = scheme;
      next();
    } else {
      const err = {
        message: `scheme with scheme id:${req.params.scheme_id} not found`,
        status: 404
      }
      next(err)
    }
  } catch (err) {
    next(err);
  }

}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const newScheme = req.body;
  if (!req?.body?.scheme_name) {
    next(new ExpressError('invalid scheme name', 400))
  } else if (typeof(newScheme.scheme_name) != 'string') {
    next(new ExpressError('invalid scheme name', 400))
  } else if (newScheme === " ") {
    next(new ExpressError('invalid scheme name', 400))
  } else {
    next();
  }

}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const newStep = req.body;
  if (!newStep.instructions || newStep.instructions === "" || typeof(newStep.instructions) != 'string') {
    next(new ExpressError('invalid step', 400));
  } else if (newStep.step_number === NaN || newStep.step_number > 1) {
    next(new ExpressError('invalid step', 400));
  } else {
    next();
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
