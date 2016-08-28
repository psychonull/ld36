import commander from '../commander';

import born from './born';
import kill from './kill';
import stats from './stats';
import travel from './travel';
import addresource from './addresource';
import delresource from './delresource';
import programs from './programs';
import reboot from './reboot';
import about from './about';

exports.run = commander({
  born,
  kill,
  stats,
  travel,
  addresource,
  delresource,
  programs,
  reboot,
  about
});
