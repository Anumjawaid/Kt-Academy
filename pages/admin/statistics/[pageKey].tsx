import {GeneralDayStatisticsJson, GeneralStatistics} from "../../../src/Model";
import {AdminTable} from "../../../components/component/AdminTable";
import FooterSection from "../../../components/section/FooterSection";
import Header from "../../../components/section/Header";
import {requestPageStatistics} from "../../../src/Network";
import {getUserUUIDFromRequest} from "../../../src/userUuid";
import React from "react";

export async function getServerSideProps({params, locale, req, res}) {
    const {pageKey} = params
    const pageStatistics = await requestPageStatistics(pageKey, {
        lang: locale,
        userUuid: getUserUUIDFromRequest(req, res)
    })
    return {props: {pageStatistics}}
}

export default function PageStatisticsAdminPage({pageStatistics}: { pageStatistics: GeneralStatistics | null }) {
    const openDayStats = (page: GeneralDayStatisticsJson) => {
        window.open(`/admin/statistics/day/${page.date}`, '_blank')
    }
    return <>
        <Header/>
        {pageStatistics && <>
            {/*<div>{"Page views: " + pageStatistics.pageViews}</div>*/}
            {/*<div>{"Unique user views: " + pageStatistics.uniqueUsers}</div>*/}
            {/*{pageStatistics.reactionsCount && Object.keys(pageStatistics.reactionsCount).length !== 0 &&*/}
            {/*<div>{"Reactions count: " + JSON.stringify(pageStatistics.reactionsCount)}</div>*/}
            {/*}*/}
            <AdminTable<GeneralDayStatisticsJson> title="Users" list={pageStatistics.perDay} clicked={openDayStats} columns={[
                {name: 'date', label: 'Date', options: {filter: false, sort: true}},
                {name: 'viewsCount', label: 'Views', options: {filter: false, sort: true}},
                {name: 'usersCount', label: 'Users', options: {filter: false, sort: true}},
            ]}/>
        </>}
        <FooterSection/>
    </>
};
