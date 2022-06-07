import React from "react";
import {printMoney, useBio, User} from "../../../src/Model";
import Header from "../../../components/section/Header";
import FooterSection from "../../../components/section/FooterSection";
import {acceptTrainerAdmin, putUserAdmin, requestUserById} from "../../../src/Network";
import {getUserUUIDFromRequest} from "../../../src/userUuid";
import {makeDynamicProps} from "../../../src/Utils";
import MediaHeaders from "../../../components/MediaHeaders";
import {UserImage} from "../../../components/component/UserImage";
import ReactMarkdown from "react-markdown";
import Swal from "sweetalert2";

export async function getServerSideProps({params, locale, req, res}) {
    const user = await requestUserById(params.userId, {userUuid: getUserUUIDFromRequest(req, res)})
    return makeDynamicProps({user})
}

export default function UserPage({user}: { user: User }) {
    const userImage = getBigUserImageUrl(user)
    const bio = useBio(user)

    const changeTags = () => {
        Swal.fire<string>({
            title: 'Change tags to',
            input: 'text',
            inputValue: JSON.stringify(user.tags),
            showCancelButton: true
        }).then(state => {
            if (state.value) {
                putUserAdmin(user.id, {tags: JSON.parse(state.value)})
                    .then(_ => window.location.reload())
            }
        })
    }

    const allowTrainer = () => {
        acceptTrainerAdmin(user.id)
            .then(_ => window.location.reload())
    }

    return <>
        <MediaHeaders
            title={user.displayName}
            description={user.bio}
            image={userImage}
        />
        <Header addMediaHeader={false}/>
        <div className="content-container">
            <UserImage user={user} userImage={userImage ?? getBigUserImageUrl(user)}/>

            {bio &&
            <ReactMarkdown className="margin-bottom-30" source={bio}/>
            }

            <div className="button" onClick={changeTags}>Change tags</div>

            {user.trainerProposition && <>
                <h3>Trainer proposition</h3>
                <div>Description: {user.trainerProposition.description}</div>
                <div>Experience description: {user.trainerProposition.experienceDescription}</div>
                <div>Topics: {user.trainerProposition.topics.join(", ")}</div>
                <div>Rate for person per hour: {printMoney(user.trainerProposition.rates.privateConsultationsPerHour)}</div>
                <div>Rate for company per day: {printMoney(user.trainerProposition.rates.companyConsultationsPerDay)}</div>
                <div className="button" onClick={allowTrainer}>Accept</div>
            </>}
        </div>
        <FooterSection/>
    </>;
}

export function getBigUserImageUrl(user: User) {
    return user.customImageUrl ? user.customImageUrl : user.imageUrl.replace(/=s(\d*)-c/, "=s400-c")
}