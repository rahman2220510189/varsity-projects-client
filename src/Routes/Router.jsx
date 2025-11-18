import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home';
import UploadEquipment from '../Pages/Home/UploadEquipment/UploadEquipment';
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
            }
        ]

    }
])