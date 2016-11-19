import { jsdom } from 'jsdom'

// pass markup to js-dom to create the fake DOM and bind it to the global document
global.document = jsdom('<!doctype html><html><head></head><body></body></html>')
// bind the fake window object to the global namespace
global.window = document.defaultView
// bind the fake window object to the global namespace
global.navigator = global.window.navigator

const importLib = (lib = { nameSpace: '', requiredName: ''  }) => {
    if (!lib.requiredName) {
        return;
    }

    if (lib.nameSpace) {
        global[lib.nameSpace] = require(lib.requiredName);
        global.window[lib.nameSpace] = global[lib.nameSpace];
    } else {
        require(lib.requiredName);
    }

};

const importLibs = (libs) => {
    libs.forEach((lib) => {
        importLib(lib);
    });
};  

importLibs([
    {
        nameSpace: 'moment', 
        requiredName: 'moment'
    },
    {
        nameSpace: '$', 
        requiredName: 'jquery'
    },
    {
        nameSpace: 'jQuery', 
        requiredName: 'jquery'
    },
    {
        requiredName: 'bootstrap-datepicker'
    }
]);

// http://reactkungfu.com/2015/07/approaches-to-testing-react-components-an-overview/

// global.jQuery = require('jquery');
// global.$ = global.jQuery;
// global.window.jQuery = global.jQuery;
// global.window.$ = global.jQuery;

// set a navigator so libraries like jQuery don't get confused and think they are using a chrome DOM
// global.navigator = {
//     userAgent: 'node.js'
// };
