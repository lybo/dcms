import FileManager from '../FileManager/'
import React, { Component, PropTypes } from 'react'

class ImageInput extends React.Component {
    constructor(props) {
        super(props);
        const { form, value, name } = this.props;
        form[name] = value || '';
        this.state = {
            image: value || '',
        };

        this.onClickFileManager = this.onClickFileManager.bind(this);
        this.onSelectFile = this.onSelectFile.bind(this);
        this.onClickRemove = this.onClickRemove.bind(this);
    }

    onClickFileManager() {
        const { name } = this.props;
        return (evt) => {
            evt.preventDefault();
            $(`#filemanager-${name}`).modal('show');
        }
    }

    onSelectFile(image) {
        const { form, onChange, name } = this.props;
        this.setState({
            image
        });
        onChange && onChange(image);
        form[name] = image;
        $(`#filemanager-${name}`).modal('hide');
    }

    onClickRemove() {
        return (evt) => {
            evt.preventDefault();
            const { form, onChange, name } = this.props;
            const image = '';
            this.setState({
                image
            });
            onChange && onChange(image);
            form[name] = image;
        }
    }

    render() {
        const { form, label, name, defaultValue } = this.props;

        const Image = !this.state.image ? (
            <div>
                <a href="#" onClick={this.onClickFileManager()}>{'Add Image'}</a>
            </div>
        ) : (
            <div className="row">
                <div className="col-xs-6 col-md-3">
                    <a href="#" className="thumbnail" onClick={this.onClickFileManager()}>
                        <img src={this.state.image} />
                    </a>
                    <div className="caption">
                        <a href="#" onClick={this.onClickRemove()}>
                           {'Remove Image'} 
                        </a>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="form-group">
                <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id={`filemanager-${name}`}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="myModalLabel">{`File Manager`}</h4>
                            </div>
                            <div className="modal-body">
                                <FileManager onSelectFile={this.onSelectFile.bind(this)}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="image">{label}</label>
                    {Image}
                </div>
            </div>
         );
    }
}

export default ImageInput;
