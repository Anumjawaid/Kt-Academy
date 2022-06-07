import {registerPage} from "../../../src/Utils";
import {User, Workshop} from "../../../src/Model";
import {AdminTable} from "../../../components/component/AdminTable";
import FooterSection from "../../../components/section/FooterSection";
import Header from "../../../components/section/Header";
import {requestCurrentUser, requestWorkshopsAdminList} from "../../../src/Network";
import {getUserUUIDFromRequest} from "../../../src/userUuid";
import {Fab} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Link from "../../../src/Link";
import {PageOrLoginRequired} from "../../../components/page/LoginRequiredPage";
import {Lang} from "../../../src/Translations";

export async function getServerSideProps({req, res, locale}) {
    const workshops: Workshop[] = await requestWorkshopsAdminList({userUuid: getUserUUIDFromRequest(req, res)})
    const user = await requestCurrentUser({lang: locale, userUuid: getUserUUIDFromRequest(req, res)})
    return {props: {user, workshops}}
}

export default function WorkshopsAdminPageOrLoginRequired({workshops, user}: { workshops: Workshop[], user: User | null }) {
    return PageOrLoginRequired({workshops, user}, WorkshopsAdminPage)
}

function WorkshopsAdminPage({workshops}: { workshops: Workshop[] }) {
    registerPage(`workshops-admin`)
    const data = workshops
        .map(w => {
            return {...w, trainer: w.trainer?.key}
        })

    const onRowClicked = (workshop: Workshop) => {
        if (workshop.lang.toLowerCase() == Lang.PL) {
            window.open(`/pl/admin/workshop/${workshop.key}`)
        } else {
            window.open(`/admin/workshop/${workshop.key}`)
        }
    };

    return <>
        <Header/>
        <AdminTable<any> title="Workshops" list={data} clicked={onRowClicked} columns={[
            {name: 'key', label: 'Key', options: {filter: false, sort: true}},
            {name: 'lang', label: 'Lang', options: {filter: true, sort: true}},
            {name: 'name', label: 'Name', options: {filter: false, sort: true}},
            {name: 'visibility', label: 'Visibility', options: {filter: false, sort: true}},
            {name: 'trainer', label: 'Trainer', options: {filter: true, sort: true}},
        ]} options={{
            sortOrder: {
                name: 'key',
                direction: 'asc'
            }
        }}/>
        <Link to={`/admin/workshop/new`}>
            <Fab color="primary" aria-label="add" className="flating-action-button">
                <AddIcon/>
            </Fab>
        </Link>
        <FooterSection/>
    </>
};
