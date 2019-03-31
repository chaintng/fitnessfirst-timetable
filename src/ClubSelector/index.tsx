import React, { ChangeEvent } from 'react';
import clubList from '../FitnessFirstClub';
import { getFavouriteClubs } from "../LocalStorageService";
import styles from './ClubSelector.module.css'

interface OwnProps {
  selectedClub: string;
  favouriteClubs: Array<string>;
}

const ClubSelector = React.memo<OwnProps>((props) => {
  const onChange = (club: string) => {
    window.location.href = `/?club=${club}`;
  };

  const clubMenu = props.favouriteClubs.reverse().map((item) => {
    return <span style={{ marginRight: '5px' }} key={item}>[<a href={`/?club=${item}`}>{clubList[item]}</a>]</span>;
  });

  const allBranches = <select value={props.selectedClub} className={styles.select} onChange={(item: ChangeEvent<HTMLSelectElement>) => onChange(item.target.value)}>
    {
      Object.keys(clubList).map((item) => {
        return <option key={item} value={item}>{clubList[item]}</option>
      })
    }
  </select>

  return <div style={{ textAlign: 'center', margin: '10px' }}>
    <div style={{ marginBottom: '10px' }}><strong>Favourites:</strong> {clubMenu}</div>
    <div>All Branches: {allBranches}</div>
  </div>;
});

export default ClubSelector;