"use client";

import { useAuth } from "@/app/context/auth";
import apiClient from "@/app/lib/apiClient";
import { PostType, ProfileType } from "@/app/type";
import Image from "next/image";
import { useParams } from "next/navigation";

import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const { user } = useAuth();

  const params = useParams();
  const userId = params.id;
  // console.log(userId)

  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [userPostData, setUserPostData] = useState<PostType[] | null>(null);

  // プロフィール情報の取得リクエストAPI
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await apiClient.get(`/users/profile/${userId}`);
        // console.log(response.data.profile);
        setProfile(response.data.profile);
      } catch (error: any) {
        console.log(error.response);
      }
    };
    fetchUserProfile();
  }, [userId]);

  // console.log(profile);
  //   console.log(profile?.user)

  useEffect(() => {
    const fetchUserPost = async () => {
      try {
        const response = await apiClient.get(`/posts/${profile?.userId}`);
        // console.log(response.data.userPost)
        setUserPostData(response.data.userPost);
      } catch (error: any) {
        console.log(error.response);
      }
    };
    fetchUserPost();
  }, [profile?.userId]);

  console.log(userPostData);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex items-center">
            <Image
              className="w-20 h-20 rounded-full mr-4"
              alt="User Avatar"
              src={
                profile ? profile.profileImageUrl : "/path/to/default/image.png"
              }
              width={20}
              height={20}
            />
            <div>
              <h2 className="text-2xl font-semibold mb-1">
                {profile?.user.username}
              </h2>
              <p className="text-gray-600">{profile?.bio}</p>
            </div>
          </div>
        </div>

        {userPostData?.map((post:any) => (
          <div key = {post.id} className="bg-white shadow-md rounded p-4 mb-4">
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Image
                  className="w-10 h-10 rounded-full mr-2"
                  alt="User Avatar"
                  src={
                    profile
                      ? profile.profileImageUrl
                      : "/path/to/default/image.png"
                  }
                  width={20}
                  height={20}
                />
                <div>
                  <h2 className="font-semibold text-md">
                    {profile?.user.username}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
