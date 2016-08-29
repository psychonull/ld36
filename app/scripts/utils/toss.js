import Chance from 'chance';
const chance = new Chance();

// This random is not so good
exports.getRndSlaves = function(currents, howMany) {
  const types = chance.shuffle(['childs', 'adults', 'ageds']);

  let result = {};
  let total = 0;
  types.some( t => {
    if (currents[t] > 0){
      let max = currents[t] > howMany ? howMany : currents[t];
      total += result[t] = chance.integer({min: Math.min(currents[t], howMany), max });
      if (total > howMany) {
        result[t] -= (total - howMany);
        result[t] = result[t] < 0 ? 0 : result[t];
        return true;
      }
    }
  });

  return result;
}

exports.getRndSlavesAny = function(howMany) {
  const types = chance.shuffle(['childs', 'adults', 'ageds']);

  let result = {};
  let total = 0;
  types.forEach( (t, i) => {
    let val = (howMany > total ? (howMany - total) : 0);
    if (i < 2 && val > 0){
      val = chance.integer({min: 1, max: val || (total - howMany) });
    }

    result[t] = val;
    total += val;
  });

  return result;
}
