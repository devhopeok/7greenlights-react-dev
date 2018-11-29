import React, { Component, PropTypes } from 'react';
import CounterField from './CounterField';
import moment from 'moment';
import Tooltip from 'components/Tooltip/Tooltip';
import { tooltipIds } from 'constants';

const getTimeRemaining = (endtime) => {
  let remaining = moment.duration(moment(endtime).local().diff(moment()));
  return remaining;
};

class ArenaCounter extends Component {
  constructor() {
    super();
    this.state = {
      remaining: moment.duration(0)
    };
  }

  componentWillMount() {
    const { endDate } = this.props;
    this.setState({ remaining: getTimeRemaining(endDate) });

    this.interval = setInterval(() => {
      this.setState({ remaining: this.state.remaining.subtract(1, 's') });
    }, 1000);
  }

  componentWillUpdate(nextProps, nextState) {
    const { remaining } = nextState;
    if (remaining.valueOf() < 0) {
      this.setState({ remaining: moment.duration(0) });
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render () {
    const { remaining } = this.state;
    const { version } = this.props;
    const isArenaPage = version == 'arena-page';
    return (
      <div className={`arena-counter ${isArenaPage && 'arena-page'} has-tooltip`}>
        <CounterField version={version} label="DAYS" value={remaining.days()} />
        <CounterField version={version} label="HRS" value={remaining.hours()} />
        <CounterField version={version} label="MIN"
          value={remaining.minutes()} />
        {
          isArenaPage &&
          <CounterField version={version} label="SEC"
            value={remaining.seconds()} />
        }
        <Tooltip tooltipId={tooltipIds.arenaTime} />
      </div>
    );
  }
}

ArenaCounter.propTypes = {
  endDate: PropTypes.string.isRequired,
  arenaId: PropTypes.number.isRequired,
  version: PropTypes.string,
};

export default ArenaCounter;
