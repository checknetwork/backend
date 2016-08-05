import config from './config';
import startup from './startup';
import migrations from './migrations';
import cronjobs from './cronjobs';
import methods from './methods';
import publications from './publications';


export default function () {
  config();
  startup();
  migrations();
  cronjobs();
  methods();
  publications();
}
