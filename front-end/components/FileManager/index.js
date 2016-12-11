import React, { Component, PropTypes } from 'react'
import Link from '../Link/'
import Spinner from '../Spinner/'
import { redirect } from 'redux-router-director'
import '!style!css!less!./style.less'
import { DEV_HOST, PROD_HOST } from '../../constants/Generic'

const HOST = __DEV_HOST__ ? `${DEV_HOST}` : `${PROD_HOST}`;

class FileManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        };

    }

    getMappedImage(responseData) {
        return {
            id: responseData.id || 0,
            filename: `${HOST}/upload/${responseData.subdir}/${responseData.filename}`,
            filesize: responseData.filesize || 0,
            creationDate: responseData.creationDate || 0
        };
    }

    appendFiles(data) {
        let files = [];
        for (var index in data) {
            files.push(this.getMappedImage(data[index]));
        }

        this.setState({
            files: this.state.files.concat(files)
        });
    }

    uploadFile(evt) {
        const el = evt.currentTarget;
        const files = el.files;
        const file = files[0];

        const fd = new FormData()
        const subdir = '';
        fd.append('uploadedFile', file)
        const appendFiles = this.appendFiles.bind(this);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${HOST}/fileupload?subdir=${subdir}&uniqueFilename=true`);
        xhr.onload = function() {
            const response = JSON.parse(this.responseText);
            if (this.status < 300) {
                // $('.alert-success').append("Upload successful!<br />");
                appendFiles(response);
            } else {
                alert(response.message);
            }
        };
        xhr.onerror = function(err) {
            alert("Error: ", err);
        }
        xhr.send(fd);
    }

    onSelectFile(image) {
        const { onSelectFile } = this.props;
        return (evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            onSelectFile(image);
        };
    }

    onRemoveFile(id) {
        return (evt) => {
            evt.preventDefault();
            dpd.fileupload.del(id, (result, err) => {
                if (err) alert(err);

                this.setState({
                    files: this.state.files.filter((file) => file.id !== id )
                });
            });
        };
    }

    componentWillMount() {
        const appendFiles = this.appendFiles.bind(this);
        dpd.fileupload.get(function(data, err) {
            data && appendFiles(data);
        });
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="row" >
                <div className="col-md-12">

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Page</h3>
                        </div>
                        <div className="panel-body">
                            <div className="form-area">
                                <div role="form" className="clearfix" >
                                    <div className="form-group">
                                        <label htmlFor="image">Image</label>
                                        <input ref="image" ref={(ref) => this.image = ref} type="file" className="form-control" id="image" name="image" onChange={this.uploadFile.bind(this)}  />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {this.state.files.map((img) => {
                                    return (
                                        <div className="col-xs-6 col-md-3" key={img.id}>
                                            <div className="thumbnail">
                                                <a href="#" className="thumbnail" onClick={this.onSelectFile(img.filename)}>
                                                    <img src={img.filename}  />
                                                </a>
                                                <div className="caption">
                                                    <a href="#" className="btn btn-primary" role="button" onClick={this.onRemoveFile(img.id)}>
                                                       <span className="glyphicon glyphicon-trash"></span> </a>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default FileManager;
