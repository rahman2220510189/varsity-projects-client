import React, { act, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const EditModal = ({ item, onClose, onSuccess }) => {
  const [imagePreview, setImagePreview] = useState(
    `http://localhost:5000/uploads/${item.image}`
  );
  const [newImageFile, setNewImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      purpose: item.purpose,
      website: item.website || ''
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('quantity', data.quantity);
      formData.append('purpose', data.purpose);
      formData.append('website', data.website);

      if (newImageFile) {
        formData.append('image', newImageFile);
      }

      const response = await axios.put(
        `http://localhost:5000/api/equipment/${item._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
   

      alert('Item updated successfully!');
      onSuccess();
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Error updating item: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Edit Equipment</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Image Preview */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Equipment Image
                </label>
                <div className="border-4 border-dashed border-gray-300 rounded-2xl p-4 text-center hover:border-purple-500 transition-all">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    Change Image
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    Leave unchanged to keep current image
                  </p>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Equipment Name *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
                  placeholder="Enter equipment name"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  {...register('quantity', {
                    required: 'Quantity is required',
                    min: { value: 0, message: 'Quantity must be 0 or more' }
                  })}
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
                  placeholder="Enter quantity"
                />
                {errors.quantity && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.quantity.message}
                  </span>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  rows="5"
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all resize-none"
                  placeholder="Enter description"
                ></textarea>
                {errors.description && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.description.message}
                  </span>
                )}
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Purpose *
                </label>
                <textarea
                  {...register('purpose', { required: 'Purpose is required' })}
                  rows="4"
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all resize-none"
                  placeholder="Enter purpose"
                ></textarea>
                {errors.purpose && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.purpose.message}
                  </span>
                )}
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  {...register('website')}
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-gray-200 text-gray-700 font-bold text-lg rounded-xl hover:bg-gray-300 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {submitting ? 'Updating...' : 'Update Equipment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;