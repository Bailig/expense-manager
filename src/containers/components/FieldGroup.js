import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const FieldGroup = ({
  id, label, options, ...props
}) => {
  const renderControlLabel = () => {
    if (!label) return;
    return <ControlLabel>{label}</ControlLabel>;
  };
  const renderOptions = () => {
    if (!options) return;
    return options.map(({ value, text }) => (<option key={value} value={value}>{text}</option>));
  };
  return (
    <FormGroup controlId={id}>
      {renderControlLabel()}
      <FormControl {...props} >
        {renderOptions()}
      </FormControl>
    </FormGroup>
  );
};

FieldGroup.defaultProps = {
  label: undefined,
  options: undefined,
};

FieldGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired, text: PropTypes.string.isRequired,
  })),
};

