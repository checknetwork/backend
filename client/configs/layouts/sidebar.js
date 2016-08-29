import React from 'react';
import {Collapse} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import {Users, I18n} from '/models';

export default function initSidebar(AppState, Tracker) {
  const DEFAULT_ACTIVE_ITEM = 'dashboard';
  const {ROLES} = Users;

  const submenuMap = {
    dashboard: {
      title: I18n.tag('admin.submenu.dashboard'),
      icon: 'dashboard',
      filter: ({role}) => [ROLES.SUPERADMIN, ROLES.PARTNERS].includes(role),
      items: {
        overwiev: {label: I18n.tag('admin.submenu.overwiev'), link: '/dashboard/overwiev'},
        analytics: {label: I18n.tag('admin.submenu.analytics'), link: '/dashboard/analytics'},
        app: {label: I18n.tag('admin.submenu.app health'), link: '/dashboard/app'},
        server: {label: I18n.tag('admin.submenu.serverState'), link: '/dashboard/server'},
      },
    },

    shop: {
      title: I18n.tag('admin.submenu.shop'),
      icon: 'shopping-cart',
      filter: ({role, shop}) => [ROLES.SUPERADMIN].includes(role) && Boolean(shop),
      items: {
        settings: {label: I18n.tag('admin.submenu.settings'), link: '/shop/settings'},
        categories: {label: I18n.tag('admin.submenu.categories'), link: '/shop/categories'},
        brands: {label: I18n.tag('admin.submenu.brands'), link: '/shop/brands'},
        products: {label: I18n.tag('admin.submenu.products'), link: '/shop/products'},
        posts: {label: I18n.tag('admin.submenu.magazinePosts'), link: '/shop/posts'},
        analytics: {label: I18n.tag('admin.submenu.analytics'), link: '/shop/analytics'},
      },
    },

    sites: {
      title: I18n.tag('admin.submenu.sites'),
      icon: 'television',
      filter: ({role}) => [ROLES.SUPERADMIN].includes(role),
      items: {
        sites: {label: I18n.tag('admin.submenu.sites'), link: '/sites/sites'},
        domains: {label: I18n.tag('admin.submenu.domains'), link: '/sites/domains'},
        settings: {label: I18n.tag('admin.submenu.settings'), link: '/sites/settings'},
      },
    },

    contents: {
      title: I18n.tag('admin.submenu.contents'),
      icon: 'inbox',
      filter: ({role}) => [ROLES.SUPERADMIN].includes(role),
      items: {
        posts: {label: I18n.tag('admin.submenu.magazinePosts'), link: '/contents/posts'},
        buckets: {label: I18n.tag('admin.submenu.bucketsHealth'), link: '/contents/buckets'},
        settings: {label: I18n.tag('admin.submenu.settings'), link: '/contents/settings'},
      },
    },

    partners: {
      title: I18n.tag('admin.submenu.partners'),
      icon: 'users',
      filter: ({role}) => [ROLES.SUPERADMIN].includes(role),
      items: {
        partners: {label: I18n.tag('admin.submenu.partners'), link: '/partners/partners'},
        settings: {label: I18n.tag('admin.submenu.settings'), link: '/partners/settings'},
      },
    },

    seo: {
      title: I18n.tag('admin.submenu.seoConfig'),
      icon: 'cog',
      filter: ({role}) => [ROLES.SUPERADMIN].includes(role),
      items: {
        settings: {label: I18n.tag('admin.submenu.settings'), link: '/seo/settings'},
        analytics: {label: I18n.tag('admin.submenu.analytics'), link: '/seo/analytics'},
        overwiev: {label: I18n.tag('admin.submenu.overwiev'), link: '/seo/overwiev'},
        server: {label: I18n.tag('admin.submenu.ssrConfig'), link: '/seo/ssrconfig'},
      },
    },

    locales: {
      title: I18n.tag('admin.submenu.locales'),
      icon: 'globe',
      filter: ({role}) => [ROLES.SUPERADMIN].includes(role),
      items: {
        countries: {label: I18n.tag('admin.submenu.countries'), link: '/locales/countries'},
        i18n: {label: I18n.tag('admin.submenu.i18n'), link: '/locales/i18n'},
        analytics: {label: I18n.tag('admin.submenu.analytics'), link: '#'},
      },
    },

    users: {
      title: I18n.tag('admin.submenu.users'),
      icon: 'user',
      filter: ({role}) => [ROLES.SUPERADMIN].includes(role),
      items: {
        users: {label: I18n.tag('admin.submenu.users'), link: '/users/users'},
        settings: {label: I18n.tag('admin.submenu.settings'), link: '/users/settings'},
      },
    },

    logout: {
      title: I18n.tag('admin.submenu.logout'),
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
      return _.map(submenuMap, ({title, icon, filter, items, link}, key) => {
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
              <a href={link || '#'} onClick={onClick} className="nav-link">
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
            <a href={link} className="nav-link">{label}</a>
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
