import React, { useState } from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Communities as CommunitiesCollection } from '../communities/communities';
import { People as PeopleCollection } from '../people/people';
import { Counts as CountsCollection } from '../counts/counts';

import { People } from './components/People';
import { Communities } from './components/Communities';

export const App = () => {
  const [selectedCommunity, setSelectedCommunity] = useState({
    _id: 1,
    name: 'Select an event',
  });

  useSubscribe('communities');
  useSubscribe('people', selectedCommunity._id);
  useSubscribe('counts', selectedCommunity._id);

  const communities = useFind(() => CommunitiesCollection.find({}), []);
  const people = useFind(
    () => PeopleCollection.find(),
    [selectedCommunity._id]
  );

  const counts = useFind(
    () => CountsCollection.find(),
    [selectedCommunity._id]
  );

  const onChangeCommunity = (value) => {
    setSelectedCommunity(value);
  };

  const checkInOrOut = async ({ personId, isCheckedIn, companyName }) => {
    try {
      await Meteor.callAsync('checkInOrOut', { personId });

      await Meteor.callAsync('updateCounts', {
        communityId: selectedCommunity._id,
        companyName,
        isCheckedIn,
      });
    } catch (err) {
      // Handle Error
    }
  };

  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      <h1 className="text-lg font-bold">Event Check-in</h1>

      <Communities
        selected={selectedCommunity}
        onChangeEvent={onChangeCommunity}
        communities={communities}
      />

      {counts.length !== 0 && (
        <div>
          <h1 className="text-lg font-bold">
            People in the event right now:{' '}
            <span className="text-indigo-600">{counts[0].totalCheckedIn}</span>
          </h1>
          <h1 className="text-lg font-bold">
            People by company in the event right now: {}
            {counts[0].companiesCheckedIn
              .filter((company) => company.count !== 0)
              .map((company) => (
                <span key={company.title}>
                  {company.title}{' '}
                  <span className="text-indigo-600">({company.count})</span>{' '}
                </span>
              ))}
          </h1>
          <h1 className="text-lg font-bold">
            People not checked in:{' '}
            <span className="text-indigo-600">
              {counts[0].totalNotCheckedIn}
            </span>
          </h1>
        </div>
      )}

      <div>
        <People people={people} checkInOrOut={checkInOrOut} />
      </div>
    </div>
  );
};
