import React, { Component, PropTypes } from 'react'
import PageLayout from '../PageLayout/'
import FileManager from '../FileManager/'
import Spinner from '../Spinner/'
import { redirect } from 'redux-router-director'
import '!style!css!less!./style.less'
import { USER_ROLE } from '../../constants/Generic'
import i18n from 'yaml-import-loader!./i18n.yml'


const INPUTS = [
    'text',
    'textarea',
    'date',
    'rangeDate',
    'editor',
    'editorJavascript',
    'editorHtml',
    'richTextarea',
    'image',
];

const inputTranslations = {
    text: 'Text',
    textarea: 'Textarea',
    date: 'Date Picker',
    rangeDate: 'Range Date Picker',
    editor: 'Editor',
    editorJavascript: 'Editor - javascript',
    editorHtml: 'Editor - html',
    richTextarea: 'Rich textarea',
    image: 'Image',
};

const DATE_FORMAT = 'DD/MM/YYYY';

class TemplateForm extends React.Component {
    constructor(props) {
        super(props);
        const { template } = this.props;
        const fields = template ? template.fields : [];
        this.state = {
            field: {
                name: '',
                label: '',
                input: '',
                isRequired: false,
                defaultValue: '',
                options: []
            },
            fields
        };
    }

    componentWillUnmount() {
    }

    onSave() {
        const { template, onAddTemplate, onUpdateTemplate } = this.props;
        const onSave = template.id !== '0' ? onUpdateTemplate : onAddTemplate;
        return (evt) => {
            evt.preventDefault();

            onSave({
                    ...template,
                    title: this.title.value,
                    description: this.description.value,
                    allowInsert: this.allowInsert.value,
                    allowUpdate: this.allowUpdate.value,
                    allowDelete: this.allowDelete.value,
                    fields: this.state.fields,
                },
                () => {
                    redirect('/templates');
                });
        };
    }

    updateFieldName(i) {
        return (evt) => {
            let fields = this.state.fields;
            fields[i].name = evt.target.value;
            this.setState({
                fields
            });
        };
    }

    updateFieldLabel(i) {
        return (evt) => {
            let fields = this.state.fields;
            fields[i].label = evt.target.value;
            this.setState({
                fields
            });
        };
    }

    updateFieldInput(i) {
        return (evt) => {
            let fields = this.state.fields;
            fields[i].input = evt.target.value;
            this.setState({
                fields
            });
        };
    }

    updateFieldIsRequired(i) {
        return (evt) => {
            let fields = this.state.fields;
            fields[i].isRequired = evt.target.checked;
            this.setState({
                fields
            });
        };
    }

    removeField(i) {
        return (evt) => {
            evt.preventDefault();

            const fields = this.state.fields.filter((feat, index) => {
                return index !== i;
            });
            this.setState({
                fields
            });
        };
    }

    addField(evt) {
        return (evt) => {
            evt.preventDefault();

            let fields = this.state.fields;
            fields.push({
                name: this.field_name.value,
                label: this.field_label.value,
                input: this.field_input.value,
                isRequired: this.field_isRequired.checked,
            });
            this.field_name.value = '';
            this.field_label.value = '';
            this.field_input.value = '';
            this.field_isRequired.checked = false;
            this.setState({
                fields,
                field: {
                    name: '',
                    label: '',
                    input: '',
                    isRequired: false,
                }
            });
        };
    }

