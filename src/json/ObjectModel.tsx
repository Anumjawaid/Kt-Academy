export type ModelType = BasicType | ObjectType | ArrayType

type BasicType = "string" | "boolean" | "number" | "bigint" | "object" /* when null */

type ObjectType = {
    [key: string]: ModelType
}

export class ArrayType {
    public value: ModelType;

    constructor(value: ModelType) {
        this.value = value;
    }
}


export function objectModel(object): ModelType | null {
    if (Array.isArray(object)) {
        let childModel = objectModel(object[0]);
        if (childModel === null) {
            return null;
        }
        return new ArrayType(childModel)
    }
    let type = typeof object;
    switch (type) {
        case "number":
        case "bigint":
        case "boolean":
        case "string":
            return type

        case "undefined":
            return "object"

        case "object":
            if (object === null) {
                return "object"
            } else {
                return readObjectModel(object)
            }

        case "symbol":
        case "function":
        default:
            return null
    }
}

function readObjectModel(object): ModelType {
    const keys: string[] = Object.keys(object)
    const model = {}
    keys.forEach(key => {
        model[key] = objectModel(object[key])
    })
    return model
}