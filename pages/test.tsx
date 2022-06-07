import React from 'react';
import Header from "../components/section/Header";
import FooterSection from "../components/section/FooterSection";
import CommentsSection from "../components/section/CommentsSection";

export default function Test() {
    return <>
        <Header/>
        <CommentsSection collectionKey="testCollection2" />
        <FooterSection/>
    </>
};