    render() {
        const { cmsName, router, onClickLogout, auth_user, template, request } = this.props;

        const FieldAdd = (
            <div className="form-inline clearfix">
                <div className="form-group">
                    <label>{i18n.TemplateForm.name}</label>
                    <input ref={(ref) => this.field_name = ref} defaultValue={this.state.field.name || ''} type="text" className="form-control" name="field-name" placeholder="Name" />
                </div>
                <div className="form-group">
                    <label>{i18n.TemplateForm.label}</label>
                    <input ref={(ref) => this.field_label = ref} defaultValue={this.state.field.label || ''} type="text" className="form-control" name="field-label" placeholder="Label" />
                </div>
                <div className="form-group">
                    <label>&nbsp;{i18n.TemplateForm.input}</label>
                    <select ref={(ref) => this.field_input = ref} defaultValue={this.state.field.input || ''} className="form-control" name="field-input">
                        <option value="">Select input type</option>
                        {INPUTS.map((inputKey) => {
                            return (
                                <option key={`add-${inputKey}`} value={inputKey}>{inputTranslations[inputKey]}</option>
                            );
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label>IsRequired</label>
                    <input ref={(ref) => this.field_isRequired = ref} defaultChecked={this.state.field.isRequired || false} type="checkbox" className="form-control" name="field-isRequired" placeholder="IsRequired" />
                </div>
                <a href="#" className="btn btn-primary pull-right" onClick={this.addField()}>Add</a>
            </div>
        );

        const Fields = this.state.fields.map((field, i) => {
            return (
                <div className="form-inline field-edit" key={`field-${i}`}>
                    <div className="form-group">
                        <label>{i18n.TemplateForm.name}</label>
                        <input onChange={this.updateFieldName(i)} defaultValue={field.name || ''} type="text" className="form-control" name="field-name[i]" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <label>{i18n.TemplateForm.label}</label>
                        <input onChange={this.updateFieldLabel(i)} defaultValue={field.label || ''} type="text" className="form-control" name="field-label[i]" placeholder="Label" />
                    </div>
                    <div className="form-group">
                        <label>&nbsp;{i18n.TemplateForm.input}</label>
                        <select onChange={this.updateFieldInput(i)} defaultValue={field.input || ''} className="form-control"  name="field-input[i]">
                            <option value="">Select input type</option>
                            {INPUTS.map((inputKey) => {
                                return (
                                    <option key={`update-${inputKey}`} value={inputKey}>{inputTranslations[inputKey]}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>IsRequired</label>
                        <input onChange={this.updateFieldIsRequired(i)} defaultChecked={field.isRequired || false} type="checkbox" className="form-control" name="field-isRequired[i]" placeholder="IsRequired" />
                    </div>
                    <a href="#" className="btn btn-danger pull-right" onClick={this.removeField(i)}>Remove</a>
                </div>
            );
        });

        const Form = !request.status ? (

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Template</h3>
                </div>
                <div className="panel-body">
                    <div className="form-area">
                        <form role="form" className="clearfix" onSubmit={this.onSave()}>

                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input ref="title" ref={(ref) => this.title = ref} defaultValue={template.title} type="text" className="form-control" id="title" name="title" placeholder="Title" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea ref="description" ref={(ref) => this.description = ref} defaultValue={template.description} type="text" className="form-control" id="description" name="description" placeholder="Description" rows="12"></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="role">allowInsert</label>
                                <select ref="role" ref={(ref) => this.allowInsert = ref} defaultValue={template.allowInsert} className="form-control" id="allowInsert">
                                    <option value="">Select role</option>

                                    {USER_ROLE.map((role, i) => (
                                        <option key={`allowInsert-${role}`} value={i}>{role}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="role">allowUpdate</label>
                                <select ref="role" ref={(ref) => this.allowUpdate = ref} defaultValue={template.allowUpdate} className="form-control" id="allowUpdate">
                                    <option value="">Select role</option>

                                    {USER_ROLE.map((role, i) => (
                                        <option key={`allowUpdate-${role}`} value={i}>{role}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="role">allowDelete</label>
                                <select ref="role" ref={(ref) => this.allowDelete = ref} defaultValue={template.allowDelete} className="form-control" id="allowDelete">
                                    <option value="">Select role</option>

                                    {USER_ROLE.map((role, i) => (
                                        <option key={`allowDelete-${role}`} value={i}>{role}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="panel panel-default">
                                <div className="panel-heading">Add/edit the custom fields for that template</div>
                                <div className="panel-body features">
                                    <div className="panel panel-default feature-add">
                                        {FieldAdd}
                                    </div>
                                    {Fields}
                                </div>
                            </div>

                            {request.error ? (
                                <div className="alert alert-danger">
                                    {i18n.TemplateForm.validation.Validation.fieldsRequired}
                                </div>
                            ) : ( '' )}
                            <button type="submit" id="submit" name="submit" className="btn btn-primary pull-right">Save</button>
                        </form>
                    </div>
                </div>
            </div>

        ) : (

            <div>
                <Spinner />
            </div>
        );

        return (
            <PageLayout cmsName={cmsName} router={router} onClickLogout={onClickLogout} auth_user={auth_user} >
                {Form}
            </PageLayout>
         );
    }
}

export default TemplateForm;
