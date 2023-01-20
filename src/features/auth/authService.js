import axios from 'axios';
import {API} from '../../api'


//Register User
const signup = async(userData) => {
    
    const response = await API.post('/api/users/signup/', userData);
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

//signin User
const login = async(userData) => {
    
    const response = await API.post('/api/users/signin/', userData);
    console.log(response.data)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

// logout user
const logout = async(userData) => {
    
    localStorage.removeItem('user');

}

const authService = {
    signup,
    login,
    logout
}

export default authService;