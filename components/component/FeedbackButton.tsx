import React from "react";
import {useTranslations} from "../../src/Translations";
import {useFeedbackPopup} from "../../src/Popups";

export const FeedbackButton = ({pageKey}: { pageKey: string }) => {
    const t = useTranslations();
    const showFeedbackPopup = useFeedbackPopup(pageKey)
    return <div className="clickable" onClick={showFeedbackPopup}>{t.feedback.button}</div>
}
