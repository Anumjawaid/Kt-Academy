import Swal from "sweetalert2";
import {HttpError, sendFeedback} from "./Network";
import {useTranslations} from "./Translations";

export function showSuccessDialog(title?: string): Promise<any> {
    return Swal.fire({
        title: title ? title : 'Success!',
        icon: 'success'
    })
}

export function showErrorDialog(title?: string): Promise<any> {
    return Swal.fire({
        title: title ? title : 'Error',
        icon: "error"
    })
}

export function showHttpError(error: HttpError) {
    Swal.fire({
        icon: "error",
        title: `Error ${error?.code} (${error?.statusText})`,
        text: error?.message
    });
}

export function useFeedbackPopup(pageKey: string): () => void {
    const t = useTranslations()
    return () => Swal.fire<string>({
        input: 'textarea',
        inputPlaceholder: t.feedback.prompt,
        inputAttributes: {
            'aria-label': t.feedback.placeholder
        },
        showCancelButton: true
    }).then((text) => {
        if (text.value) {
            sendFeedback(pageKey, text.value)
                .then(() => Swal.fire(t.feedback.thankYou))
        }
    })
}