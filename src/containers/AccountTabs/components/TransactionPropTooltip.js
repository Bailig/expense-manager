import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const TransactionPropTooltip = ({ transactionId, data, text }) => {
  if (!data) return '';
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id={`${transactionId}-${text}`}>{text}</Tooltip>}>
      <span>{data}</span>
    </OverlayTrigger>
  );
};

TransactionPropTooltip.defaultProps = {
  data: null,
};

TransactionPropTooltip.propTypes = {
  transactionId: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.string.isRequired,
};
