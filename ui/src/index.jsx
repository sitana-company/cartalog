import React from "react";
import ReactDOM from "react-dom";
import DashboardContainer from "./containers/DashboardContainer.jsx";
import FrontPageContainer from "./containers/FrontPageContainer.jsx";

const dashboardDiv = document.getElementById("app-dashboard");

const dashboardContainer = dashboardDiv ? ReactDOM.render(<DashboardContainer />, dashboardDiv) : false;

const frontendDiv = document.getElementById("front-page");
const frontpageContainer = frontendDiv ? ReactDOM.render(<FrontPageContainer />, frontendDiv) : false;

if (netuno) {
    netuno.addNavigationLoad(() => {
        $('[netuno-navigation]').find('a').on('netuno:click', (e)=> {
            const link = $(e.target);
            if (dashboardContainer && link.is('[netuno-navigation-dashboard]')) {
                // Menu > Dashboard > Clicked!
            }
        });
    });
    
    netuno.addContentLoad((container) => {
        // When any content is loaded dinamically this is executed...
        if (container.is('[netuno-form-search="YOUR_FORM_NAME"]')) {
            // When search page is loaded...
        } else if (container.is('[netuno-form-edit="YOUR_FORM_NAME"]')) {
            // When form edit is loaded...
        }
    });
    
    netuno.addPageLoad(() => {
        // When page is loaded...
        let modal = $('#app-dashboard-modal-form')
        modal.on('hidden.bs.modal', ()=> {
            modal.find('[netuno-form-edit]').empty()
        });
        $('#app-dashboard-modal-form-button').on('click', ()=> {
            modal.modal('show')
            netuno.loadFormEdit(modal.find('[netuno-form]'))
        })
        modal.find('[netuno-form]').on('netuno:save', ()=> {
            modal.modal('hide')
        })
    });
}


