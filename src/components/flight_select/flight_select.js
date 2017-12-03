import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { RESET_FLIGHT_SELECT } from '../../actions';
import { TravelIata } from '../../types/travel';

class FlightSelectI extends Component {
  componentWillMount() {
    const params = this.props.match.params;
    this.props.onWillMount(
      new TravelIata(
        params.originIata,
        params.destinationIata,
        params.departureDate,
        params.returnDate
      )
    );
  }

  render() {
    const { className, match } = this.props;
    const classes = classNames('waFlightSelect', className);
    const params = match.params;

    return (
      <div className={classes}>
        <h1 className="title">Select Flights</h1>
        <div className="columns">
          <div className="column is-one-third">
            <h3>Summary</h3>
          </div>
          <div className="column">
            <h3>Flights</h3>
            <h5>{params.originIata}</h5>
            <h5>{params.destinationIata}</h5>
            <h5>{params.departureDate}</h5>
            <h5>{params.returnDate}</h5>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ flightSelect }) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onWillMount: travel => {
      dispatch({
        type: RESET_FLIGHT_SELECT,
        travel
      });
    }
  };
};

export const FlightSelect = connect(mapStateToProps, mapDispatchToProps)(
  FlightSelectI
);
