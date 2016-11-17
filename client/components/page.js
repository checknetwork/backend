import React from 'react';
import {Menu, Header, Button} from 'semantic-ui-react';

export const ManagedPage = ({title, info, actions, children}) => {
  const buttonMergedProps = [
    'basic',
    'color',
    'disabled',
    'icon',
    'inverted',
    'loading',
    'negative',
    'positive',
    'primary',
    'secondary',
  ];

  const renderActions = () => {
    const map = _.map(actions, (action, key) => {
      const mergedProps = action.props ? action.props : {};
      const props = _.extend({},
        _.pick(action, buttonMergedProps),
        _.pick(mergedProps, buttonMergedProps)
      );

      const href = mergedProps.href ? mergedProps.href() : action.href;
      if (href) {
        props.href = href;
        props.as = 'a';
      }

      return (
        <Menu.Item key={key}>
          <Button onClick={action.handler} {...props}>{action.label || key}</Button>
        </Menu.Item>
      );
    });

    return (<Menu.Menu position="right">{map}</Menu.Menu>);
  };

  const renderTitle = () => (
    <Menu.Item>
      <Header>{title}<Header.Subheader>{info}</Header.Subheader></Header>
    </Menu.Item>
  );

  const renderBody = () => (
    <div>{children}</div>
  );

  return (
    <div className="app-page">
      <Menu text>
        {renderTitle()}
        {renderActions()}
      </Menu>
      {renderBody()}
    </div>
  );
};
