
export const getDistance = (d) => {
  return [
    undefined,
    'near',
    'middle',
    'far',
    'too far'
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

export const getDirection = (d) => {
  switch(d){
    case 'W': return 'West';
    case 'N': return 'North';
    case 'S': return 'South';
    case 'E': return 'East';
    default: return 'N/A';
  }
};

export const formatYear = (y) => {
  return `${Math.abs(y)} ${(y < 0 ? 'B.C.' : 'A.C.')}`;
};
