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
export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path: '/',
                element:<Home></Home>,
            },
            {
                path: '/upload-equipment',
                element: <UploadEquipment></UploadEquipment>,
            },
            {
                path: "/equipment/:id/collect",
                element: <CollectForm></CollectForm>,
            },
            {
                path: '/equipment/:id/return',
                element: <ReturnEquipment></ReturnEquipment>,
            },
            {
                path: '/history',
                element: <History></History>,
            },
            {
                path: '/adminPanel',
                element: <AdminPanel></AdminPanel>,
            },
            {
                path: '/due-equipment',
                element:<DueEquipmentPanel></DueEquipmentPanel>,
            },
            {
                path:'/login',
                element:<LogInnForm></LogInnForm>
            },
            {
                path: '/signup',
                element: <SignIn></SignIn>,
            },
        ]

    }
])