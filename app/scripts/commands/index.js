import commander from '../commander';

import born from './born';
import kill from './kill';
import stats from './stats';
import addresource from './addresource';
import delresource from './delresource';
import programs from './programs';

exports.run = commander({
  born,
  kill,
  stats,
  addresource,
  delresource,
  programs
});
