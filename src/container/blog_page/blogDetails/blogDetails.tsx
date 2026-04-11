"use client";
import Image from "next/image";
import { useGetBlogPostByIdQuery } from "@/redux/features/blogPost/blogPostApi";
import {
  Calendar,
  Check,
  MessageSquare,
  Quote,
  Star,
  User,
} from "lucide-react";
import BlogComment from "./blogComment";

const BlogDetails = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useGetBlogPostByIdQuery(id);
  if (isLoading)
    return <p className="py-6 text-sm text-muted-foreground">Loading...</p>;

  if (isError)
    return <p className="py-6 text-sm text-red-500">Failed to load post.</p>;

  if (!data)
    return <p className="py-6 text-sm text-red-500">Post not found.</p>;
  const blog = data;

  return (
    <section className="w-full mx-auto lg:pt-20 md:pt-44 pt-10">
      {/* Header */}
      <header className="max-w-7xl mb-12">
        <span className="inline-flex items-center text-xs font-semibold  bg-primary/15 text-foreground px-4 py-1.5 rounded-full mb-4">
          {blog.category}
        </span>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5">
          {blog.title}
        </h1>

        <div className="flex flex-wrap gap-5 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <User size={16} /> {blog.author}
          </span>
          <span className="flex items-center gap-2">
            <Calendar size={16} /> {blog.date}
          </span>
          <span className="flex items-center gap-2">
            <MessageSquare size={16} /> {blog.comments} Comments
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-14">
        <div className="rounded-2xl overflow-hidden shadow-md">
          <Image
            src={blog.images[0]}
            alt={blog.title}
            width={900}
            height={700}
            priority
            className="w-full h-[420px] md:h-[420px] object-cover"
          />
        </div>

        <article className="prose prose-gray max-w-none">
          <p className="text-foreground font-semibold text-lg ">
            {blog.description}
          </p>
        </article>
      </div>

      {/* Content */}
      <article className="max-w-7xl mb-14">
        <p className="text-lg leading-relaxed mb-8">{blog.excerpt}</p>
      </article>

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {blog.images.slice(1).map((img, i) => (
          <div key={i} className="rounded-xl overflow-hidden shadow-sm">
            <Image
              src={img}
              alt="Blog image"
              width={600}
              height={400}
              className="w-full h-[300px] object-cover"
            />
          </div>
        ))}
      </div>

      {/* Market Section */}
      <div className="max-w-4xl">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-5">
          {blog.marketTitle}
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 space-y-2 px-3 gap-3 mb-8">
          {blog.marketList.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-muted">
              <span className="text-primary mt-1">
                {" "}
                <Check />{" "}
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mb-10 rounded-2xl border border-border bg-primary/15 p-6 md:p-8">
          <Quote className="mb-4 h-12 w-12 rounded-full border border-border bg-primary p-2 text-background" />

          <p className="mb-4 text-lg leading-relaxed">{blog.review}</p>

          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-popover-foreground text-popover-foreground"
              />
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-extrabold"> Post :</h2>{" "}
          {blog.tags.map((tag, i) => (
            <span
              key={i}
              className="text-sm bg-primary/15 font-medium border border-border hover:bg-primary hover:text-background transition px-4 py-1.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <BlogComment />
    </section>
  );
};

export default BlogDetails;
