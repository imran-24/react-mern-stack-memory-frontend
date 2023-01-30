import axios from 'axios';
import {API} from '../../api'

const getMemory = async(data) => {
    
    let url = '';
    if(data?.search) url =  `/api/memory/?search=${data.search}`;
    
    else{
        url = '/api/memory/';
    }
    
    const response = await API.get(url);  
    return response.data;
}
const addMemory = async(data, token) => {
   
    console.log(data)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await API.post('/api/memory/' , data, config);  
    return response.data;
}

const updateMemory = async(data, token) => {
   
    console.log(data)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await API.put('/api/memory/' + `${data.id}`  , data, config);  
    return response.data;
}

const likeMemory = async(data, token) => {
 
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await API.put('/api/memory/' + `like/${data.id}`, data, config);  
    return response.data;
}

const deleteMemory = async(id, token) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await API.delete('/api/memory/'+ id, config); 
    console.log(response.data) 
    return response.data;
}
const memoryService = {
    addMemory,
    getMemory,
    updateMemory,
    likeMemory,
    deleteMemory
}

export default memoryService;