import FileManager from '../components/FileManager'
import { connect } from 'react-redux'
import { populateFiles } from '../actions/file'
import { addFile, deleteFile } from '../epics/file'
import { PAGE_TITLE } from '../constants/Generic'

export default connect(
    (state) => {
        return {
            request: state.requests.file,
            cmsName: PAGE_TITLE,
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


