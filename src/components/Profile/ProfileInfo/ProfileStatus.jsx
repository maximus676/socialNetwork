import React from "react";
import s from "./ProfileInfo.module.css";


class ProfileStatus extends React.Component{
    state = {                   /* local state*/
        editMode: false,
        status: this.props.status,
    }

    activateEditMode = () => {
        this.setState({          /*метод  из React.Component который позволяет пересовать State и в setState мы записываем те свойства которые мы должны преезаписать*/
            editMode: true,           /*перезатераем  editMode*/
        })
    }

    deactivateEditMode = () => {
        this.setState({/*метод  из React.Component который позволяет пересовать State и в setState мы записываем те свойства которые мы должны преезаписать*/
            editMode: false,           /*перезатераем  editMode*/
        })
        this.props.updateStatus(this.state.status);   /* санка */
    }
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value         /*currentTarget ?????????*/
        });
    }
    componentDidUpdate (prevProps, prevState) {  /*componentDidUpdate не вызывается при первом render вызывается каждый раз когда компонента изменяется и отрисовывается заново */
        if(prevProps.status !== this.props.status){            /* если  у нас в предыдущих пропсах prevProps статус который был не равен статусу в текущих пропсах тогда выполни перезатерание статуса */
            this.setState({
                status: this.props.status
            });
        }
}


    render() {
        return (
            <>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "NO Status" }</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true}    /* onChange ??????*/
                               onBlur={this.deactivateEditMode} value={this.state.status}/>  {/*onBlur- метод когда у нас фокус в элементе а потом он уходит из него */} {/*autoFocus={true} автоматическуи за нас делает нажатие на поле ввода */}
                    </div>
                }
            </>
        );
    }
}

export default ProfileStatus;