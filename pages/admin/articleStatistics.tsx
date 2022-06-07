import {registerPage} from "../../src/Utils";
import {GeneralDayStatisticsJson, GeneralPageStatistics, GeneralStatistics} from "../../src/Model";
import {useArticleStatistics} from "../../src/Hooks";
import React from "react";
import {AdminTable} from "../../components/component/AdminTable";
import FooterSection from "../../components/section/FooterSection";
import Header from "../../components/section/Header";


export default function ArticleStatisticsAdminPage() {
    registerPage("article-statistics-admin")
    const statistics: GeneralStatistics | undefined | null = useArticleStatistics()
    const onRowClicked = (page: GeneralPageStatistics) => {
        window.open(`/admin/statistics/${page.pageKey}`, '_blank')
    };
    return <>
        <Header/>
        Views per day:
        {statistics && <>
            <AdminTable<GeneralDayStatisticsJson> title="Users" list={statistics.perDay} columns={[
                {name: 'date', label: 'Date', options: {filter: false, sort: true}},
                {name: 'viewsCount', label: 'Views', options: {filter: false, sort: true}},
                {name: 'usersCount', label: 'Users', options: {filter: false, sort: true}},
            ]}/>
        </>}
        Views per page:
        {statistics && <>
            <AdminTable<GeneralPageStatistics> title="Users" list={statistics.perPage} clicked={onRowClicked} columns={[
                {name: 'pageKey', label: 'Page key', options: {filter: false, sort: true}},
                {name: 'last30DaysViewsCount', label: 'Last 30 days views', options: {filter: false, sort: true}},
                {name: 'last30DaysUsersCount', label: 'Last 30 days users', options: {filter: false, sort: true}},
                {
                    name: 'lastYearViewsCount',
                    label: 'Year views (including today)',
                    options: {filter: false, sort: true}
                },
                {
                    name: 'lastYearUsersCount',
                    label: 'Year users (including today)',
                    options: {filter: false, sort: true, sortOrder: 'desc'}
                },
            ]}/>
        </>}
        <FooterSection/>
    </>
};
