import {Countries} from '/models';

export default function () {
  Countries.upsert('en', {code: 'en-EN'});
}
