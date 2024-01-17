// import { PostType } from "@/types";
import { PostType } from "@/app/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "../context/auth";

type PostProps = {
  post: PostType;
};

const Post = ({ post }: PostProps) => {
  // console.log(post.author.profile.profileImageUrl)

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Link href={`/profile/${post.authorId}`}>
            <Image
              src= {post.author.profile?.profileImageUrl}
              className="rounded-full mr-2"
              alt="User Avatar"
              width={40}
              height={40}
            />
          </Link>
          <div>
            <h2 className="font-semibold text-md">{post.author.username}</h2>
            <p className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
