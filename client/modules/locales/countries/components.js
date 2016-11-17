// import Tracker from 'tracker-component';
import {Meteor} from 'meteor/meteor';
import {Countries} from '/models';
import React from 'react';
import {ManagedList, ManagedPage, ManagedForm} from '/client/components';
import {composeWithTracker} from 'react-komposer';


export const CountriesList = ({list}) => {
  const actions = {
    add: {
      label: 'Add new',
      href: '/locales/countries/edit/new',
      positive: true,
    },
  };

  const fields = {
    code: {label: 'Code'},
    name: {label: 'Name', href: (v) => `/locales/countries/edit/${v._id}`},
    currency: {label: 'Currency'},
    lang: {label: 'Language'},
  };

  return (
    <ManagedPage title="Countries" actions={actions}>
      <ManagedList fields={fields} data={list}/>
    </ManagedPage>
  );
};


export const CountriesListPage = composeWithTracker(({params}, onData) => {
  const sub = Meteor.subscribe('countries.list');
  const data = {
    list: Countries.find().fetch(),
    loading: !sub.ready(),
  };

  onData(null, data);

  return () => sub.stop();
})(CountriesList);


export const CountriesItem = ({item, isNew, isCopy, saveData}) => {
  const info = isNew ? '*Creating new' :
    `${isCopy ? '*Copy new from ' : ''}${item.name} (${item._id})`;

  const fields = {
    code: {
      required: true,
      disabled: !(isNew || isCopy),
    },
    groupA: {
      group: true,
      widths: 2,
      name: {
        required: true,
      },
      bucket: {
        label: 'Bucket id',
      },
    },
    groupB: {
      group: true,
      widths: 2,
      lang: {
        required: true,
      },
      currName: {
        required: true,
        label: 'Currency name',
      },
      currSymbol: {
        label: 'Currency symbol',
      },
      currCode: {
        required: true,
        label: 'Currency international code',
      },
    },
    letters: {
      label: 'Alphabet letters (asc order)',
    },
  };

  const onSubmit = (e, formData) => {
    e.preventDefault();
    saveData(formData);
  };

  const reset = !isNew;

  return (
    <ManagedPage title="Country" info={info}>
      <ManagedForm fields={fields} data={item} reset={reset} onSubmit={onSubmit}/>
    </ManagedPage>
  );
};

export const CountriesItemPage = composeWithTracker(({action, id, router}, onData) => {
  const isNew = (action === 'new') || (action === 'clone');

  const saveData = (itemData) => {
    Meteor.call('countriesItemSave', (!isNew ? id : null), itemData, (err, res) => {
      if (err) {
        const details = {message: 'Error during save item'};
        const errors = _.extend(details, err.details);
        return onData(null, {errors});
      }

      if (isNew) {
        return router.go(`/locales/edit/${res.result}`);
      }

      const details = {message: 'All data saved successfully'};
      const results = _.extend(details, res.details);
      return onData(null, {results});
    });
  };

  const data = {
    saveData,
    isNew,
    item: isNew ? {} : Countries.findOne(id),
  };

  onData(null, data);
})(CountriesItem);
