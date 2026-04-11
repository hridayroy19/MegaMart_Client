"use client";
import { IBlogPost } from "@/types/blogPost";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  data: IBlogPost[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  selectedCategory: string | null;
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
}

export default function Sidebar({
  data,
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
}: SidebarProps) {
  // Categories
  const categories = Array.from(
    data.reduce((map, post) => {
      map.set(post.category, (map.get(post.category) || 0) + 1);
      return map;
    }, new Map<string, number>())
  ).map(([name, count]) => ({ name, count }));

  // Recent Posts (sorted by createdAt)
  const recentPosts = [...data]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="border border-border rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
        <h2 className="font-semibold text-2xl mb-4">Search</h2>
        <div className="border border-border mb-7 w-full mt-5"></div>
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-border px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>

      {/* Recent Posts */}
      <div className="border border-border rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
        <div className="border border-border mb-7 w-full mt-5"></div>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex gap-4 items-center">
              <Image
                width={80}
                height={80}
                src={post.images[0]}
                alt={post.title}
                className="w-20 h-20 rounded-md object-cover"
              />
              <div>
                <Link href={`/blog/${post.id}`}>
                  {" "}
                  <h3 className="font-semibold cursor-pointer hover:text-primary">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-sm text-mute mt-1">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="border border-border rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="border border-border mb-7 w-full mt-5"></div>
        <div className="space-y-3">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className={`flex hover:bg-muted/20 hover:shadow-sm hover:border-b border-border justify-between items-center px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                selectedCategory === cat.name
                  ? "bg-blue-100 font-semibold"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <span>
                {cat.name} ({cat.count.toString().padStart(2, "0")})
              </span>
              <span className="text-primary text-lg">→</span>
            </div>
          ))}
          {selectedCategory && (
            <button
              className="mt-3 w-full px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200 font-medium"
              onClick={() => setSelectedCategory(null)}
            >
              Show All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
