import React, { Component, PropTypes } from 'react'
import PageLayout from '../PageLayout/'
import Link from '../Link/'
import { redirect } from 'redux-router-director'
import '!style!css!less!./style.less'

class Templates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            template: null
        }

    }

    componentDidMount() {
        const { onLoadTemplates } = this.props;
        onLoadTemplates();
    }

    onDelete(templateId) {
        return (evt) => {
            evt.preventDefault();
            if (templateId) {
                const { templates } = this.props;
                this.setState({
                    template: templates.find((templateItem) => templateId === templateItem.id)
                });
                $('#confirm').modal('show');
            }
        }
    }

    deleteTemplate() {

        return (evt) => {
            evt.preventDefault();
            $('#confirm').modal('hide');
            const { onDelete } = this.props;
            onDelete && onDelete(this.state.template.id);
            this.setState({
                template: null
            });
        }
    }

    render() {
        const { cmsName, router, onClickLogout, auth_user, templates } = this.props;
        let selectedTemplate = this.state.template;
        selectedTemplate = selectedTemplate ? selectedTemplate : {
            id: 0,
            title: ''
        };

        return (
            <PageLayout cmsName={cmsName} router={router} onClickLogout={onClickLogout} auth_user={auth_user} >
                    <div className="col-md-10 content">
                        <div className="modal fade bs-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id="confirm">
                            <div className="modal-dialog modal-sm" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        <h4 className="modal-title" id="myModalLabel">{`Confirm to delete`}</h4>
                                    </div>
                                    <div className="modal-body">
                                        {`You sure that you want to delete template with title ${selectedTemplate.title}  ?`}
                                    </div>
                                    <div className="modal-footer">
                                        <button onClick={this.deleteTemplate()} type="button" className="btn btn-default" data-dismiss="modal">Delete</button>
                                        <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container list-wrapper">
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="panel panel-primary">
                                        <div className="panel-heading">
                                            <span className="glyphicon glyphicon-list"></span>
                                            <span>Templates</span>
                                            <div className="pull-right action-buttons">
                                                <div className="btn-group pull-right">
                                                    <Link url={'templates/0'} className="btn btn-default btn-xs">
                                                        <span className="glyphicon glyphicon-plus"></span>
                                                        <span>Add New Template</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel-body">
                                            <ul className="list-group">

                                                {templates.map((template) => {
                                                    return (
                                                        <li className="list-group-item" key={template.id}>
                                                            <span className="list-wrapper__title">{template.title}</span>
                                                            <div className="pull-right action-buttons">
                                                                <Link url={`/templates/${template.id}`}><span className="glyphicon glyphicon-pencil"></span></Link>
                                                                <a href="#" className="trash" onClick={this.onDelete(template.id)}><span className="glyphicon glyphicon-trash"></span></a>
                                                            </div>
                                                        </li>
                                                    );
                                                })}

                                            </ul>
                                        </div>
                                        <div className="panel-footer">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h6>Total Count <span className="label label-info">{templates.length}</span></h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
            </PageLayout>
        );
    }
}
export default Templates;
