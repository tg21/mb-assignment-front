const serverUrl = 'http://localhost:2121/'

const uri = {

    //auth
    signIn : serverUrl+'api/auth/signIn',
    signUp: serverUrl +'api/auth/signUp',

    //employee
    getEmployees: serverUrl + 'api/employee/getEmployees',
    addEmployees: serverUrl + 'api/employee/create',
    editEmployee: serverUrl + 'api/employee/edit',
    deleteEmployee: serverUrl + 'api/employee/delete',
}

export default uri;