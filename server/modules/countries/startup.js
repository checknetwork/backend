import {Countries} from '/models';

export default function () {
  Countries.upsert('us', {
    code: 'en-US',
    name: 'US (EN, English)',
    currName: 'US dollar',
    currSymbol: '$',
    currCode: 'USD',
    letters: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  });

  Countries.upsert('en', {
    code: 'en-EM',
    name: 'UK (EN, English)',
    currName: 'Great Britain pound',
    currSymbol: '£',
    currCode: 'GBP',
    letters: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  });
}
