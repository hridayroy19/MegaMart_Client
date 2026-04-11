import VendorProductMain from "@/container/vendor_page/vendorDetails/vendorProductMain";
type CareerPageProps = {
  params: Promise<{
    id: string;
  }>;
};
const page = async ({ params }: CareerPageProps) => {
  const { id } = await params;
  return (
    <div className=" max-content-width section-content-top">
      <section className="section-padding-t">
        <VendorProductMain id={id} />
      </section>
    </div>
  );
};

export default page;
