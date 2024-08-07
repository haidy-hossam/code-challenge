import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data';
import { Communities } from '../communities/communities';
import { People } from '../people/people';
import { Counts } from '../counts/counts';

Meteor.startup(async () => {
  // DON'T CHANGE THE NEXT LINE
  await loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
});

Meteor.publish('communities', () => Communities.find({}));

Meteor.publish('people', (communityId) => People.find({ communityId }));

Meteor.publish('counts', (communityId) => Counts.find({ communityId }));
