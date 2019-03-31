import React, { Component } from 'react';
import { requestTimetable } from './FFApiFactory';
import { FFDataModel } from "./FFDataModel";
import clubList from "./FitnessFirstClub";
import Loading from './Loading';
import { getFavouriteClubs, toggleFavouriteClub } from "./LocalStorageService";
import TimeTable from './TimeTable';
import ClubSelector from './ClubSelector';
import Footer from './Footer';
import styles from './App.module.css';
import emptyStar from './empty-star.png';
import starred from './star.png';

interface OwnProps {

}

interface OwnStates {
  loading: boolean;
  ffData: FFDataModel | null;
  club: string;
  starred: boolean;
}

const DEFAULT_CLUB = 'SPG';

class App extends Component<OwnProps, OwnStates> {
  constructor(props: OwnProps) {
    super(props);
    const lastFavouriteClub = getFavouriteClubs().pop();
    const qs = new URLSearchParams(window.location.search);
    const allFavouriteClubs = getFavouriteClubs();
    const club = qs.get('club') || lastFavouriteClub || DEFAULT_CLUB;
    this.state = {
      loading: true,
      ffData: null,
      club,
      starred: allFavouriteClubs.indexOf(club) >= 0,
    };
    requestTimetable(this.state.club)
      .then((output) => {
        this.setState({
          loading: false,
          ffData: output,
        });
      });
  }

  toggleFavourite = () => {
    toggleFavouriteClub(this.state.club);
    this.setState({
      starred: !this.state.starred,
    });
  }

  render() {
    const starImage = this.state.starred ? starred : emptyStar;
    return (
      <div className="App">
        <h2 className={styles.header}>
          <div><img src={starImage} className={styles.starImage} onClick={this.toggleFavourite}/>{clubList[this.state.club]} Timetable</div>
        </h2>
        <div style={{ marginBottom: '10px' }}>
          <ClubSelector selectedClub={this.state.club} favouriteClubs={getFavouriteClubs()}/>
        </div>
        {
          this.state.loading || !this.state.ffData ?
            <Loading /> : <TimeTable ffData={this.state.ffData} club={this.state.club} />
        }
        <Footer />
      </div>
    );
  }
}

export default App;
