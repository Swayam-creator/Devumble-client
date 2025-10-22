import { useState, useEffect } from 'react';
import { Camera, Mail, User as UserIcon, Calendar, Edit2, Save, X, Code, Briefcase, Award } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../lib/api';
import { addUser } from '../features/user/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const myprofile = useSelector((state) => state.user.user);
  console.log(myprofile);

  const [isEditing, setIsEditing] = useState(false);
  const [uploadMode, setUploadMode] = useState('url'); 
  
  // Initialize with safe defaults
  const [profile, setProfile] = useState({
    firstName: myprofile?.firstName || '',
    lastName: myprofile?.lastName || '',
    age: myprofile?.age || 18,
    gender: myprofile?.gender || 'male',
    profileImage: myprofile?.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    about: myprofile?.about || '',
    skills: myprofile?.skills || [],
    projects: myprofile?.projects || [],
  });

  const [editedProfile, setEditedProfile] = useState(profile);
  const [newSkill, setNewSkill] = useState('');
  const [newProject, setNewProject] = useState('');

  // Update profile state when myprofile changes (after Redux loads)
  useEffect(() => {
    if (myprofile) {
      const updatedProfile = {
        firstName: myprofile?.firstName || '',
        lastName: myprofile?.lastName || '',
        age: myprofile?.age || 18,
        gender: myprofile?.gender || 'male',
        profileImage: myprofile?.profileImage,
        about: myprofile?.about || '',
        skills: myprofile?.skills || [],
        projects: myprofile?.projects || [],
      };
      setProfile(updatedProfile);
      setEditedProfile(updatedProfile);
    }
  }, [myprofile]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = async () => {
    try {
      const res = await api.patch('/profile/update/edit', editedProfile);
      if (res.data.success) {
        toast.success('Profile updated successfully');
        dispatch(addUser(res.data.data));
        setIsEditing(false);
        setProfile(editedProfile);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Failed to save profile.');
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
    setNewSkill('');
    setNewProject('');
  };

  const handleChange = (field, value) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('profilePic', file);

    try {
      const res = await api.post('/profile/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setEditedProfile((prev) => ({ ...prev, profileImage: res.data.url }));
      toast.success('Image uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      if (editedProfile.skills.length >= 10) {
        toast.error("You can't add more than 10 skills");
        return;
      }
      setEditedProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    setEditedProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addProject = () => {
    if (newProject.trim()) {
      if (editedProfile.projects.length >= 5) {
        toast.error("You can't add more than 5 projects");
        return;
      }
      setEditedProfile((prev) => ({
        ...prev,
        projects: [...prev.projects, newProject.trim()],
      }));
      setNewProject('');
    }
  };

  const removeProject = (index) => {
    setEditedProfile((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const currentData = isEditing ? editedProfile : profile;

  // Show loading state if profile hasn't loaded yet
  if (!myprofile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen -mt-2 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32 relative">
            {myprofile.profileCompleteNess ? (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Award className="w-3 h-3" />
                Profile Complete
              </div>
            ) : (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <X className="w-3 h-3" />
                Profile Incomplete
              </div>
            )}
          </div>

          <div className="relative px-6 pb-6">
            <div className="flex justify-between items-start -mt-16 mb-4">
              <div className="relative">
                <img
                  src={currentData.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />

                {isEditing && (
                  <div className="absolute bottom-0 right-0 bg-white p-2 rounded-lg shadow-lg">
                    <Camera className="w-5 h-5 text-gray-600 mb-2" />
                    <select
                      value={uploadMode}
                      onChange={(e) => setUploadMode(e.target.value)}
                      className="border rounded-md p-1 text-xs mb-1"
                    >
                      <option value="url">Enter URL</option>
                      <option value="file">Upload File</option>
                    </select>

                    {uploadMode === 'url' ? (
                      <input
                        type="text"
                        value={editedProfile.profileImage}
                        onChange={(e) => handleChange('profileImage', e.target.value)}
                        placeholder="Enter image URL"
                        className="border rounded-md p-1 text-xs mt-1 w-36"
                      />
                    ) : (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="text-xs mt-1 w-36"
                      />
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-16">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Name Section */}
            <div className="mb-6">
              {isEditing ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editedProfile.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="First Name"
                    className="text-3xl font-bold text-gray-900 border-b-2 border-blue-300 focus:border-blue-600 outline-none flex-1"
                  />
                  <input
                    type="text"
                    value={editedProfile.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="Last Name"
                    className="text-3xl font-bold text-gray-900 border-b-2 border-blue-300 focus:border-blue-600 outline-none flex-1"
                  />
                </div>
              ) : (
                <h1 className="text-3xl font-bold text-gray-900">
                  {currentData.firstName || 'First Name'} {currentData.lastName || 'Last Name'}
                </h1>
              )}
            </div>

            {/* Grid Section: Email, Age, Gender */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Email</p>
                  <p className="text-sm text-gray-900 truncate">{myprofile?.emailId || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Age</p>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedProfile.age}
                      onChange={(e) => handleChange('age', Number(e.target.value))}
                      className="text-sm text-gray-900 border-b border-gray-300 focus:border-blue-600 outline-none w-full"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{currentData.age} years</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-green-100 p-2 rounded-lg">
                  <UserIcon className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Gender</p>
                  {isEditing ? (
                    <select
                      value={editedProfile.gender}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      className="text-sm text-gray-900 border-b border-gray-300 focus:border-blue-600 outline-none w-full bg-transparent "
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  ) : (
                    <p className="text-sm text-gray-900 capitalize">{currentData.gender}</p>
                  )}
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                About
              </h2>
              {isEditing ? (
                <textarea
                  value={editedProfile.about}
                  onChange={(e) => handleChange('about', e.target.value)}
                  rows="3"
                  className="w-full text-gray-700 border-2 border-gray-300 rounded-lg p-2 focus:border-blue-600 outline-none resize-none"
                />
              ) : (
                <p className="text-gray-700">{currentData.about || 'No bio added yet'}</p>
              )}
            </div>

            {/* Skills Section */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3 flex items-center gap-2">
                <Code className="w-4 h-4" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2 mb-3">
                {currentData.skills && currentData.skills.length > 0 ? (
                  currentData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {skill}
                      {isEditing && (
                        <button onClick={() => removeSkill(index)} className="hover:text-red-600 transition">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No skills added yet</p>
                )}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Add a skill"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none text-sm"
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

           
            <div className="p-4 bg-gray-50 rounded-lg">
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Projects
              </h2>
              <div className="space-y-2 mb-3">
                {currentData.projects && currentData.projects.length > 0 ? (
                  currentData.projects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-800">{project}</span>
                      {isEditing && (
                        <button onClick={() => removeProject(index)} className="text-red-500 hover:text-red-700 transition">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No projects added yet</p>
                )}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addProject()}
                    placeholder="Add a project"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none text-sm"
                  />
                  <button
                    onClick={addProject}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;