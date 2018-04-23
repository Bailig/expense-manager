import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';

import { updateField as updateFieldAction } from '../../modules/filteringForm';
import { FieldGroup } from '../components';

const FilteringForm = ({
  startDate,
  endDate,
  orderedProp,
  showDeposit,
  showWithdrawal,
  showBalance,
  updateField,
}) => {
  const formFields = {
    fieldGroups: [
      {
        id: 'filtering-form-start-date',
        type: 'date',
        label: 'Start Date',
        value: startDate,
        onChange: event => updateField({ prop: 'startDate', value: event.target.value }),
      },
      {
        id: 'filtering-form-end-date',
        type: 'date',
        label: 'End Date',
        value: endDate,
        onChange: event => updateField({ prop: 'endDate', value: event.target.value }),
      },
      {
        id: 'filtering-form-ordered-prop',
        componentClass: 'select',
        label: 'Order by',
        value: orderedProp,
        onChange: event => updateField({ prop: 'orderedProp', value: event.target.value }),
        options: [
          { value: '', text: 'Order' },
          { value: 'transactionDate', text: 'Transaction Date' },
          { value: 'description', text: 'Description' },
          { value: 'amount', text: 'Amount' },
        ],
      },
    ],
    checkboxes: [
      {
        id: 'show-deposit',
        label: 'Show Deposits',
        checked: showDeposit,
        onChange: event => updateField({ prop: 'showDeposit', value: event.target.checked }),
      },
      {
        id: 'show-withdrawal',
        label: 'Show Withdrawals',
        checked: showWithdrawal,
        onChange: event => updateField({ prop: 'showWithdrawal', value: event.target.checked }),
      },
      {
        id: 'show-balance',
        label: 'Show Balances',
        checked: showBalance,
        onChange: event => updateField({ prop: 'showBalance', value: event.target.checked }),
      },
    ],
  };

  const renderFieldGroups = () => {
    return formFields.fieldGroups.map(fieldGroup =>
      (<FieldGroup key={fieldGroup.id} {...fieldGroup} />));
  };
  const renderCheckboxes = () => {
    return formFields.checkboxes.map(({ id, label, ...props }) =>
      (<Checkbox key={id} id={id} {...props}>{label}</Checkbox>));
  };
  return (
    <form>
      {renderFieldGroups()}
      {renderCheckboxes()}
    </form>
  );
};

FilteringForm.defaultProps = {
  startDate: '',
  endDate: '',
  orderedProp: '',
};

FilteringForm.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  orderedProp: PropTypes.string,
  showDeposit: PropTypes.bool.isRequired,
  showWithdrawal: PropTypes.bool.isRequired,
  showBalance: PropTypes.bool.isRequired,
  updateField: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  filteringForm: {
    startDate,
    endDate,
    orderedProp,
    showDeposit,
    showWithdrawal,
    showBalance,
  },
}) => {
  return {
    startDate,
    endDate,
    orderedProp,
    showDeposit,
    showWithdrawal,
    showBalance,
  };
};

export default connect(mapStateToProps, { updateField: updateFieldAction })(FilteringForm);
