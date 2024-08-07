import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import { People } from '../people/people';

export const Counts = new Mongo.Collection('counts');

async function updateCounts({ communityId, companyName, isCheckedIn }) {
  const counts = await Counts.findOneAsync({
    communityId,
  });

  if (counts) {
    const updatedCompaniesCheckedIn = [...counts.companiesCheckedIn];

    const index = updatedCompaniesCheckedIn.findIndex(
      (company) => company.title === (companyName || 'others')
    );

    if (index === -1)
      updatedCompaniesCheckedIn.push({
        title: companyName || 'others',
        count: 1,
      });
    else
      updatedCompaniesCheckedIn[index].count = isCheckedIn
        ? updatedCompaniesCheckedIn[index].count - 1
        : updatedCompaniesCheckedIn[index].count + 1;

    const updatedCounts = {
      totalCheckedIn: isCheckedIn
        ? counts.totalCheckedIn - 1
        : counts.totalCheckedIn + 1,
      totalNotCheckedIn: isCheckedIn
        ? counts.totalNotCheckedIn
        : counts.totalNotCheckedIn - 1,
      companiesCheckedIn: updatedCompaniesCheckedIn,
    };
    return Counts.updateAsync({ _id: counts._id }, { $set: updatedCounts });
  }
  const total = (await People.find({ communityId }).fetchAsync()).length;

  const companiesCheckedIn = [];

  companiesCheckedIn.push({
    title: companyName || 'others',
    count: 1,
  });

  return Counts.insertAsync({
    communityId,
    totalNotCheckedIn: total - 1,
    totalCheckedIn: 1,
    companiesCheckedIn,
  });
}

Meteor.methods({ updateCounts });
