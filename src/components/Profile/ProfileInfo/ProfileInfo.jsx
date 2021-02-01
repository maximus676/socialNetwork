import React, {useState} from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../Icons/images.png";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false); /*значение useState изначально false*/  /*useState возращает нам масив и в нем сидят два элемента 1 значение само значение стейта  и мы его записали как false 2 значение  функция которая устанавливает значение стейта  */

    if (!props.profile){        /*если у нас профайла нет (!) и он нул то */
        return <Preloader />
    }
    /* как status может прийти быстрее если у нас ещё не пришел profile и показался <Preloader /> а статус приходит в <ProfileStatus */

    const onMainPhotoSelected = (e) => {
        if (e.target.files[0]) {
            props.savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(   /* санка */ /*санка асинхронная вещь и она возвращает promise и мы записываем что после долно произойти после обещания .then   */
            () => {
                setEditMode(false);
            }
        );
    }

    return (
        <div>
            <img className={s.content__img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR4repqoJ7ynFgnzzeyzDRZqe2zrdw2FdEdvQ&usqp=CAU"/>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto} className={s.img}/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/> }

                {editMode
                    ? <ProfileDataForm  initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => {setEditMode(true)}}/>}

                <ProfileStatusWithHooks status = {props.status} updateStatus={props.updateStatus}/>
                <span className={s.description}>{props.profile.aboutMe}</span>
                <span className={s.description}>{props.profile.lookingForAJobDescription}</span>
            </div>
        </div>
    );
}

const ProfileData = (props) => {
    return <div>
            { props.isOwner && <div><button onClick={props.goToEditMode}>edit</button></div>}

        <div>
            <b>Full name </b> : {props.profile.fullName }
        </div>
        <div>
            <b>Looking for a job </b> : {props.profile.lookingForAJob ? "yes" : "no"}
        </div>
        { props.profile.lookingForAJob &&
        <div>
            <b>My professional skills </b> : {props.profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>About me</b> : {props.profile.aboutMe }
        </div>
        <div>
            <b>Contacts</b> : {Object.keys(props.profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key] }/>
        }) }
        </div>
    </div>
}


const Contact = ({contactTitle, contactValue }) => {          /*{contactTitle, contactValue }  почему в фигурных и как они приходят ?  */
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;