import Tracker from 'tracker-component';
import {Countries, I18n} from '/models';
import React from 'react';
import {List, Page} from '/client/components';

export class CountriesListPage extends Tracker.Component {
  constructor(props) {
    super(props);

    this.state = {data: []};

    this.autorun(() => {
      this.subscribe('countries.list');
    });

    this.autorun(() => {
      const data = Countries.find().fetch();
      this.setState({data});
    });
  }

  render() {
    const actions = {
      add: {
        label: I18n.tag('common.actions.add'),
        href: '/locales/countries/new',
      },
    };

    const columns = {
      code: {label: I18n.tag('countries.list.code')},
      name: {label: I18n.tag('countries.list.name')},
      currency: {label: I18n.tag('countries.list.currency')},
      lang: {label: I18n.tag('countries.list.lang')},
    };

    return (
      <Page title={I18n.tag('countries.list.header')} actions={actions}>
        <List columns={columns} data={this.state.data}/>
      </Page>
    );
  }
}
