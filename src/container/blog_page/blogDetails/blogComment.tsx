import React from "react";

const BlogComment = () => {
  return (
    <section className="max-w-4xl mt-20">
      <h2 className="text-2xl font-semibold text-foreground mb-8">
        Leave a Comment
      </h2>

      <form className="space-y-6">
        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted">Full Name</label>
            <input
              type="text"
              placeholder="Full name"
              className="h-12 rounded-lg border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email address"
              className="h-12 rounded-lg border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted">Message</label>
          <textarea
            rows={6}
            placeholder="Write your comment here..."
            className="rounded-lg border border-border px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-secondary px-8 py-3 text-sm font-semibold text-background transition hover:bg-primary"
        >
          Post Comment
        </button>
      </form>
    </section>
  );
};

export default BlogComment;
