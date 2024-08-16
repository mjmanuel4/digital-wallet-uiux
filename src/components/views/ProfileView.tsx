import React, { useState } from 'react';
import { User, Mail, Phone, Lock } from 'lucide-react';

interface Profile {
  name: string,
  email: string,
  phone: string
}

function ProfileView() {
  const [profile, setProfile] = useState<Profile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to update the user's profile
    alert('Profile updated successfully!');
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  return (
    <div className="space-y-6 px-6 sm:px-0">
    <div className="bg-white dark:bg-slate-800 shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">User Profile</h3>
      </div>
      <div className="border-t border-gray-200 dark:border-slate-700">
        <dl>
          <div className="bg-gray-50 dark:bg-slate-800 px-4 py-5 grid grid-cols-3 sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-zinc-400 flex items-center">
              <User className="mr-2" size={18} /> Full name
            </dt>
            <dd className="my-auto ml-2 text-sm text-gray-900 dark:text-white my-auto col-span-2">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                profile.name
              )}
            </dd>
          </div>
          <div className="bg-white dark:bg-slate-800 px-4 py-5 grid grid-cols-3 sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-zinc-400 flex items-center">
              <Mail className="mr-2" size={18} /> Email address
            </dt>
            <dd className="my-auto ml-2 text-sm text-gray-900 dark:text-white my-auto col-span-2">
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                profile.email
              )}
            </dd>
          </div>
          <div className="bg-gray-50 dark:bg-slate-800 px-4 py-5 grid grid-cols-3 sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-zinc-400 flex items-center">
              <Phone className="mr-2" size={18} /> Phone number
            </dt>
            <dd className="my-auto ml-2 text-sm text-gray-900 dark:text-white my-auto col-span-2">
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                profile.phone
              )}
            </dd>
          </div>
        </dl>
      </div>
      <div className="px-4 py-3 bg-gray-50 dark:bg-slate-800 text-right sm:px-6">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit
          </button>
        )}
      </div>
    </div>
    </div>
  );
}

export default ProfileView;
