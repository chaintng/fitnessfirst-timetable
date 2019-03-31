import React, { Component } from 'react';
import { requestTimetable } from './FFApiFactory';
import { FFDataModel } from "./FFDataModel";
import clubList from "./FitnessFirstClub";
import Loading from './Loading';
import TimeTable from './TimeTable';
import ClubSelector from './ClubSelector';
import styles from './App.module.css';

interface OwnProps {

}

interface OwnStates {
  loading: boolean;
  ffData: FFDataModel | null;
  club: string;
}

const DEFAULT_CLUB = 'AIA';

class App extends Component<OwnProps, OwnStates> {
  constructor(props: OwnProps) {
    super(props);
    const qs = new URLSearchParams(window.location.search);
    const club = qs.get('club') || DEFAULT_CLUB;
    this.state = {
      loading: true,
      ffData: null,
      club,
    };
    requestTimetable(this.state.club)
      .then((output) => {
        this.setState({
          loading: false,
          ffData: output,
        });
      });
  }

  render() {
    return (
      <div className="App">
        <h2 className={styles.header}>{clubList[this.state.club]} Time Table</h2>
        <div style={{ marginBottom: '10px' }}>
          <ClubSelector />
        </div>
        {
          this.state.loading || !this.state.ffData ?
            <Loading /> : <TimeTable ffData={this.state.ffData} club={this.state.club} />
        }
      </div>
    );
  }
}

export default App;
