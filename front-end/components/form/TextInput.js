import React, { Component, PropTypes } from 'react'
import * as helper from './helper'

class TextInput extends React.Component {
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
        const { form, label, name, defaultValue } = this.props;
        const { value } = this.state;

        const isValid = this.validate();

        return (
            <div className={`form-group ${isValid ? '' : 'has-error'}`}>
                <label htmlFor={name}>{label}</label>
                <input ref={name}
                    ref={(ref) => this.input = ref}
                    onChange={this.onChange()}
                    defaultValue={value || defaultValue || ''}
                    type="text"
                    className="form-control"
                    id={name}
                    name={name}
                    placeholder={label} />
                {isValid ? (
                    ''
                ) : (
                    <span className="help-block">This field is required</span>
                )}
            </div>
         );
    }
}

export default TextInput;
