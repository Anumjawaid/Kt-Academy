import Swal from "sweetalert2";
import {registerPage} from "../../src/Utils";
import {useWorkshopSubmissionsList} from "../../src/Hooks";
import {WorkshopSubmission} from "../../src/Model";
import {changeWorkshopSubmission} from "../../src/Network";
import {AdminTable} from "../../components/component/AdminTable";
import React from "react";
import FooterSection from "../../components/section/FooterSection";
import Header from "../../components/section/Header";

export default function WorkshopsSubmissionsAdminPage() {
    registerPage("users-admin")
    const workshopSubmissions = useWorkshopSubmissionsList()

    const elementClicked = (submission: WorkshopSubmission) => {
        let options = [
            "SUBMITTED",
            "CONTACTED",
            "CONFIRMED",
            "WAITING",
            "FINISHED",
            "OUTDATED",
            "SPAM"
        ];
        Swal.fire<string>({
            title: 'Change state to',
            input: 'select',
            inputOptions: options,
            inputPlaceholder: 'Select new state',
            showCancelButton: true
        }).then(state => {
            if (state.value) {
                changeWorkshopSubmission(submission.id, {status: options[state.value]})
                    .then(_ => window.location.reload())
            }
        })
    }

    return <>
        <Header/>
        {workshopSubmissions &&
        <AdminTable title="Workshop submissions" list={workshopSubmissions} columns={[
            {name: 'timestamp', label: 'Timestamp', options: {filter: false, sort: true, sortOrder: 'desc'}},
            {name: 'workshopKey', label: 'WorkshopKey', options: {filter: true, sort: true}},
            {name: 'submissionType', label: 'Type', options: {filter: true, sort: true}},
            {name: 'lang', label: 'Lang', options: {filter: true, sort: true}},
            {name: 'data', label: 'Details', options: {filter: false, sort: false}},
            {name: 'status', label: 'Status', options: {filter: true, sort: true, filterList: ['SUBMITTED', 'CONFIRMED']}},
        ]} clicked={elementClicked}/>
        }
        <FooterSection/>
    </>;
};