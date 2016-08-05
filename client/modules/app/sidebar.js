import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Collapse} from 'react-bootstrap';
import {Users} from '/models';
import Tracker from 'tracker-component';
import classNames from 'classnames';

const {ROLES} = Users;

const submenuMap = {
  dashboard: {
    title: 'Dashboard',
    icon: 'dashboard',
    filter: ({role}) => [ROLES.SUPERADMIN, ROLES.PARTNERS].includes(role),
    items: {
      overwiev: {label: 'overwiev', ref: '/dashboard/overwiev'},
      analytics: {label: 'analytics', ref: '/dashboard/analytics'},
      app: {label: 'app health', ref: '/dashboard/app'},
      server: {label: 'server state', ref: '/dashboard/server'},
    },
  },

  shop: {
    title: 'Shop',
    icon: 'shopping-cart',
    filter: ({role, shop}) => [ROLES.SUPERADMIN].includes(role) && Boolean(shop),
    items: {
      settings: {label: 'settings', ref: '/shop/settings'},
      categories: {label: 'categories', ref: '/shop/categories'},
      brands: {label: 'brands', ref: '/shop/brands'},
      products: {label: 'products', ref: '/shop/products'},
      posts: {label: 'magazine posts', ref: '/shop/posts'},
      analytics: {label: 'analytics', ref: '/shop/analytics'},
    },
  },

  sites: {
    title: 'Sites',
    icon: 'television',
    filter: ({role}) => [ROLES.SUPERADMIN].includes(role),
    items: {
      sites: {label: 'sites', ref: '/sites/sites'},
      domains: {label: 'domains', ref: '/sites/domains'},
      settings: {label: 'settings', ref: '/sites/settings'},
    },
  },

  contents: {
    title: 'Contents',
    icon: 'inbox',
    filter: ({role}) => [ROLES.SUPERADMIN].includes(role),
    items: {
      posts: {label: 'magazine posts', ref: '/contents/posts'},
      buckets: {label: 'buckets health', ref: '/contents/buckets'},
      settings: {label: 'settings', ref: '/contents/settings'},
    },
  },

  partners: {
    title: 'Partners',
    icon: 'users',
    filter: ({role}) => [ROLES.SUPERADMIN].includes(role),
    items: {
      partners: {label: 'partners', ref: '/partners/partners'},
      settings: {label: 'settings', ref: '/partners/settings'},
    },
  },

  seo: {
    title: 'SEO config',
    icon: 'cog',
    filter: ({role}) => [ROLES.SUPERADMIN].includes(role),
    items: {
      settings: {label: 'settings', ref: '/seo/settings'},
      analytics: {label: 'analytics', ref: '/seo/analytics'},
      overwiev: {label: 'overwiev', ref: '/seo/overwiev'},
      server: {label: 'SSR config', ref: '/seo/ssrconfig'},
    },
  },

  locales: {
    title: 'Locales',
    icon: 'globe',
    filter: ({role}) => [ROLES.SUPERADMIN].includes(role),
    items: {
      countries: {label: 'countries', ref: '/locales/countries'},
      i18n: {label: 'i18n', ref: '/locales/i18n'},
      analytics: {label: 'analytics', ref: '#'},
    },
  },

  users: {
    title: 'Users',
    icon: 'user',
    filter: ({role}) => [ROLES.SUPERADMIN].includes(role),
    items: {
      users: {label: 'users', ref: '/users/users'},
      settings: {label: 'settings', ref: '/users/settings'},
    },
  },

  logout: {
    title: 'Logout',
    icon: 'toggle-left',
    link: '/logout',
  },
};


export default class Sidebar extends Tracker.Component {
  constructor() {
    super();

    this.state = {opened: 'dashboard'};

    this.autorun(() => {
      const {profile: {name}, role} = (Meteor.user() || {profile: {}});

      this.setState({name, role});
    });
  }

  onToggle(opened) {
    this.setState({opened});
  }

  renderSubmenu() {
    const scope = this.state;

    return _.map(submenuMap, ({title, icon, filter, link, items}, key) => {
      if (filter && !filter(scope)) {
        return (<div key={key}/>);
      }

      const opened = scope.opened === key;

      const renderNested = () => {
        if (!items) {
          return (null);
        }

        const nestedMap = _.map(items, ({label, ref}, idx) => {
          return (
            <li role="presentation" key={idx}>
              <a href={ref} className="nav-link">{label}</a>
            </li>
          );
        });

        return (
          <Collapse in={opened}>
            <div className="panel-collapse">
              <div className="panel-body">
                <ul className="panel-sidebar-submenu">
                  {nestedMap}
                </ul>
              </div>
            </div>
          </Collapse>
        );
      };

      const onClick = (e) => {
        return link ? false : (this.onToggle(key) && e.preventDefault());
      };

      return (
        <div key={key} className="panel-sidebar-item">
          <div className="panel-heading" role="tab">
            <a href={link || '#'} onClick={onClick} className="nav-link">
              <i className={`fa fa-${icon}`}/> {title || ''}
            </a>
          </div>
          {renderNested()}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="sidebar--container">
        <div className="sidebar--body">
          {this.renderSubmenu()}
        </div>
      </div>
    );
  }
}
