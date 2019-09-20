import {
    Fetching,
    AppendURL,
    CreatePOST,
} from '../helpers/Networking'

export const baseUrls = [
    "https://www.example.com",
]

export const usedBaseUrlIndex = 0

export const API = {
    GETExample: () => Fetching({ url: AppendURL("/getexample") }),
    POSTExample: (parameters = {firstParam, secondParam}) => Fetching({ url: AppendURL("/postexample"), bodyJson: CreatePOST(parameters) }),
}