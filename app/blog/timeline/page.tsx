"use client";

import Post from "@/app/components/Post";
import apiClient from "@/app/lib/apiClient";
import { PostType } from "@/app/type";
import React, { FormEvent, useEffect, useState } from "react";

const Timeline = () => {
  const [postText, setPostText] = useState<string>("");
  const [latestPosts, setLatestPosts] = useState<PostType[]>([]);

  // 記事投稿リクエストAPI
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await apiClient.post("/posts/post", {
        content: postText,
      });
      // console.log(response.data.post);
      const newPost = response.data.post;
      setPostText("");
      setLatestPosts((prevPost) => [newPost,...prevPost]);
    } catch (error: any) {
      if (error && error.response) {
        console.log(error.response.data);
      }
    }
  };

  // 記事データ取得リクエストAPI
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await apiClient.get("/posts/get_latest_post");
        // console.log(response.data.allPosts)
        setLatestPosts(response.data.allPosts);
      } catch (error: any) {
        if (error && error.response) {
          console.log(error.response.data);
        }
      }
    };
    fetchAllData();
  }, []);

  // console.log(latestPosts);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="What's on your mind?"
              onChange={(e) => setPostText(e.target.value)}
              value={postText}
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
            >
              投稿
            </button>
          </form>
        </div>
        {latestPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default Timeline;
