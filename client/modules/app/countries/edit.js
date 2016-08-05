import React from 'react';
import Tracker from 'tracker-component';

import {Countries, I18n} from '/models';

import {Page} from '/client/components';


export class CountriesEdit extends Tracker.Component {
  constructor(props = {}) {
    super();

    this.state = {doc: {}};

    console.log(props);

    // this.autorun(() => {
    //   const sort = {name: 1};
    //   const list = Countries.find({}, {sort}).fetch();
    //   this.setState({list});
    // });
  }

  render() {
  //   const {list} = this.state;

  //   const columns = {
  //     name: {title: 'Name'},
  //     code: {title: 'ISO Code'},
  //     locale: {title: 'ISO Locale'},
  //     currency: {title: 'Currency'},
  //   };

  //   const pageActions = {
  //     add: {
  //       label: 'Add new Country',
  //       href: '/countries/new',
  //     },
  //   };

    return (
      <Page title={<I18n.tag name="admin.country.edit.header"/>}/>
    );
  }
}
