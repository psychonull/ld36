import commander from '../../commander';

import test from './test';

const runCmd = commander({
  test
});

export default [
  (cmd, term) => {
    runCmd(cmd, term);
  }, {
    prompt: 'gather>'
  }
];
