
export const getDistance = (d) => {
  return [
    undefined,
    'near',
    'middle',
    'far',
    'far far far away'
  ][d] || 'N/A';
};

export const getRisk = (r) => {
  return [
    undefined,
    'low',
    'medium',
    'high'
  ][r] || 'N/A';
};

export const formatYear = (y) => {
  return `${Math.abs(y)} ${(y < 0 ? 'B.C.' : 'A.C.')}`;
};
