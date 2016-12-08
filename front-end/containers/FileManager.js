import FileManager from '../components/FileManager/'
import { connect } from 'react-redux'
import { receivePopulateFiles, fetchAddFile, fetchDeleteFile } from '../actions/file'

export default connect(
    (state) => {
        return {
            request: state.requests.file
        };
    },
    (dispatch) => {
        return {
            getFiles: () => {
                dispatch(receivePopulateFiles());
            },
            // addFile: (url) => {
            //     dispatch(fetchAddFile(url));
            // },
            removeFile: (fileId) => {
                dispatch(fetchDeleteFile(fileId));
            }
        }
    }
)(FileManager);


