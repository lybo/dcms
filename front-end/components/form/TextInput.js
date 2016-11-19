import React, { Component, PropTypes } from 'react'

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        const { form, value, name } = this.props;
        form[name] = value || '';
    }

    onChange() {
        const { onChange, form, name } = this.props;
        return (evt) => {
            onChange && onChange(evt.target.value || '');
            form[name] = evt.target.value || '';
        };
    }

    render() {
        const { form, value, label, name, defaultValue } = this.props;

        return (
            <div className="form-group">
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
            </div>
         );
    }
}

export default TextInput;
