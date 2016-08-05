
export default function initModule({FlowRouter, Meteor, Models}) {
  FlowRouter.group({
    prefix: '/app',
    triggersEnter: [authRequired],
  });
}
