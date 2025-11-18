import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home';
import UploadEquipment from '../Pages/Home/UploadEquipment/UploadEquipment';
import CollectForm from '../Pages/Home/UploadEquipment/CollectForm';
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
        ]

    }
])