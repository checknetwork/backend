import React from 'react';
import {Collapse} from 'react-bootstrap';

export default function initSidebar({Meteor, Tracker, Users, AppState}) {
  const DEFAULT_ACTIVE_ITEM = 'dashboard';
  const {ROLES} = Users;

  const submenuMap = {
    dashboard: {
      title: 'Dashboard',
      icon: 'dashboard',
      filter: ({role}) => [ROLES.SUPERADMIN, ROLES.PARTNERS].includes(role),
      items: {
        overwiev: {label: 'overwiev', link: '/dashboard/overwiev'},
        analytics: {label: 'analytics', link: '/dashboard/analytics'},
        app: {label: 'app health', link: '/dashboard/app'},
        server: {label: 'server state', link: '/dashboard/server'},
      },
    },

    shop: {
      title: 'Shop',
      icon: 'shopping-cart',
      filter: ({role, shop}) => [ROLES.SUPERADMIN].includes(role) && Boolean(shop),
      items: {
        settings: {label: 'settings', link: '/shop/settings'},
        categories: {label: 'categories', link: '/shop/categories'},
        brands: {label: 'brands', link: '/shop/brands'},
        products: {label: 'products', link: '/shop/products'},
        posts: {label: 'magazine posts', link: '/shop/posts'},
        analytics: {label: 'analytics', link: '/shop/analytics'},
      },
    },

    sites: {
      title: 'Sites',
      icon: 'television',
      filter: ({role}) => [ROLES.SUPERADMIN].includes(role),
      items: {
        sites: {label: 'sites', link: '/sites/sites'},
        domains: {label: 'domains', link: '/sites/domains'},
        settings: {label: 'settings', link: '/sites/settings'},
      },
    },

    contents: {
      title: 'Contents',
      icon: 'inbox',
      filter: ({role}) => [ROLES.SUPERADMIN].includes(role),
      items: {
        posts: {label: 'magazine posts', link: '/contents/posts'},
        buckets: {label: 'buckets health', link: '/contents/buckets'},
        settings: {label: 'settings', link: '/contents/settings'},
      },
    },

    partners: {
      title: 'Partners',
      icon: 'users',
      filter: ({role}) => [ROLES.SUPERADMIN].includes(role),
      items: {
        partners: {label: 'partners', link: '/partners/partners'},
        settings: {label: 'settings', link: '/partners/settings'},
      },
    },

    seo: {
      title: 'SEO config',
      icon: 'cog',
      filter: ({role}) => [ROLES.SUPERADMIN].includes(role),
      items: {
        settings: {label: 'settings', link: '/seo/settings'},
        analytics: {label: 'analytics', link: '/seo/analytics'},
        overwiev: {label: 'overwiev', link: '/seo/overwiev'},
        server: {label: 'SSR config', link: '/seo/ssrconfig'},
      },
    },

    locales: {
      title: 'Locales',
      icon: 'globe',
      filter: ({role}) => [ROLES.SUPERADMIN].includes(role),
      items: {
        countries: {label: 'countries', link: '/locales/countries'},
        i18n: {label: 'i18n', link: '/locales/i18n'},
        analytics: {label: 'analytics', link: '#'},
      },
    },

    users: {
      title: 'Users',
      icon: 'user',
      filter: ({role}) => [ROLES.SUPERADMIN].includes(role),
      items: {
        users: {label: 'users', link: '/users/users'},
        settings: {label: 'settings', link: '/users/settings'},
      },
    },

    logout: {
      title: 'Logout',
      icon: 'toggle-left',
      link: '/logout',
    },
  };

  class Sidebar extends Tracker.Component {
    constructor(props = {}) {
      super(props);

      this.state = {user: {}, activeItem: DEFAULT_ACTIVE_ITEM};

      this.autorun(() => {
        this.setState({user: Meteor.user()});
      });

      this.autorun(() => {
        this.setState({shop: AppState.get('activeShop')});
      });
    }

    onToggleActive(key) {
      let {activeItem} = this.state;
      const topNavKeys = _.keys(submenuMap);

      activeItem = (key === activeItem || !topNavKeys.includes(key)) ? null : key;
      this.setState({activeItem});
    }

    renderTopNav(scope) {
      _.map(submenuMap, ({title, icon, filter, items, link}, key) => {
        if (filter && !filter(scope)) {
          return (<div key={key}/>);
        }

        const opened = items && (scope.activeItem === key);
        const subNav = items ? this.renderSubNav(scope, items, opened) : (null);

        const onClick = (e) => {
          return link ? false : (this.onToggleActive(key) && e.preventDefault());
        };

        return (
          <div key={key} className="panel-sidebar-item">
            <div className="panel-heading" role="tab">
              <a hlink={link || '#'} onClick={onClick} className="nav-link">
                <i className={`fa fa-${icon}`}/> {title || ''}
              </a>
            </div>
            {subNav}
          </div>
        );
      });
    }

    renderSubNav(scope, items, opened) {
      const itemsNav = _.map(items, ({label, link, filter}, key) => {
        if (filter && !filter(scope)) {
          return (<div key={key}/>);
        }

        return (
          <li role="presentation" key={key}>
            <a hlink={link} className="nav-link">{label}</a>
          </li>
        );
      });

      return (
        <Collapse in={opened}>
          <div className="panel-collapse">
            <div className="panel-body">
              <ul className="panel-sidebar-submenu">
                {itemsNav}
              </ul>
            </div>
          </div>
        </Collapse>
      );
    }

    renderNav() {
      if (!Meteor.userId()) {
        return (null);
      }

      const {user, shop, activeItem} = this.state;
      const scope = {shop, activeItem, role: user.role};

      return this.renderTopNav(scope);
    }

    render() {
      return (
        <div className="sidebar--container">
          <div className="sidebar--body">
            {this.renderNav()}
          </div>
        </div>
      );
    }
  }

  return Sidebar;
}
