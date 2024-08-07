import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const People = new Mongo.Collection('people');

async function checkInOrOut({ personId }) {
  const person = await People.findOneAsync({
    _id: personId,
  });

  if (person) {
    if (person.checkIn)
      return People.updateAsync(
        { _id: person._id },
        { $set: { checkOut: new Date() } }
      );
    return People.updateAsync(
      { _id: person._id },
      { $set: { checkIn: new Date() } }
    );
  }
  return person;
}

Meteor.methods({ checkInOrOut });
