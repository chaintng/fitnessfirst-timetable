import React, { Component } from 'react';
import { Class, FFDataModel } from "../FFDataModel";
import styles from './TimeTable.module.css';
import { getFFDateFormat } from '../FFApiFactory';

interface OwnProps {
  ffData: FFDataModel;
  club: string;
}

interface OwnStates {
  showPastClasses: boolean;
  displayTomorrow: boolean;
}


const displayDateFormat = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

function renderUpcomingClasses(classes: Class[]) {
  if (classes.length === 0) {
    return <div style={{ textAlign: 'center' }}>No class available left for today.</div>
  }

  return classes.map((item: Class) => {
    return <li className={styles.li}>
      <div className={styles.classImage}><img src={`https://fitnessfirst.co.th${item.Image}`} /></div>
      <div className={styles.classDescription}>
        <div><label>Class:</label> {item.Title}</div>
        <div><label>Time:</label> {item.TimeText}</div>
        <div><label>Instructor:</label> {item.Instructor}</div>
        <div><label>Studio:</label> {item.Studio}</div>
      </div>
    </li>
  })
}

class TimeTable extends Component<OwnProps, OwnStates>{
  constructor(props: OwnProps) {
    super(props);
    this.state = {
      showPastClasses: false,
      displayTomorrow: false,
    }
  }

  toggleShowPastClasses() {
    this.setState({
      showPastClasses: !this.state.showPastClasses,
    });
  }

  renderShowPastClassesToggle() {
    return <div style={{ textAlign: 'center', marginBottom: '10px' }}>
      <label style={{ fontWeight: 'bold' }}>Show past classes? </label>
      <a href="#" onClick={() => this.toggleShowPastClasses()}>{this.state.showPastClasses ? "Don't Show" : "Show All"}</a>
    </div>
  }

  toggleTomorrow = () => {
    this.setState({
      displayTomorrow: !this.state.displayTomorrow,
    });
  }

  render() {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate()+1);

    let filteredClasses = this.state.displayTomorrow ? this.props.ffData.classes.tomorrow : this.props.ffData.classes.today;

    if (!this.state.showPastClasses) {
      filteredClasses = filteredClasses.filter((item) => {
        return now < new Date(item.StartTime.getTime() + (1000 * 60 * 15));
      })
    }

    return <div>
      <div style={{textAlign: 'center', marginBottom: '10px'}}>
        {this.state.displayTomorrow ?
          <span>Date: {tomorrow.toLocaleString('en-US', displayDateFormat)} (<a href="#" onClick={this.toggleTomorrow}>Today</a>)</span>
          : <span>Date: {now.toLocaleString('en-US', displayDateFormat)} ({<a href="#" onClick={this.toggleTomorrow}>Tomorrow</a>})</span>
        }
      </div>

      {this.renderShowPastClassesToggle()}
      <ul className={styles.ul}>
        {renderUpcomingClasses(filteredClasses)}
      </ul>
    </div>
  }
};

export default TimeTable;