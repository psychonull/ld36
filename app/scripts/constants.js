const _categories = ['EXPLORATION', 'GATHER', 'ENSLAVE', 'BUILD'];
const CATEGORY = _categories.reduce( (obj, key) => { obj[key] = key; return obj; }, {});

exports.CATEGORY = CATEGORY;
