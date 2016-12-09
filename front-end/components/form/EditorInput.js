import React, { Component, PropTypes } from 'react'
import CodeMirror from 'react-codemirror'
import '!style!css!less!../../node_modules/codemirror/lib/codemirror.css'
import '!style!css!less!../../node_modules/codemirror/theme/monokai.css'

import '../../node_modules/codemirror/mode/htmlmixed/htmlmixed'
import '../../node_modules/codemirror/mode/htmlembedded/htmlembedded'
import '../../node_modules/codemirror/mode/javascript/javascript'

class EditorInput extends React.Component {
    constructor(props) {
        super(props);
        const { form, value, name } = this.props;
        form[name] = value || '';
        this.state = {
            code: value || ''
        }
    }

    updateCode(newCode) {
        const { form, name } = this.props;
        this.setState({
            code: newCode,
        });
        form[name] = newCode || '';
    }

    render() {
        const { form, value, label, name, defaultValue, mode = 'javascript' } = this.props;
        const options = {
            lineNumbers: true,
            preserveScrollPosition: true,
            mode,
            theme: 'monokai',
        };

        return (
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <CodeMirror value={this.state.code}
                    onChange={this.updateCode.bind(this)}
                    options={options} />
            </div>
         );
    }
}

export default EditorInput;
