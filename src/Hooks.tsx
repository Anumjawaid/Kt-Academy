import React, {useEffect, useState} from "react";
import {CommentsCollection, GeneralStatistics, User, WorkshopSubmission} from "./Model";
import {
    HttpError,
    requestArticleStatistics,
    requestComments,
    requestCurrentUser,
    requestStatistics,
    requestUsersList,
    requestWorkshopSubmissionsList
} from "./Network";
import {showHttpError} from "./Popups";

export function useUsersList(): User[] | undefined | null {
    return useApiSingleData(() => requestUsersList())
}

export function useWorkshopSubmissionsList(): WorkshopSubmission[] | undefined | null {
    return useApiSingleData(() => requestWorkshopSubmissionsList())
}

export function useUserSelf(): User | undefined | null {
    return useApiSingleData(() => requestCurrentUser())
}

export function useStatistics(): GeneralStatistics | undefined | null {
    return useApiSingleData(() => requestStatistics(), [])
}

export function useArticleStatistics(): GeneralStatistics | undefined | null {
    return useApiSingleData(() => requestArticleStatistics(), [])
}

export function useComments(collectionKey: string): [(CommentsCollection | undefined | null), ((value: (CommentsCollection | null | undefined)) => void)] {
    return useMutableApiData(() => requestComments(collectionKey), [])
}

export function useApiSingleData<T>(
    request: () => Promise<T>,
    deps: any[] = []
): T | undefined | null {
    const [data] = useMutableApiData(request, deps)
    return data;
}

export function useMutableApiData<T>(
    request: () => Promise<T>,
    deps: any[] = []
): [T | undefined | null, (value: T | null | undefined) => void] {
    const [data, setData] = React.useState<T | null>();

    useEffect(() => {
        request().then(
            result => setData(result),
            error => {
                if (error instanceof HttpError) {
                    showHttpError(error);
                }
                console.log(error);
            }
        );
    }, deps);

    return [data, setData];
}

export function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState<{ width?: number, height?: number }>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
}
