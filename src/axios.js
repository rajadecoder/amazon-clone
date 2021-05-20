import axios from "axios";

const instance = axios.create({
     baseURL : "http://localhost:5001/clone-54d6d/us-central1/api" 
 })

   

 export default instance;