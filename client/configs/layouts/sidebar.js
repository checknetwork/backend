import React from 'react';
import {composeWithTracker} from 'react-komposer';
import {Users} from '/models';
import {Meteor} from 'meteor/meteor';
import {Menu, Header} from 'semantic-ui-react';
import {valuefyMap} from '/client/components';

export default function initSidebar(AppState, Router) {
  const {SUPERADMIN, PARTNER} = Users.ROLES;

  const submenuMap = {
    management: {
      label: 'Management',
      icon: 'dashboard',
      filter: ({userRole}) => SUPERADMIN === userRole || PARTNER === userRole,
      items: {
        managementConfigs: {label: 'Configs', href: '/management/configs'},
        managementServers: {label: 'Servers', href: '/management/servers'},
        managementTasks: {label: 'Background tasks', href: '/management/tasks'},
      },
    },

    shop: {
      label: 'Shop',
      icon: 'shopping-cart',
      filter: ({userRole, shopId}) => SUPERADMIN === userRole && Boolean(shopId),
      items: {
        shopConfigs: {label: 'Configs', href: '/shop/configs'},
        shopCategories: {label: 'Categories', href: '/shop/categories'},
        shopProducts: {label: 'Products', href: '/shop/products'},
        shopPosts: {label: 'Posts', href: '/shop/posts'},
      },
    },

    sites: {
      label: 'Sites (shops)',
      icon: 'television',
      filter: ({userRole}) => SUPERADMIN === userRole,
      items: {
        sitesSites: {label: 'Sites', href: '/sites/sites'},
        sitesDomains: {label: 'Domains', href: '/sites/domains'},
        sitesColors: {label: 'Colors', href: '/sites/settings'},
      },
    },

    contents: {
      label: 'Contents',
      icon: 'inbox',
      filter: ({userRole}) => SUPERADMIN === userRole,
      items: {
        contentsPosts: {label: 'Posts', href: '/contents/posts'},
      },
    },

    locales: {
      label: 'Locales',
      icon: 'globe',
      filter: ({userRole}) => SUPERADMIN === userRole,
      items: {
        localesCountries: {label: 'Countries', href: '/locales/countries'},
        localesI18n: {label: 'I18n', href: '/locales/i18n'},
      },
    },

    users: {
      label: 'Users',
      icon: 'user',
      filter: ({userRole}) => SUPERADMIN === userRole,
      items: {
        usersUsers: {label: 'Users', href: '/users/users'},
      },
    },

    account: {
      label: 'Account',
      icon: 'user',
      filter: ({userId}) => Boolean(userId),
      items: {
        accountSettings: {label: 'Settings', href: '/account/settings'},
        accountLogout: {label: 'Logout', href: '/logout'},
      },
    },
  };

  const Sidebar = ({userRole, shopId, userId, activeItemName}) => {
    const renderItems = (items) => {
      return _.map(items, (chunk, key) => {
        const data = _.extend(chunk, {key, userRole, shopId, userId});
        const calcs = valuefyMap(chunk, ['href', 'label'], data);
        const props = {children: calcs.label, active: (key === activeItemName)};

        if (calcs.href) {
          props.as = 'a';
          props.href = calcs.href;
        }

        return (<Menu.Item key={key} {...props}/>);
      });
    };

    const renderGroups = (groups) => {
      return _.map(groups, (chunk, key) => {
        const data = _.extend(chunk, {key, userRole, shopId, userId});
        const props = valuefyMap(chunk, ['filter', 'label'], data);

        if (!props.filter || !chunk.items) {
          return (null);
        }

        const map = renderItems(chunk.items);

        return (
          <Menu.Item key={key}>
            <Menu.Header>{props.label}</Menu.Header>
            <Menu.Menu>{map}</Menu.Menu>
          </Menu.Item>
        );
      });
    };

    return (<Menu vertical className="left sidebar visible">{renderGroups(submenuMap)}</Menu>);
  };

  return composeWithTracker((props, onData) => {
    const data = {
      userId: Meteor.userId(),
      userRole: (Meteor.user() || {}).role,
      shopId: AppState.get('shop'),
      activeItemName: (Router.current() || {route: {}}).name,
    };

    onData(null, data);
  })(Sidebar);
}
