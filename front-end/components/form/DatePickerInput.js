import React, { Component, PropTypes } from 'react'
import moment from 'moment';
import * as helper from './helper'
import conf from 'yaml-import-loader!./conf.yml'

const DATE_FORMAT = conf.DatePickerInput.dateFormat;

class DatePickerInput extends React.Component {
    constructor(props) {
        super(props);
        const { form, value, name } = this.props;
        form[name] = value || '';
        this.state = {
            value: form[name],
        };
    }
    componentDidMount() {
        const { form, name, onChange, isEndDate, additionalSettings } = this.props;
        const $el = $(`#${name}`);
        const defaultOptions = {
            format: (additionalSettings && additionalSettings.dateFormat) ? additionalSettings.dateFormat : DATE_FORMAT,
            showClear: true,
            defaultDate: parseInt(this.state.value) ?
                moment.unix(parseInt(this.state.value)) :
                ''
        };

        const options = isEndDate ?
            Object.assign({}, defaultOptions, {
                useCurrent: false,
            }) :
            defaultOptions;

        $el.datetimepicker(options);

        $el.on('dp.change',  (e) => {
            const value = e.date ? e.date.unix() || '' : '';
            onChange && onChange(value);
            form[name] = value;
            this.setState({
                value,
            });
        });
    }

    validate() {
        const { isRequired, validate } = this.props;
        const { value } = this.state;

        return helper.validate(value, validate, isRequired);
    }

    render() {
        const { form, label, name, defaultValue } = this.props;
        const { value } = this.state;

        const isValid = this.validate();

        return (
            <div className={`form-inline ${isValid ? '' : 'has-error'}`}>
                <label htmlFor={name}>{label}</label>
                <br />
                <div className="input-group date">
                    <input ref={name}
                        ref={(ref) => this.input = ref}
                        type="text"
                        className="form-control"
                        name={name}
                        id={name}
                        placeholder={label} />
                    <span className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
                {isValid ? (
                    ''
                ) : (
                    <span className="help-block">This field is required</span>
                )}
            </div>
         );
    }
}

export default DatePickerInput;
