export function Fetching(params = {url: "", bodyJson}) {
    return fetch(params.url, params.bodyJson).then(response => response.text())
}

export function AppendURL(additionalUrl = "") {
    return require("../refs/baseURL").baseURL + additionalUrl
}

export function CreatePOST(params = {}) {
    return {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(params)
    }
}

export function CreatePATCH(params = {}) {
    return {
        method : "PATCH",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(params)
    }
}