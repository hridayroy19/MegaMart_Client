"use client";
import React, { useState } from "react";
import { useGetBlogPostQuery } from "@/redux/features/blogPost/blogPostApi";
import { IBlogPost } from "@/types/blogPost";
import Sidebar from "./blogSidebar";
import BlogList from "./blogList";
import BlogHeader from "./blogHeader";

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const { data, isLoading, isError } = useGetBlogPostQuery();

  if (isLoading)
    return <p className="py-6 text-sm text-muted-foreground">Loading...</p>;
  if (isError)
    return <p className="py-6 text-sm text-error">Failed to load posts.</p>;
  if (!data?.length)
    return <p className="py-6 text-sm text-error">No posts available.</p>;

  // Filter posts by search and category
  const filteredPosts: IBlogPost[] = data.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = selectedCategory
      ? post.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <BlogHeader />
      <div className="w-full  section-padding-x mx-auto py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2">
        <BlogList
          posts={filteredPosts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          postsPerPage={postsPerPage}
        />
      </div>

      <Sidebar
        data={data}
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
    </div>
  );
}
