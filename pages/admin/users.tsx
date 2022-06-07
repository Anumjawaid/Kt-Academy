import {registerPage} from "../../src/Utils";
import {useUsersList} from "../../src/Hooks";
import {User} from "../../src/Model";
import {AdminTable} from "../../components/component/AdminTable";
import FooterSection from "../../components/section/FooterSection";
import React from "react";
import Header from "../../components/section/Header";

export default function UsersAdminPage() {
    registerPage("users-admin")
    const usersList = useUsersList()

    const onRowClicked = (user: User) => {
        window.open(`/admin/user/${user.id}`, '_blank')
    };

    return <>
        <Header/>
        {usersList &&
        <AdminTable<User> title="Users" list={usersList} clicked={onRowClicked} columns={[
            {name: 'email', label: 'Email', options: {filter: false, sort: true}},
            {name: 'createdAt', label: 'Created at', options: {filter: false, sort: true, sortOrder: 'asc'}},
            {name: 'displayName', label: 'Display name', options: {filter: false, sort: true}},
            {name: 'name', label: 'Name', options: {filter: false, sort: true}},
            {name: 'surname', label: 'Surname', options: {filter: false, sort: true}},
            {name: 'publicKey', label: 'key', options: {filter: false, sort: true}},
            {name: 'newsletters', label: 'Newsletters', options: {filter: true, sort: true}},
            {name: 'tags', label: 'Tags', options: {filter: true, sort: true}},
        ]}/>
        }
        <FooterSection/>
    </>
};
