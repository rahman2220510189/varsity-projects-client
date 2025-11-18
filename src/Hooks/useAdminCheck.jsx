import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../firebase/Provider/AuthProviders';


const useAdminCheck = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const email = user?.email;

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', email],
        enabled: !loading && !!email, 
        queryFn: async () => {
            if (!email) return false;
            // Calls the unsecured API
            const res = await axiosSecure.get(`/api/users/admin/${email}`); 
            return res.data?.admin;
        }
    });

    return [isAdmin, isAdminLoading];
};
export default useAdminCheck;