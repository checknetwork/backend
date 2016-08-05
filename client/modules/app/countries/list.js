import React from 'react';
import Tracker from 'tracker-component';

import {Countries} from '/models';

import {Page, List} from '/client/components';


export class CountriesList extends Tracker.Component {
  constructor() {
    super();

    this.state = {list: []};

    this.autorun(() => {
      const sort = {name: 1};
      const list = Countries.find({}, {sort}).fetch();
      this.setState({list});
    });
  }

  render() {
    const {list} = this.state;

    const columns = {
      name: {title: 'Name'},
      code: {title: 'ISO Code'},
      locale: {title: 'ISO Locale'},
      currency: {title: 'Currency'},
    };

    const pageActions = {
      add: {
        label: 'Add new Country',
        href: '/app/countries/new',
      },
    };

    return (
      <Page title="Countries list" actions={pageActions}>
        <List columns={columns} data={list}/>
      </Page>
    );
  }
}
