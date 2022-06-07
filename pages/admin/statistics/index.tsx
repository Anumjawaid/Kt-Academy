import {registerPage} from "../../../src/Utils";
import {GeneralDayStatisticsJson, GeneralPageStatistics, GeneralStatistics} from "../../../src/Model";
import {useStatistics} from "../../../src/Hooks";
import React from "react";
import {AdminTable} from "../../../components/component/AdminTable";
import FooterSection from "../../../components/section/FooterSection";
import Header from "../../../components/section/Header";


export default function StatisticsAdminPage() {
    registerPage("statistics-admin")
    const statistics: GeneralStatistics | undefined | null = useStatistics()
    const openPageStats = (page: GeneralPageStatistics) => {
        window.open(`/admin/statistics/${page.pageKey}`, '_blank')
    }
    const openDayStats = (page: GeneralDayStatisticsJson) => {
        window.open(`/admin/statistics/day/${page.date}`, '_blank')
    }
    return <>
        <Header/>
        Views per day:
        {statistics && <>
            <AdminTable<GeneralDayStatisticsJson> title="Users" list={statistics.perDay} clicked={openDayStats} columns={[
                {name: 'date', label: 'Date', options: {filter: false, sort: true}},
                {name: 'viewsCount', label: 'Views', options: {filter: false, sort: true}},
                {name: 'usersCount', label: 'Users', options: {filter: false, sort: true}},
            ]}/>
        </>}
        Views per page:
        {statistics && <>
            <AdminTable<GeneralPageStatistics> title="Users" list={statistics.perPage} clicked={openPageStats} columns={[
                {name: 'pageKey', label: 'Page key', options: {filter: false, sort: true}},
                {name: 'last30DaysViewsCount', label: 'Last 30 days views', options: {filter: false, sort: true}},
                {name: 'last30DaysUsersCount', label: 'Last 30 days users', options: {filter: false, sort: true}},
            ]}/>
        </>}
        <FooterSection/>
    </>
};
