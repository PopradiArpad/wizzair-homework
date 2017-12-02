import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import {} from '../../actions';

const FlightSelectI = ({ className, match }) => {
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
          <h5>{params.originAirport}</h5>
          <h5>{params.destinationAirport}</h5>
          <h5>{params.departureDate}</h5>
          <h5>{params.returnDate}</h5>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ flightSelect }) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export const FlightSelect = connect(mapStateToProps, mapDispatchToProps)(
  FlightSelectI
);
