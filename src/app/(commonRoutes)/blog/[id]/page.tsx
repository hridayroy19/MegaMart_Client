import BlogDetails from "@/container/blog_page/blogDetails/blogDetails";
import FeatureSection from "@/container/blog_page/blogs/featureSection";

type CareerPageProps = {
  params: Promise<{
    id: string;
  }>;
};
const BlogDetailspage = async ({ params }: CareerPageProps) => {
  const { id } = await params;
  return (
    <div className="max-content-width section-content-top section-padding-x ">
      <section>
        <BlogDetails id={id} />
      </section>
      <section className=" py-10 ">
        <FeatureSection />
      </section>
    </div>
  );
};

export default BlogDetailspage;
