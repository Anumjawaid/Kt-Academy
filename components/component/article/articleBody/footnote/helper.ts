interface getFootnoteIdParamsI {
        identifier: string;
}

export const getFootnoteId = ({identifier}: getFootnoteIdParamsI): string => {
    return identifier.replace(/(\d*)_(.*)/, "$2")
}
