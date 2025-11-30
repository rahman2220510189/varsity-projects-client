import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home';
import UploadEquipment from '../Pages/Home/UploadEquipment/UploadEquipment';
import CollectForm from '../Pages/Home/UploadEquipment/CollectForm';
import ReturnEquipment from '../Pages/Home/UploadEquipment/ReturnEquipment';
import History from '../Pages/History/History';
import AdminPanel from '../AdminPanel/AdminPanel';
import DueEquipmentPanel from '../AdminPanel/DueEquipmentPanel';
import LogInnForm from '../LogingInfromation/SignUp/LogInnForm';
import SignIn from '../LogingInfromation/SignIn';
import MyHistory from '../Pages/History/MyHistory/MyHistory';
import ManageUsers from '../AdminPanel/ManageUsers';
import AdminLayout from '../AdminPanel/AdminLayout';
import PrivateRoute from './PrivateRoute';
import AdminHistory from '../AdminPanel/AdminHistory';
import AdminActivityHistory from '../AdminPanel/AdminActivityHistory';
import ForgotPassword from '../LogingInfromation/ForgotPassword';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            { path: '/', element:<Home></Home> },
            { path: '/history', element: <History></History> },
            { path: '/my-history', element:<MyHistory></MyHistory> },
           
               {
                path: "/equipment/:id/collect",
                element:<PrivateRoute> <CollectForm></CollectForm> </PrivateRoute>,
            },
            {
                path: '/equipment/:id/return',
                element: <PrivateRoute><ReturnEquipment></ReturnEquipment></PrivateRoute>,
            },
            { path:'/login', element:<LogInnForm></LogInnForm> },
            { path: '/signup', element: <SignIn></SignIn> },
            {
                path: '/forgot-password',
                element: <ForgotPassword></ForgotPassword>,
            },
         
            
            
          
        ]
    },
    
  {
        path: '/admin-dashboard-access', 
        
        
        element: <AdminLayout />, 
        
        children: [
   
            { 
                index: true, 
                element: <AdminPanel /> 
            }, 
            
            { 
                path: 'managed-users', 
                element: <ManageUsers /> 
            },
           
            { 
                path: 'manage-items',
                element: <AdminPanel /> 
            },
 
            { 
                path: 'due-list',
                element: <DueEquipmentPanel /> 
            },
        
            { 
                path: 'add-equipment', 
                element: <UploadEquipment /> 
            },
            {
                path: 'all-history',
                element: <AdminHistory />
            },
            {
                path: 'admin-activity-history',
                element: <AdminActivityHistory />
            }
            
            
            
        ]
    }
]);