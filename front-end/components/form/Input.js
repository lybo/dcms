import React, { Component, PropTypes } from 'react'
import TextInput from './TextInput'
import TextareaInput from './TextareaInput'
import EditorInput from './EditorInput'
import ImageInput from './ImageInput'

class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { form, type, label, name, value, defaultValue } = this.props;

        switch (type) {
            case 'text':
                return (
                    <TextInput
                        value={value}
                        form={form}
                        label={label}
                        name={name}
                        defaultValue={defaultValue} />
                );

            case 'textarea':
                return (
                    <TextareaInput
                        value={value}
                        form={form}
                        label={label}
                        name={name}
                        defaultValue={defaultValue} />
                );

            case 'editor':
                return (
                    <EditorInput
                        value={value}
                        form={form}
                        label={label}
                        name={name}
                        defaultValue={defaultValue} />
                );

            case 'editorJavascript':
                return (
                    <EditorInput
                        value={value}
                        form={form}
                        label={label}
                        name={name}
                        defaultValue={defaultValue}
                        mode={'javascipt'} />
                );

            case 'editorHtml':
                return (
                    <EditorInput
                        value={value}
                        form={form}
                        label={label}
                        name={name}
                        defaultValue={defaultValue}
                        mode={'htmlmixed'} />
                );

            case 'image':
                return (
                    <ImageInput
                        value={value}
                        form={form}
                        label={label}
                        name={name}
                        defaultValue={defaultValue} />
                );

            default:
                return (
                    <TextInput
                        value={value}
                        form={form}
                        label={label}
                        name={name}
                        defaultValue={defaultValue} />
                );
        }

        return (
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <input ref={name}
                    ref={(ref) => form[name] = ref}
                    onChange={this.onChange()}
                    defaultValue={defaultValue || ''}
                    type="text"
                    className="form-control"
                    id={name}
                    name={name}
                    placeholder={label} />
            </div>
         );
    }
}

export default Input;
