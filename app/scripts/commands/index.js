import commander from '../commander';

import born from './born';
import kill from './kill';
import stats from './stats';
import places from './places';
import travel from './travel';
import vel from './vel';
import addresource from './addresource';
import delresource from './delresource';
import programs from './programs';
import reboot from './reboot';
import about from './about';

exports.run = commander({
  born,
  kill,
  vel,
  stats,
  places,
  travel,
  addresource,
  delresource,
  programs,
  reboot,
  about
}, [
  'stats',
  'vel',
  'born',
  'kill',
  'travel',
  'addresource',
  'delresource'
]);
