import React, { Component } from 'react';
import { Class, FFDataModel } from "../FFDataModel";
import clubList from "../FitnessFirstClub";
import styles from './TimeTable.module.css';

interface OwnProps {
  ffData: FFDataModel;
  club: string;
}

interface OwnStates {
  showPastClasses: boolean;
}

function renderUpcomingClasses(classes: Class[]) {
  return classes.map((item: Class) => {
    return <li className={styles.li}>
      <div className={styles.classImage}><img src={`https://fitnessfirst.co.th${item.Image}`} /></div>
      <div className={styles.classDescription}>
        <div><label>Class:</label> {item.Title}</div>
        <div><label>Time:</label> {item.TimeText}</div>
        <div><label>Instructor:</label> {item.Instructor}</div>
      </div>
    </li>
  })
}

class TimeTable extends Component<OwnProps, OwnStates>{
  constructor(props: OwnProps) {
    super(props);
    this.state = {
      showPastClasses: false,
    }
  }

  toggleShowPastClasses() {
    this.setState({
      showPastClasses: !this.state.showPastClasses,
    });
  }

  renderShowPastClassesToggle() {
    return <div style={{ textAlign: 'center' }}>
      <label style={{ fontWeight: 'bold' }}>Show past classes? </label>
      <a href="#" onClick={() => this.toggleShowPastClasses()}>{this.state.showPastClasses ? "Don't Show" : "Show All"}</a>
    </div>
  }
  render() {
    const now = new Date();

    let filteredClasses = this.props.ffData.classes;

    if (!this.state.showPastClasses) {
      filteredClasses = filteredClasses.filter((item) => {
        return item.EndTime > now;
      })
    }

    return <div>
      <div style={{textAlign: 'center', marginBottom: '10px'}}>Current Time: {now.toLocaleString()}</div>
      {this.renderShowPastClassesToggle()}
      <ul className={styles.ul}>
        {renderUpcomingClasses(filteredClasses)}
      </ul>
    </div>
  }
};

export default TimeTable;