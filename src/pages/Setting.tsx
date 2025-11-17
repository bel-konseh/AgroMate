import React, { useState } from 'react';
import { Camera, Save, User, Mail, Phone, MapPin, Lock } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { uploadImageToCloudinary } from '../services/cloudinaryServices';

const SettingsPage: React.FC = () => {
  const { userData, currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    location: userData?.location || '',
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(userData?.avatar || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const getInitials = (name: string) => 
    name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!currentUser || !userData) {
      alert('You must be logged in to update your profile');
      return;
    }

    setIsSaving(true);

    try {
      let avatarUrl = userData.avatar;

      // Upload avatar if changed
      if (avatarFile) {
        setIsUploadingAvatar(true);
        console.log('Uploading avatar to Cloudinary...');
        avatarUrl = await uploadImageToCloudinary(avatarFile);
        console.log('Avatar uploaded:', avatarUrl);
        setIsUploadingAvatar(false);
      }

      // Update Firestore
      const userRef = doc(db, 'users', currentUser.uid);
      const updateData: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        location: formData.location,
      };

      if (avatarUrl) {
        updateData.avatar = avatarUrl;
      }

      await updateDoc(userRef, updateData);

      alert('Profile updated successfully!');
      setIsEditing(false);
      setAvatarFile(null);
      
      // Reload page to reflect changes
      window.location.reload();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      alert(`Failed to update profile: ${error.message}`);
    } finally {
      setIsSaving(false);
      setIsUploadingAvatar(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      location: userData?.location || '',
    });
    setAvatarPreview(userData?.avatar || null);
    setAvatarFile(null);
    setIsEditing(false);
  };

  if (!userData) {
    return (
      <DashboardLayout userType="buyer">
        <div className="p-6 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[--color-primary] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading settings...</p>
          </div>
        </div>
        </DashboardLayout>
        
    );
  }

  return (
    <DashboardLayout userType={userData.userType}>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your account settings and profile information</p>
          </div>

          {/* Profile Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>

            {/* Avatar Section */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="relative">
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Profile" 
                    className="h-24 w-24 rounded-full object-cover border-4 border-gray-200"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center border-4 border-gray-200">
                    <span className="text-2xl font-bold text-white">
                      {getInitials(`${formData.firstName} ${formData.lastName}`)}
                    </span>
                  </div>
                )}
                
                {isEditing && (
                  <label className="absolute bottom-0 right-0 h-8 w-8 bg-[--color-primary] rounded-full flex items-center justify-center cursor-pointer hover:bg-[--color-primary-dark] transition-colors">
                    <Camera className="h-4 w-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                      disabled={isSaving || isUploadingAvatar}
                    />
                  </label>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {formData.firstName} {formData.lastName}
                </h3>
                <p className="text-sm text-gray-500 capitalize">{userData.userType}</p>
                {isUploadingAvatar && (
                  <p className="text-xs text-blue-600 mt-1">Uploading avatar...</p>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing || isSaving}
                leftIcon={<User className="h-5 w-5 text-gray-400" />}
                required
              />

              {/* Last Name */}
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing || isSaving}
                leftIcon={<User className="h-5 w-5 text-gray-400" />}
                required
              />
              
                          

              {/* Email (Read-only) */}
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                disabled={true}
                leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
                helperText="Email cannot be changed"
              />

              {/* Phone */}
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing || isSaving}
                leftIcon={<Phone className="h-5 w-5 text-gray-400" />}
                placeholder="+237 6XX XXX XXX"
              />

              {/* Location */}
              <div className="md:col-span-2">
                <Input
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={!isEditing || isSaving}
                  leftIcon={<MapPin className="h-5 w-5 text-gray-400" />}
                  placeholder="City, Region"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
              {!isEditing ? (
                <Button
                  variant="primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSaving || isUploadingAvatar}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    leftIcon={<Save className="h-4 w-4" />}
                    onClick={handleSave}
                    loading={isSaving || isUploadingAvatar}
                    disabled={isSaving || isUploadingAvatar}
                  >
                    {isSaving ? 'Saving...' : isUploadingAvatar ? 'Uploading...' : 'Save Changes'}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Account Type Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Type</h2>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 capitalize">{userData.userType} Account</p>
                <p className="text-sm text-gray-500">Member since {new Date(userData.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
            <Button
              variant="outline"
              leftIcon={<Lock className="h-4 w-4" />}
              onClick={() => alert('Password change feature coming soon!')}
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;