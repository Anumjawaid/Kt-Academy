import {ArrayType, ModelType} from "./ObjectModel";

export function modelToTS(className: string, model: ModelType): string {
    return `type ${className} = ${objectContentToTS(model, 0)}`
}

function spaces(indent: number): string {
    let res = ""
    for (let i = 0; i < indent; i++) res += " "
    return res;
}

function objectContentToTS(model: ModelType, indent: number): string {
    let res = "{\n"
    Object.keys(model).forEach(propName => {
        res += `${spaces((indent + 1) * 2)}${propName}: ${objectValueToTS(model[propName], indent + 1)}\n`;
    })
    return res + `${spaces(indent * 2)}}`
}

function objectValueToTS(model: ModelType, indent: number): string {
    if (model instanceof ArrayType) { // ArrayType
        return objectValueToTS(model.value, indent) + "[]"
    } else if (typeof model === "string") { // BasicType
        return model
    } else { // Object type
        return objectContentToTS(model, indent)
    }
}

export function modelToKotlin(className: string, model: ModelType): string {
    let modelsToParse: KotlinModelType[] = [{name: className, type: model}]
    let classes: string[] = []
    while (modelsToParse.length > 0) {
        const {parsed, newModelsToParse} = parseClass(modelsToParse.pop()!)
        classes.push(parsed)
        modelsToParse = modelsToParse.concat(newModelsToParse)
    }
    return classes.join("\n\n")
}

type KotlinModelType = { name: string, type: ModelType }

function parseClass(model: KotlinModelType): { parsed: string, newModelsToParse: KotlinModelType[] } {
    let newModelsToParse: KotlinModelType[] = []
    let parsed = `class ${model.name}(\n`;
    Object.keys(model.type).forEach((propName, index, all) => {
        const modelElement = model.type[propName];
        const {type, newModelToParse} = parseContentToKotlinType(propName, modelElement)
        if (newModelToParse) newModelsToParse.push(newModelToParse)
        parsed += `${spaces(2)}val ${propName}: ${type}`;
        if(index !== all.length - 1) {
            parsed += ","
        }
        parsed += "\n"
    })
    parsed += ")"
    return {parsed: parsed, newModelsToParse: newModelsToParse}
}


function parseContentToKotlinType(propName: string, model: ModelType): { type: string, newModelToParse: KotlinModelType | null } {
    if (model instanceof ArrayType) { // ArrayType
        const {type, newModelToParse} = parseContentToKotlinType(propName, model.value)
        return {type: `List<${type}>`, newModelToParse}
    } else if (typeof model === "string") { // BasicType
        return {type: parseBasicTypeToKotlin(model), newModelToParse: null}
    } else { // Object type
        const typeName = capitalizeFirstLetter(propName)
        return {type: typeName, newModelToParse: {name: typeName, type: model}}
    }
}

function parseBasicTypeToKotlin(model: "string" | "boolean" | "number" | "bigint" | "object") {
    switch (model) {
        case "string":
            return "String";
        case "boolean":
            return "Boolean";
        case "number":
        case "bigint":
            return "Double";
        case "object":
            return "Any?";
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}