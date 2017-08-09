import React, { Component, PropTypes } from 'react'
import PageLayout from '../PageLayout/'
import StickyMessage from '../StickyMessage/'
import Input from '../form/Input'
import { redirect } from 'redux-router-director'
import moment from 'moment';
import '!style!css!less!./style.less'
import { DEV_HOST, PROD_HOST } from '../../constants/Generic'


const DATE_FORMAT = 'DD/MM/YYYY';
const HOST = __DEV_HOST__ ? `${DEV_HOST}` : `${PROD_HOST}`;
const requiredFields = ['title', 'templateId'];

class PageForm extends React.Component {
    constructor(props) {
        super(props);
        const { page, templates, request } = this.props;

        this.state = {
            // publicationStartDate: page.publicationStartDate,
            // publicationEndDate: page.publicationEndDate,
            selectedTemplate: templates.find(template => template.id === page.templateId) || null,
            isValid: true,
            isSaved: false,
        };

        this.fields = {};
        this.templateFields = {};
        this.requestNumber = request.counter;
    }

    componentWillMount() {
        const { onLoadUsers } = this.props;
    }

    componentWilliUnmount() {
        this.timeout && clearTimeout(this.timeout);
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

    componentWillReceiveProps(nextProps) {
        const { request } = nextProps;
        const { router } = this.props;
        const endOfRequest = request.counter !== this.requestNumber && !request.status;
        const validResponse = endOfRequest && request.response;
        const isEditMode = !router.params.parentId;
        if (validResponse) {
            this.onResponse(isEditMode, request.response);
        }
    }

    onResponse(isEditMode, response) {
        const { goToList } = this;
        const { parentPage } = this.props;
        const { pageId } = response;
        if (isEditMode && !goToList) {
            this.setState({
                isSaved: true
            });
            this.timeout = setTimeout(() => {
                this.setState({
                    isSaved: false
                });
            }, 3000);
            return;
        }
        !goToList && redirect(`/pages/edit/${pageId}`);
        goToList && redirect(`/pages/${parentPage.id}`);
    }

    onSubmit(evt) {
        evt.preventDefault();
    }

    onClickDoNothing(evt) {
        evt.preventDefault();
    }

    onSave(goToList) {
        const { parentPage, page, onAddPage, onUpdatePage, pagesNumber, onLoadPages, request } = this.props;
        const onSave = page.id !== '0' ? onUpdatePage : onAddPage;
        return (evt) => {
            evt.preventDefault();

            let content = {};
            let isValid = true;
            requiredFields.forEach((inputKey) => {
                if (this.fields[inputKey].trim() === '') {
                    isValid = false;
                }
            });

            if (this.state.selectedTemplate) {
                this.state.selectedTemplate.fields.forEach((field) => {
                    if (field.input !== 'rangeDate') {
                        const value = this.templateFields[field.name];
                        content[field.name] = value;
                        if (field.isRequired && value !== undefined && value === '') {
                            isValid = false;
                        }
                    }

                    if (field.input === 'rangeDate') {
                        [`start${field.name}`, `end${field.name}`].forEach(name => {
                            const value = this.templateFields[name];
                            content[name] = value;
                            if (field.isRequired && value !== undefined && value === '') {
                                isValid = false;
                            }
                        });

                    }
                });
            }

            this.setState({
                isValid
            });

            if (!isValid) {
                return;
            }

            this.requestNumber = request.counter;
            this.goToList = goToList;

            onSave({
                    ...page,
                    content,
                    parentId: parentPage.id,
                    path: [...parentPage.path, parentPage.id],
                    title: this.fields['title'],
                    published: this.isPublished.checked,
                    isMainNode: this.isMainNode.checked,
                    zIndex: page.id !== '0' ? page.zIndex : pagesNumber,
                    // publicationStartDate: moment(this.startInput.value, DATE_FORMAT).unix(),
                    // publicationEndDate: moment(this.endInput.value, DATE_FORMAT).unix(),
                    // zone: this.zone.value,
                    templateId: this.fields['templateId'],
                });
        };
    }

    onChangeTemplate(value) {
        const { templates } = this.props;
        const selectedTemplate = templates.find(item => item.id === value) || null;
        this.setState({
            selectedTemplate
        });
    }

    render() {
        const { cmsName, router, onClickLogout, auth_user, page, request, templates, mainPages } = this.props;
        const { selectedTemplate, isValid, isSaved } = this.state;

        const templateFields = selectedTemplate ? (
            <div>
                {selectedTemplate.fields.map((field, i) => {
                    let additionalSettings = {};
                    try {
                        additionalSettings = JSON.parse(field.additionalSettings);
                    } catch(e) {

                    }
                    if (field.input !== 'rangeDate') {
                        return (
                            <Input key={field.name + i}
                                form={this.templateFields}
                                value={page.content[field.name] || null}
                                type={field.input}
                                label={field.label}
                                name={field.name}
                                defaultValue={field.defaultValue}
                                additionalSettings={additionalSettings}
                                validate={!!!isValid}
                                isRequired={field.isRequired} />
                        );
                    }

                    if (field.input === 'rangeDate') {
                        return (
                            <Input key={field.name + i}
                                form={this.templateFields}
                                startDateValue={page.content[`start${field.name}`] || null}
                                endDateValue={page.content[`end${field.name}`] || null}
                                type={field.input}
                                label={field.label}
                                name={field.name}
                                defaultValue={field.defaultValue}
                                additionalSettings={additionalSettings}
                                validate={!!!isValid}
                                isRequired={field.isRequired} />
                        );
                    }
                })}
            </div>
        ) : (
            ''
        );

        const Form = (

            <div className="panel panel-default">
                {isSaved ? (
                    <StickyMessage>{ 'Page is saved successfully' }</StickyMessage>
                ) : (
                    ''
                ) }
                <div className="panel-heading">
                    <h3 className="panel-title">Page</h3>
                </div>
                <div className="panel-body">
                    <div className="form-area">
                        <form role="form" className="clearfix" onSubmit={this.onSubmit.bind(this)}>

                            <Input
                                form={this.fields}
                                value={page.title}
                                type={'text'}
                                label={'Title'}
                                name={'title'}
                                defaultValue={''}
                                validate={!!!isValid}
                                isRequired={requiredFields.indexOf('title') !== -1} />

                            <div className="checkbox">
                                <label htmlFor="isPublished">
                                    <input ref="isPublished" ref={(ref) => this.isPublished = ref} defaultChecked={page.published || false} type="checkbox" className="" name="isPublished" id="isPublished"/>
                                    isPublished
                                </label>
                            </div>

                            <div className="checkbox">
                                <label htmlFor="isMainNode">
                                    <input ref="isMainNode" ref={(ref) => this.isMainNode = ref} defaultChecked={page.isMainNode || false} type="checkbox" className="" name="isMainNode" id="isMainNode"/>
                                    isMainNode
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
                            <Input
                                form={this.fields}
                                emptyValueLabel={'Select template'}
                                options={templates}
                                onChange={this.onChangeTemplate.bind(this)}
                                value={page.templateId}
                                type={'select'}
                                label={'Template'}
                                name={'templateId'}
                                defaultValue={''}
                                validate={!!!isValid}
                                isRequired={requiredFields.indexOf('templateId') !== -1} />

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


                            {request.error || !isValid ? (
                                <div className="alert alert-danger">
                                    { 'Some fields are required' }
                                </div>
                            ) : ( '' )}

                            {!request.status ? (
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
                            ) : (
                                <p className="pull-right">
                                    {page.id !== '0' ? (
                                        <a href="#" className="btn btn-warning" onClick={this.onClickDoNothing}>
                                            <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Loading...
                                        </a>
                                    ) : (
                                        ''
                                    )}
                                    &nbsp;
                                    &nbsp;
                                    <a href="#" name="submit" className="btn btn-primary" onClick={this.onClickDoNothing}>
                                        <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Loading...
                                    </a>
                                    &nbsp;
                                    &nbsp;
                                    <a href="#" name="submit" className="btn btn-primary" onClick={this.onClickDoNothing}>
                                        <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Loading...
                                    </a>
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>

        );

        return (
            <PageLayout
                cmsName={cmsName}
                router={router}
                onClickLogout={onClickLogout}
                auth_user={auth_user}
                mainPages={mainPages}
            >
                {Form}
            </PageLayout>
         );
    }
}

export default PageForm;
