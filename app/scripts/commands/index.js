import commander from '../commander';

import born from './born';
import kill from './kill';
import stats from './stats';
import places from './places';
import travel from './travel';
import addresource from './addresource';
import delresource from './delresource';
import programs from './programs';
import reboot from './reboot';
import about from './about';

const commands = {
  born,
  kill,
  stats,
  places,
  travel,
  addresource,
  delresource,
  programs,
  reboot,
  about
};

const hidden = [
  'born',
  'kill',
  'travel',
  'addresource',
  'delresource'
];

exports.run = commander(commands, hidden);
exports.visible = Object.keys(commands).filter((c) => hidden.indexOf(c) === -1);
