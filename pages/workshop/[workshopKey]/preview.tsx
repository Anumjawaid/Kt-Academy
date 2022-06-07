import {makeStaticProps} from "../../../src/Utils";
import React from "react";
import {User, Workshop} from "../../../src/Model";
import {requestUserByKey, requestWorkshop} from "../../../src/Network";
import WorkshopPage from "../[workshopKey]";

export async function getServerSideProps({params, locale}) {
    const workshop = await requestWorkshop(params.workshopKey, {lang: locale})
    let trainerKey = workshop?.trainer?.key;
    const trainer = trainerKey ? await requestUserByKey(trainerKey, {lang: locale}) : null
    return makeStaticProps({workshop, trainer})
}

export default function WorkshopPagePreview({workshop, trainer}: { workshop: Workshop, trainer: User | null }) {
    return WorkshopPage({workshop, trainer})
}
