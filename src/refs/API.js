import {
    Fetching,
    AppendURL,
    CreatePOST,
    CreatePATCH
} from '../helpers/Networking'

export function API() {
    return {
        GetBaseURL: () => Fetching({ url: "https://reynova.000webhostapp.com/share-photo/references.json" }),
        GetUsers: () => Fetching({ url: AppendURL("api/myusers") }),
        GetPosts: () => Fetching({ url: AppendURL("api/posts") }),
        SignUp: (params = {username, password, following, follower}) => Fetching({ url: AppendURL("api/myusers"), bodyJson: CreatePOST(params) }),
        UploadPost: (params = {username, photo, caption, time}) => Fetching({ url: AppendURL("api/posts"), bodyJson: CreatePOST(params) }),
        Follow: (params = {username, password, following, follower, id}) => Fetching({ url: AppendURL("api/myusers"), bodyJson: CreatePATCH(params) })
    }
}