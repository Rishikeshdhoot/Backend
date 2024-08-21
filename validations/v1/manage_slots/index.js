const Joi = require("joi");

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

module.exports.create_slots = Joi.object({
  authID: Joi.string().required(),
  start_from: Joi.string().isoDate().required(),
  end_till: Joi.string().isoDate().required(),
  special_day: Joi.array().items(
    ...daysOfWeek.map(day => Joi.string().valid(day))
  ),
  day_off: Joi.array().items(
    ...daysOfWeek.map(day => Joi.string().valid(day))
  ),
  type: Joi.string().required(),
  break_type: Joi.string().required(),
  interval_after: Joi.number(),
  interval_for: Joi.number(),
  break_time: Joi.number(),
  duration: Joi.number(),
  morning_shift: Joi.object({
    start: Joi.string().isoDate().required(),
    till: Joi.string().isoDate().required(),
    isSpecial: Joi.boolean().required(),
    special_start: Joi.when('isSpecial', {
      is: true,
      then: Joi.string().isoDate().required(),
      otherwise: Joi.forbidden()
    }),
    special_till: Joi.when('isSpecial', {
      is: true,
      then: Joi.string().isoDate().required(),
      otherwise: Joi.forbidden()
    })
  }),
  afternoon_shift: Joi.object({
    start: Joi.string().isoDate().required(),
    till: Joi.string().isoDate().required(),
    isSpecial: Joi.boolean().required(),
    special_start: Joi.when('isSpecial', {
      is: true,
      then: Joi.string().isoDate().required(),
      otherwise: Joi.forbidden()
    }),
    special_till: Joi.when('isSpecial', {
      is: true,
      then: Joi.string().isoDate().required(),
      otherwise: Joi.forbidden()
    })
  }),
  evening_shift: Joi.object({
    start: Joi.string().isoDate().required(),
    till: Joi.string().isoDate().required(),
    isSpecial: Joi.boolean().required(),
    special_start: Joi.when('isSpecial', {
      is: true,
      then: Joi.string().isoDate().required(),
      otherwise: Joi.forbidden()
    }),
    special_till: Joi.when('isSpecial', {
      is: true,
      then: Joi.string().isoDate().required(),
      otherwise: Joi.forbidden()
    })
  }),
  night_shift: Joi.object({
    start: Joi.string().isoDate().required(),
    till: Joi.string().isoDate().required(),
    isSpecial: Joi.boolean().required(),
    special_start: Joi.when('isSpecial', {
      is: true,
      then: Joi.string().isoDate().required(),
      otherwise: Joi.forbidden()
    }),
    special_till: Joi.when('isSpecial', {
      is: true,
      then: Joi.string().isoDate().required(),
      otherwise: Joi.forbidden()
    })
  }),
});

module.exports.get_slots = Joi.object({
  id: Joi.string().required()
});

module.exports.book_appoitment = Joi.object({
  id: Joi.string().required(),
  subId: Joi.string().required(),
  subIddate: Joi.string().required(),
  type: Joi.string().required(),
  mode: Joi.string().required(),
});
