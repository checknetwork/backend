import {Feeds} from '/models';

export default function () {
  Feeds._ensureIndex({process: 1});
  Feeds._ensureIndex({interval: 1});
  Feeds._ensureIndex({partnerId: 1});
}
