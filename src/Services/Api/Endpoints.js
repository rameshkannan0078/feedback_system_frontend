const ENDPOINTS={
    LOGIN:{
        signin:'public/signin',
        signup:'public/signup'
    },
    USER:{
        get:'v1/user',
        delete:'v1/user'
    },
    FEEDBACK:{
        add:'v1/feedback',
        get:'v1/feedback',
        delete:'v1/feedback',
        single:'v1/feedback/get-single',
        update:'v1/feedback/update',
        dashboard:'v1/feedback/dashboard'
    },
    ADMIN:{
        login:'public/signin-admin'
    }

}


export default ENDPOINTS;