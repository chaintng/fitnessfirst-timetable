import React from 'react';
import clubList from '../FitnessFirstClub';

const ClubSelector = React.memo<any>(() => {
  const clubMenu = Object.keys(clubList).map((item) => {
    return <span style={{ marginRight: '5px' }} key={item}>[<a href={`/?club=${item}`}>{clubList[item]}</a>]</span>;
  });
  return <div style={{ textAlign: 'center' }}>
    <h3>Club Selector</h3>
    {clubMenu}
  </div>;
});

export default ClubSelector;