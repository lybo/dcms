import React, { Component, PropTypes } from 'react'
import TextInput from './TextInput'
import SelectInput from './SelectInput'
import TextareaInput from './TextareaInput'
import EditorInput from './EditorInput'
import ImageInput from './ImageInput'
import DatePickerInput from './DatePickerInput'
import DateRangePickerInput from './DateRangePickerInput'

class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onChange, form, type, label, name, value,
            defaultValue, isRequired, validate,
            options, emptyValueLabel } = this.props;

        switch (type) {
            case 'text':
                return (
                    <TextInput
                        onChange={onChange}
                        value={value}
                        form={form}
                        label={label}
                        name={name}
                        defaultValue={defaultValue}
                        validate={validate}
                        isRequired={isRequired} />
                );

            case 'textarea':
                return (
                    <TextareaInput
                        onChange={onChange}
                        value={value}
                        form={form}
                        label={label}
                        name={name}
                        defaultValue={defaultValue}
                        validate={validate}
                        isRequired={isRequired} />
                );

            case 'select':
                return (
                    <SelectInput
                        onChange={onChange}
                        emptyValueLabel={emptyValueLabel}
                        options={options}
                        value={value}
                        form={form}
                        label={label}
                        name={name}
                        defaultValue={defaultValue}
                        validate={validate}
                        isRequired={isRequired} />
                );

            case 'date':
                return (
                    <DatePickerInput
                        onChange={onChange}
                        value={value}
                        form={form}
                        label={label}
                        name={name}
                        defaultValue={defaultValue}
                        validate={validate}
                        isRequired={isRequired} />
                );

            case 'rangeDate':
                const { startDateValue, endDateValue } = this.props;
                return (
                    <DateRangePickerInput
                        startDateValue={startDateValue}
                        endDateValue={endDateValue}
                        form={form}
                        name={name}
                        validate={validate}
                        isRequired={isRequired} />
                );


            case 'editor':
                return (
                    <EditorInput
                        onChange={onChange}
                        value={value}
                        form={form}
                        label={label}
                        name={name}
                        defaultValue={defaultValue}
                        validate={validate}
                        isRequired={isRequired} />
                );

            case 'editorJavascript':
                return (
                    <EditorInput
                        onChange={onChange}
                        value={value}
                        form={form}
                        label={label}
                        name={name}
                        defaultValue={defaultValue}
                        isRequired={isRequired}
                        validate={validate}
                        mode={'javascript'} />
                );

            case 'editorHtml':
                return (
                    <EditorInput
                        onChange={onChange}
                        value={value}
                        form={form}
                        label={label}
                        name={name}
                        defaultValue={defaultValue}
                        isRequired={isRequired}
                        validate={validate}
                        mode={'htmlmixed'} />
                );

            case 'image':
                return (
                    <ImageInput
                        onChange={onChange}
                        value={value}
                        form={form}
                        label={label}
                        name={name}
                        defaultValue={defaultValue}
                        validate={validate}
                        isRequired={isRequired} />
                );

            default:
                return (
                    <TextInput
                        onChange={onChange}
                        value={value}
                        form={form}
                        label={label}
                        name={name}
                        defaultValue={defaultValue}
                        validate={validate}
                        isRequired={isRequired} />
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
