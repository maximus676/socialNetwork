import React from "react";
import {addMassageActionCreator,} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class DialogsContainer extends React.Component {
    render() {
       return <Dialogs dialogsPage={this.props.dialogsPage}
                       addMassage={this.props.addMassage}
       />
    }
}

let mapStateToProps = (state) => {      /*  state это store.getState()  */
    return{
        dialogsPage: state.dialogsPage,
    }
}

export default compose(
    connect (mapStateToProps, {
        addMassage: addMassageActionCreator,
    }),
    withAuthRedirect        /* сначала закидыввает  DialogsContainer в withAuthRedirect а потом получиный результат в выше в connect*/     /* withAuthRedirect это HOC и в нее мы предаем целевую компоненту DialogsContainer и к нам возращается новая классовая компанента после обработки */
)(DialogsContainer);






