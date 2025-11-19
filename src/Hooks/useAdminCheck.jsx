import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import useAxiosPublic from './useAxiosPublic';
import { AuthContext } from '../firebase/Provider/AuthProviders';

const useAdminCheck = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            if (!user?.email) return false;
            
            try {
                const res = await axiosPublic.get(`/api/users/admin/${user.email}`);
                return res.data?.admin || false;
            } catch (error) {
                console.error('Error checking admin status:', error);
                return false;
            }
        }
    });

    return [isAdmin, isAdminLoading];
};

export default useAdminCheck;