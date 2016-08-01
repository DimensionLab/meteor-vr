import { Meteor } from 'meteor/meteor';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '../../modules/rate-limit.js';

export const updatePosition = new ValidatedMethod({
  name: 'users.position.update',
  validate: null,
  run({ position, rotation }) {
    Meteor.users.update(this.userId, { $set: { position, rotation } });
  },
});

rateLimit({
  methods: [
    updatePosition,
  ],
  limit: 15,
  timeRange: 1000,
});
