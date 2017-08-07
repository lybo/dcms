import React, { Component, PropTypes } from 'react'
import { USER_ROLE } from '../../constants/Generic';
import PageLayout from '../PageLayout/'
import Link from '../Link/'
import { redirect } from 'redux-router-director'
import '!style!css!less!./style.less'
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <span className="glyphicon glyphicon-menu-hamburger sortable-handle"></span>);

const SortableItem = SortableElement(({
    page,
    templates,
    authUserRole,
    onDelete,
}) => {
    // const startDate = page.publicationStartDate ? (
    //     <small className="small list-wrapper__role">{moment.unix(page.publicationStartDate).format('DD/MM/YYYY')}</small>
    // ) : (
    //     <small className="small list-wrapper__role">No date</small>
    // );
    // const endDate = page.publicationStartDate ? (
    //     <small className="small list-wrapper__role">{moment.unix(page.publicationStartDate).format('DD/MM/YYYY')}</small>
    // ) : (
    //     <small className="small list-wrapper__role">No date</small>
    // );
    const template = templates.find(t => t.id === page.templateId);
    const Edit = template && template.allowUpdate >= authUserRole ? (
        <Link url={`/pages/edit/${page.id}`}><span className="glyphicon glyphicon-pencil"></span></Link>
    ) : (
        ''
    );
    const Delete = !template ? (
        <a href="#" className="trash" onClick={onDelete(page.id)}><span className="glyphicon glyphicon-trash"></span></a>
    ) : template.allowDelete >= authUserRole ? (
        <a href="#" className="trash" onClick={onDelete(page.id)}><span className="glyphicon glyphicon-trash"></span></a>
    ) : (
        ''
    );

    return (
        <li className="list-group-item">
            <DragHandle />
            <span className="list-wrapper__name">
                <Link url={`/pages/${page.id}`}>{page.title}</Link>
            </span>
            { template ? (
                <small className="small list-wrapper__role">{` - ${template.title} `}</small>
            ) : (
                ''
            )}
            {page.published ? (
                <span className="label label-success">Published</span>
            ) : (
                <span className="label label-danger">Unpublished</span>
            )}
            {/*<small className="small list-wrapper__role">{page.zone}</small>*/}
            {/*
            {startDate}
            <small className="small list-wrapper__role"> to </small>
            {endDate}
            */}
            <div className="pull-right action-buttons">
                {Edit}
                {Delete}
            </div>
        </li>
    );

});

const SortableList = SortableContainer(({
pages,
templates,
authUserRole,
onDelete,
}) => {
    return (
        <ul className="list-group">
            {pages.map((page, index) =>
                <SortableItem key={`item-${index}`}
                    index={index}
                    onDelete={onDelete}
                    authUserRole={authUserRole}
                    templates={templates}
                    page={page} />
            )}
        </ul>
    );
});


class SortableComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    onSortEnd({oldIndex, newIndex}) {
        const { pages, onSort } = this.props;
        const sortedPages = arrayMove(pages, oldIndex, newIndex).reverse();
        sortedPages.forEach((page, i) => {
            page.zIndex = i;
            onSort(page);
        });
    }

    render() {
        const { pages, templates, authUserRole, onDelete } = this.props;

        return (
            <SortableList
                pages={pages}
                templates={templates}
                authUserRole={authUserRole}
                onDelete={onDelete}
                onSortEnd={this.onSortEnd.bind(this)}
                useDragHandle={true} />
        )
    }
}

class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: null
        }
    }

    componentDidMount() {
        const { onLoadPages } = this.props;
        onLoadPages();
    }

    componentWillReceiveProps(nextProps) {
        const { onLoadPages, parentPage } = this.props;
        if (nextProps.parentPage.id !== parentPage.id) {
            onLoadPages();
        }
    }

    onDelete(pageId) {
        const { pages } = this.props;
        return (evt) => {
            evt.preventDefault();
            if (pageId) {
                this.setState({
                    page: pages.find((pageItem) => pageId === pageItem.id)
                });
                $('#confirm').modal('show');
            }
        }
    }

    deletePage() {
        return (evt) => {
            evt.preventDefault();
            $('#confirm').modal('hide');
            const { onDelete } = this.props;
            onDelete && onDelete(this.state.page.id);
            this.setState({
                page: null
            });
        }
    }

    render() {
        const { cmsName, router, onClickLogout, auth_user, pathPages, parentPage, pages, templates, onSort } = this.props;
        const authUserRole = USER_ROLE.indexOf(auth_user.role);
        let selectedPage = this.state.page;
        selectedPage = selectedPage ? selectedPage : {
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
                                        {`You sure that you want to delete page with title ${selectedPage.title}  ?`}
                                    </div>
                                    <div className="modal-footer">
                                        <button onClick={this.deletePage()} type="button" className="btn btn-default" data-dismiss="modal">Delete</button>
                                        <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container list-wrapper">
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="panel panel-primary">
                                        <div className="panel-heading clearfix">
                                            <div className="pull-left action-buttons">
                                                <span className="glyphicon glyphicon-list"></span>
                                                {pathPages.map(page => {
                                                    return (
                                                        <Link url={`pages/${page.id}`} className="btn btn-default btn-xs" key={`${page.id}-path`}>
                                                            <span>{`${page.title} /`}</span>
                                                        </Link>
                                                    );
                                                })}
                                                <span>{parentPage.title}</span>
                                            </div>
                                            <div className="pull-right action-buttons">
                                                <div className="btn-group pull-right">
                                                    {parentPage.id !== '0' ? (
                                                        <Link url={`pages/${parentPage.parentId}`} className="btn btn-default btn-xs">
                                                            <span className="glyphicon glyphicon-chevron-left"></span>
                                                            <span>Go to {parentPage.title}</span>
                                                        </Link>
                                                    ) :
                                                    ('')}
                                                    <Link url={`pages/add/${parentPage.id}`} className="btn btn-default btn-xs">
                                                        <span className="glyphicon glyphicon-plus"></span>
                                                        <span>Add New Page</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel-body">
                                            <SortableComponent
                                                onSort={onSort}
                                                pages={pages.sort((a, b) => b.zIndex - a.zIndex)}
                                                onDelete={this.onDelete.bind(this)}
                                                templates={templates}
                                                authUserRole={authUserRole} />
                                        </div>
                                        <div className="panel-footer">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h6>Total Count <span className="label label-info">{pages.length}</span></h6>
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



                                                    // <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                                    //     <span className="glyphicon glyphicon-cog"></span>
                                                    // </button>
                                                    // <ul className="dropdown-menu slidedown">
                                                    //     <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-pencil"></span>Edit</a></li>
                                                    //     <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-trash"></span>Delete</a></li>
                                                    // </ul>

export default Pages;
