import React, { Component, PropTypes } from 'react'
import moment from 'moment';
import DatePickerInput from './DatePickerInput'
// import * as helper from './helper'

const DATE_FORMAT = 'DD/MM/YYYY';

class DateRangePickerInput extends React.Component {
    constructor(props) {
        super(props);
        const { form, startDateValue, endDateValue, name } = this.props;
        form[`start${name}`] = startDateValue || '';
        form[`end${name}`] = endDateValue || '';
        this.state = {
            startDateValue: form[`start${name}`],
            endDateValue: form[`end${name}`],
        };
    }
    componentDidMount() {
        const { form, name, onChange } = this.props;
        $(`#start${name}`).on('dp.change', function (e) {
            $(`#end${name}`)
                .data('DateTimePicker')
                .minDate(e.date);
        });
        $(`#end${name}`).on('dp.change', function (e) {
            $(`#start${name}`)
                .data('DateTimePicker')
                .maxDate(e.date);
        });
    }

    // validate() {
    //     const { isRequired, validate } = this.props;
    //     const { value } = this.state;
    //
    //     return helper.validate(value, validate, isRequired);
    // }

    render() {
        const { form, label, name, defaultValue, validate, isRequired } = this.props;
        const { startDateValue, endDateValue, } = this.state;

        return (
            <div className={`form-inline`}>
                <DatePickerInput
                    value={startDateValue}
                    form={form}
                    label={`start`}
                    name={`start${name}`}
                    validate={validate}
                    isRequired={isRequired} />
                <DatePickerInput
                    isEndDate={true}
                    value={endDateValue}
                    form={form}
                    label={`end`}
                    name={`end${name}`}
                    validate={validate}
                    isRequired={isRequired} />
            </div>
         );
    }
}

export default DateRangePickerInput;
