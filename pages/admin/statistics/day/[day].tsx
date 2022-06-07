import {DayPageStatisticsJson, DayStatisticsJson} from "../../../../src/Model";
import {AdminTable} from "../../../../components/component/AdminTable";
import FooterSection from "../../../../components/section/FooterSection";
import Header from "../../../../components/section/Header";
import {requestDayStatistics} from "../../../../src/Network";
import React from "react";
import {getUserUUIDFromRequest} from "../../../../src/userUuid";

export async function getServerSideProps({params, locale, req, res}) {
    const {day} = params
    const dayStatistics = await requestDayStatistics(day, {
        lang: locale,
        userUuid: getUserUUIDFromRequest(req, res)
    })
    return {props: {dayStatistics: dayStatistics}}
}

export default function PageStatisticsAdminPage({dayStatistics}: { dayStatistics: DayStatisticsJson | null }) {
    const openPageStats = (page: DayPageStatisticsJson) => {
        window.open(`/admin/statistics/${page.pageKey}`, '_blank')
    }
    return <>
        <Header/>
        {dayStatistics && <>
            <AdminTable<DayPageStatisticsJson> title="Users" list={dayStatistics.perPage} clicked={openPageStats} columns={[
                {name: 'pageKey', label: 'pageKey', options: {filter: false, sort: true}},
                {name: 'viewsCount', label: 'Views', options: {filter: false, sort: true}},
                {name: 'usersCount', label: 'Users', options: {filter: false, sort: true}},
            ]}/>
        </>}
        <FooterSection/>
    </>
};
