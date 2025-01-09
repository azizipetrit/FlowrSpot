import { useEffect, useState } from "react";
import api from "../../utils/api";

const ProfileModal = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    profileImage: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/account/me");
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="modal">
      <h2>Profile</h2>
      <img src={profile.profileImage} alt="Profile" />
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default ProfileModal;
