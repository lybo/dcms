import React, { Component, PropTypes } from 'react'
import * as helper from './helper'

class SelectInput extends React.Component {
    constructor(props) {
        super(props);
        const { form, value, name } = this.props;
        form[name] = value || '';
        this.state = {
            value: form[name],
        };
    }

    onChange() {
        const { onChange, form, name } = this.props;
        return (evt) => {
            const value = evt.target.value || '';
            onChange && onChange(value);
            form[name] = value;
            this.setState({
                value,
            });
        };
    }

    validate() {
        const { isRequired, validate } = this.props;
        const { value } = this.state;

        return helper.validate(value, validate, isRequired);
    }

    render() {
        const { form, label, name, defaultValue, options, emptyValueLabel } = this.props;
        const { value } = this.state;

        const isValid = this.validate();

        return (
            <div className={`form-group ${isValid ? '' : 'has-error'}`}>
                <label htmlFor={name}>{label}</label>
                <select ref={(ref) => this.input = ref}
                        onChange={this.onChange()}
                        defaultValue={value || defaultValue || ''}
                        className="form-control"
                        id={name}>
                    <option value="">{emptyValueLabel}</option>

                    {options.map((option, i) => (
                        <option key={`${name}-${option.id}`} value={option.id}>{option.title}</option>
                    ))}
                </select>
                {isValid ? (
                    ''
                ) : (
                    <span className="help-block">This field is required</span>
                )}
            </div>
         );
    }
}

export default SelectInput;
