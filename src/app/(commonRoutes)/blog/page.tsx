import BlogPage from "@/container/blog_page/blogs/blogMain";
// import BlogPostDetails from "@/container/blog_page/BlogPostDetails";
import FeatureSection from "@/container/blog_page/blogs/featureSection";

const Blogpage = () => {
  return (
    <div className="pt-48">
      <section className="max-content-width">
        <BlogPage />
      </section>
      <section className="max-content-width py-10  section-padding-x">
        <FeatureSection />
      </section>
    </div>
  );
};

export default Blogpage;
