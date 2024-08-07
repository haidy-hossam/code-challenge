import React from 'react';

export const People = ({ people, checkInOrOut }) => {
  let disableButton = false;

  return (
    <ul className="flex min-w-full flex-col divide-y divide-gray-100">
      {people.map((person) => {
        if (person.checkIn && person.checkOut) disableButton = true;
        else disableButton = false;

        return (
          <li
            key={person._id}
            className="flex min-w-full items-center gap-x-6 py-5"
          >
            <button
              disabled={disableButton}
              onClick={() =>
                checkInOrOut({
                  personId: person._id,
                  isCheckedIn: !!person.checkIn,
                  companyName: person.companyName,
                })
              }
              className="h-15 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {disableButton
                ? 'Checked'
                : person.checkIn
                  ? 'Check out'
                  : 'Check in'}
            </button>

            <div className="min-w-100">
              <p className="text-sm font-semibold text-gray-900">
                Name: {person.firstName} {person.lastName}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Company: {person.companyName ? person.companyName : 'N/A'}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Title: {person.title ? person.title : 'N/A'}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                checked In:{' '}
                {person.checkIn
                  ? `${person.checkIn.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}, ${person.checkIn.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}`
                  : 'N/A'}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                checked Out:{' '}
                {person.checkOut
                  ? `${person.checkOut.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}, ${person.checkOut.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}`
                  : 'N/A'}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
