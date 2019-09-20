import {
    GetConvertedRealmValueToTypeData
} from '../helpers/Realm'

export function RealmRefs() {
    let refs = {
        Session: {
            schemaName: "session_v1",
            schema: { username: "" }
        }
    }

    return {
        Session: {
            parameters: refs.Session.schema,
            dataModel: {
                path: "username.realm",
                schema: [{
                    name: refs.Session.schemaName,
                    properties: GetConvertedRealmValueToTypeData(refs.Session.schema)
                }],
            },
            InitValue: (params = refs.Session.schema) => params
        }   
    }
}