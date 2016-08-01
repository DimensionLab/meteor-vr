import { Meteor } from 'meteor/meteor';
import { Documents } from '../documents';

Meteor.publish('documents', () => Documents.find());

// Publish the current user's record to the client.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.users.find({
      _id: this.userId,
    }, {
      fields: {
        profile: 1,
        emails: 1,
        createdAt: 1,
        position: 1,
        rotation: 1,
      },
    });
  } else {
    return null;
  }
});
