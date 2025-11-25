import axios from "axios"
const axiosPublic = axios.create({
  baseURL:'https://my-varsity-projects-server.onrender.com'
})

const useAxiosPublic =  () => {
  
   return axiosPublic;
  
};

export default useAxiosPublic
