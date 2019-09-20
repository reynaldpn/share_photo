import {
    baseUrls,
    usedBaseUrlIndex,
} from "../refs/API"

export function Fetching(params = {url: "", bodyJson}) {
    return fetch(params.url, params.bodyJson).then(response => response.text())
}

export function AppendURL(additionalUrl = "") {
    return baseUrls[usedBaseUrlIndex] + additionalUrl
}

export function CreatePOST(params = {}) {
    return {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(params),
    }
}