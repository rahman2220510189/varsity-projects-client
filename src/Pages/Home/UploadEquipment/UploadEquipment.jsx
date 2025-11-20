import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const UploadEquipment = () => {
const { register, handleSubmit, reset } = useForm();
const axiosPublic = useAxiosPublic();  
const   GOOGLE_API_KEY = "https://script.google.com/macros/s/AKfycbz16FzJyOiy62I1CErXWVnnKf0wqjwsiBMjupVcK6kss_kMY4Aoyqjw_kpMHUaiFy4/exec";
const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('image', data.image[0]);
      formData.append('name', data.name);
      formData.append('quantity', data.quantity);
      formData.append('description', data.description);
      formData.append('purpose', data.purpose);   
      formData.append('website', data.website)
      

      const res = await axiosPublic.post('/api/equipment', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

          const sheetsData ={
            name: data.name,
            quantity: data.quantity,
          }
          await fetch(GOOGLE_API_KEY, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sheetsData),
          })

      alert(res.data.message || 'Equipment uploaded successfully');
      reset();
    } catch (err) {
      console.log(err);
      alert('Upload failed');
    }
  };
  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#001f3f] via-blue-500 to-green-400 via-purple-500 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-400 to-purple-500">
          Add New Equipment
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="file"
            {...register('image', { required: true })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Equipment Name"
            {...register('name', { required: true })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            {...register('quantity', { required: true })}
            className="border p-2 rounded"
          />
            <input
            type="text"
            placeholder="Purpose"
            {...register('purpose', { required: true })}
            className="border p-2 rounded"
          />
          
          <textarea
            placeholder="Description"
            {...register('description', { required: true })}
            className="border p-2 rounded"
          />
            <input
            type="url"
            placeholder="Website Link"
            {...register('website', { required: true })}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 via-green-400 to-purple-500 text-white py-2 rounded font-semibold hover:opacity-90 transition"
          >
            Upload Equipment
          </button>
        </form>
      </div>
    </div>
  )
}

export default UploadEquipment

