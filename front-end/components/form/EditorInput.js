import React, { Component, PropTypes } from 'react'
import * as helper from './helper'
import CodeMirror from 'react-codemirror'
import '!style!css!less!../../node_modules/codemirror/lib/codemirror.css'
import '!style!css!less!../../node_modules/codemirror/theme/monokai.css'
import '!style!css!less!./editor.less'

import '../../node_modules/codemirror/mode/htmlmixed/htmlmixed'
import '../../node_modules/codemirror/mode/htmlembedded/htmlembedded'
import '../../node_modules/codemirror/mode/javascript/javascript'

class EditorInput extends React.Component {
    constructor(props) {
        super(props);
        const { form, value, name } = this.props;
        form[name] = value || '';
        this.state = {
            value: form[name],
        };
    }

    updateCode(newValue) {
        const { form, name } = this.props;
        this.setState({
            value: newValue,
        });
        form[name] = newValue || '';
    }

    validate() {
        const { isRequired, validate } = this.props;
        const { value } = this.state;

        return helper.validate(value, validate, isRequired);
    }

    render() {
        const { form, label, name, defaultValue, mode = 'javascript' } = this.props;
        const { value } = this.state;

        const isValid = this.validate();

        const options = {
            lineNumbers: true,
            preserveScrollPosition: true,
            mode,
            theme: 'monokai',
            viewportMargin: Infinity,
        };

        return (
            <div className={`form-group ${isValid ? '' : 'has-error'}`}>
                <label htmlFor={name}>{label}</label>
                <CodeMirror value={value}
                    onChange={this.updateCode.bind(this)}
                    options={options} />
                {isValid ? (
                    ''
                ) : (
                    <span className="help-block">This field is required</span>
                )}
            </div>
         );
    }
}

export default EditorInput;
