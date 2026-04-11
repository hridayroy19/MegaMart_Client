"use client";
import { IBlogPost } from "@/types/blogPost";
import { Calendar, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

interface BlogListProps {
  posts: IBlogPost[];
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  postsPerPage: number;
}

export default function BlogList({
  posts,
  currentPage,
  setCurrentPage,
  postsPerPage,
}: BlogListProps) {
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="space-y-10">
      {currentPosts.map((post) => (
        <div
          key={post.id}
          className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          <Image
            width={700}
            height={500}
            src={post.images[0]}
            alt={post.title}
            className="w-full h-96 object-cover rounded-t-xl"
          />
          <div className="p-2 mt-2 bg-card">
            <span className="text-sm mb-2 bg-primary text-background px-4 py-1 rounded-full">
              {post.category}
            </span>
            <Link href={`/blog/${post.id}`}>
              <h2 className="text-2xl pt-3  font-semibold  hover:text-primary cursor-pointer transition-colors duration-300">
                {post.title}
              </h2>
            </Link>
            <p className="text-muted-foreground mt-3">
              {post.description.slice(0, 250)}...
            </p>
            <div className="flex items-center gap-5 text-sm text-muted py-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-muted" />
                <span>{post.comments} comments</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-lg border font-medium ${
              currentPage === i + 1
                ? "bg-primary text-background border-primary"
                : "bg-card text-foreground border-border"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
