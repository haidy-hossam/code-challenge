import React from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';

export const Communities = ({ selected, onChangeEvent, communities }) => (
  <Listbox value={selected} onChange={onChangeEvent}>
    <div className="relative mt-2">
      <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
        <span className="flex items-center">
          <span className="ml-3 block truncate">{selected.name}</span>
        </span>
      </ListboxButton>

      <ListboxOptions
        transition
        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
      >
        {communities.map((community) => (
          <ListboxOption
            key={community._id}
            value={community}
            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
          >
            <div className="flex items-center">
              <span className="ml-3 block font-normal group-data-[selected]:font-semibold">
                {community.name}
              </span>
            </div>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </div>
  </Listbox>
);
