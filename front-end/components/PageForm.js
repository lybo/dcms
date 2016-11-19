import React, { Component, PropTypes } from 'react'
import PageLayout from './PageLayout'
import Spinner from './Spinner'
import Input from './form/Input'
import { redirect } from 'redux-router-director'
import moment from 'moment';
import '!style!css!less!./PageForm.less'
import { DEV_HOST, PROD_HOST } from '../constants/ActionTypes'


const DATE_FORMAT = 'DD/MM/YYYY';
const HOST = __DEV_HOST__ ? `${DEV_HOST}:3000` : `${PROD_HOST}:3000`;

class PageForm extends React.Component {
    constructor(props) {
        super(props);
        const { page, templates } = this.props;

        this.state = {
            // publicationStartDate: page.publicationStartDate,
            // publicationEndDate: page.publicationEndDate,
            selectedTemplate: templates.find(template => template.id === page.templateId) || null,
        };

        this.templateFields = {};
    }

    componentWillMount() {
        const { onLoadUsers } = this.props;
    }

    componentDidMount() {

        // $('#input-start-date').datetimepicker({
        //     format: DATE_FORMAT,
        //     defaultDate: parseInt(this.state.publicationStartDate) ?
        //         moment.unix(parseInt(this.state.publicationStartDate)) : 
        //         ''
        // });
        // $('#input-end-date').datetimepicker({
        //     useCurrent: false,
        //     format: DATE_FORMAT,
        //     defaultDate: parseInt(this.state.publicationEndDate) ?
        //         moment.unix(parseInt(this.state.publicationEndDate)) :
        //         ''
        // });
        // $('#input-start-date').on('dp.change', function (e) {
        //     $('#input-end-date').data("DateTimePicker").minDate(e.date);
        // });
        // $('#input-end-date').on('dp.change', function (e) {
        //     $('#input-start-date').data("DateTimePicker").maxDate(e.date);
        // });
    }

    componentWillUnmount() {
    }

    onSubmit(evt) {
        evt.preventDefault();   
    }

    onSave(goToList) {
        const { page, onAddPage, onUpdatePage, pagesNumber, onLoadPages } = this.props;
        const onSave = page.id !== '0' ? onUpdatePage : onAddPage;
        return (evt) => {
            evt.preventDefault();

            let content = {};
            this.state.selectedTemplate.fields.forEach((field) => {
                content[field.name] = this.templateFields[field.name]; 
            });

            onSave({
                    ...page,
                    content,
                    title: this.title.value,
                    published: this.isPublished.checked,
                    zIndex: page.id !== '0' ? page.zIndex : pagesNumber,
                    // publicationStartDate: moment(this.startInput.value, DATE_FORMAT).unix(),
                    // publicationEndDate: moment(this.endInput.value, DATE_FORMAT).unix(),
                    // zone: this.zone.value,
                    templateId: this.templateId.value,
                },
                (id) => {
                    !goToList && redirect(`/pages/${id}`);
                    goToList && redirect(`/pages`);
                });
        };
    }

    onChangeTemplate() {
        const { templates } = this.props;
        return (evt) => {
            const selectedTemplate = templates.find(item => item.id === evt.target.value) || null;
            this.setState({
                selectedTemplate  
            });
        };
    }

    render() {
        const { router, onClickLogout, auth_user, page, request, templates } = this.props;
        const { selectedTemplate } = this.state;

        const templateFields = selectedTemplate ? (
            <div>
                {selectedTemplate.fields.map((field, i) => {
                    return (
                        <Input key={field.name + i} 
                            form={this.templateFields}
                            value={page.content[field.name] || null}
                            type={field.input}
                            label={field.label} 
                            name={field.name} 
                            defaultValue={field.defaultValue} />
                    );
                })}
            </div>
        ) : (
            ''
        );

        const Form = (

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Page</h3>
                </div>
                <div className="panel-body">
                    <div className="form-area">  
                        <form role="form" className="clearfix" onSubmit={this.onSubmit.bind(this)}>

                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input ref="title" ref={(ref) => this.title = ref} defaultValue={page.title} type="text" className="form-control" id="title" name="title" placeholder="Title" />
                            </div>

                            <div className="checkbox">
                                <label htmlFor="isPublished">
                                    <input ref="isPublished" ref={(ref) => this.isPublished = ref} defaultChecked={page.published || false} type="checkbox" className="" name="isPublished" id="isPublished"/>
                                    isPublished
                                </label>
                            </div>
{/*
                            <div className="input-daterange input-group" id="event_period">
                                <input ref={(ref) => this.startInput = ref } type="text" className="input-sm form-control actual_range" name="start" id="input-start-date"/>
                                <span className="input-group-addon">to</span>
                                <input ref={(ref) => this.endInput = ref } type="text" className="input-sm form-control actual_range" name="end"  id="input-end-date"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="zone">Zone</label>
                                <select ref="zone" ref={(ref) => this.zone = ref} defaultValue={page.zone} className="form-control" id="zone">
                                    <option value="">Select zone</option>
                                    <option value="passive_page_alpha">Passive page (coffee wheel) - right</option>
                                </select>
                            </div>
*/}
                            <div className="form-group">
                                <label htmlFor="templateId">Template</label>
                                <select ref="templateId" 
                                        onChange={this.onChangeTemplate()}
                                        ref={(ref) => this.templateId = ref} 
                                        defaultValue={page.templateId} 
                                        className="form-control" 
                                        id="templateId">
                                    <option value="">Select template</option>

                                    {templates.map((template, i) => (
                                        <option key={`template-${template.id}`} value={template.id}>{template.title}</option>
                                    ))}
                                </select>
                            </div>

                            {selectedTemplate ? (
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">{`Template's Form`}</h3>
                                    </div>
                                    <div className="panel-body">
                                        <label>Guideline</label>
                                        <textarea value={selectedTemplate.description}
                                            rows="20"
                                            readOnly
                                            className="form-control"></textarea>
                                        <hr />
                                        {templateFields}
                                    </div>
                                </div>
                            ) : (
                                ''
                            )}


                            {request.error ? (
                                <div className="alert alert-danger">
                                    { 'Some fields are required' }
                                </div>
                            ) : ( '' )}

                            <p className="pull-right">
                                {page.id !== '0' ? (
                                    <a href={`${HOST}/#preview-${page.id}`} target="_blank" className="btn btn-warning">Preview</a>
                                ) : (
                                    ''
                                )}
                                &nbsp;
                                &nbsp;
                                <a href="#" name="submit" className="btn btn-primary" onClick={this.onSave(false)}>Save and Stay</a>
                                &nbsp;
                                &nbsp;
                                <a href="#" name="submit" className="btn btn-primary" onClick={this.onSave(true)}>Save and go back</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

        ); 
        
        return (
            <PageLayout router={router} onClickLogout={onClickLogout} auth_user={auth_user} >
                {Form}
            </PageLayout>        
         );
    }
}

export default PageForm;
