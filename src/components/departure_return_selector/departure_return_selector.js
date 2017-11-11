import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DateRangeSelector } from './date_range_selector';
import { DateLabel } from './date_label';

export class DepartureReturnSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departureDate: null,
      returnDate: null
    };
  }

  onDepartureLabelClick = () => {
    console.log('onDepartureLabelClick');
  };

  onReturnLabelClick = () => {
    console.log('onReturnLabelClick');
  };

  onDatesChange = (departureDate, returnDate) => {
    console.log(
      'DepartureReturnSelector onDatesChange',
      JSON.stringify({ departureDate, returnDate })
    );
    this.setState({ departureDate, returnDate });
  };

  render() {
    const classes = classNames(
      'fuiDepartureReturnSelector',
      this.props.className
    );
    const state = this.state;

    return (
      <div className={classes}>
        <div className="fuiDepartureReturnSelector__date_labels">
          <DateLabel
            date={state.departureDate}
            label="Departure"
            onClick={this.onDepartureLabelClick}
          />
          <DateLabel
            date={state.returnDate}
            label="Return"
            onClick={this.onReturnLabelClick}
          />
        </div>
        <DateRangeSelector onDatesChange={this.onDatesChange} />
      </div>
    );
  }
}

DepartureReturnSelector.propTypes = {
  className: PropTypes.string
};
