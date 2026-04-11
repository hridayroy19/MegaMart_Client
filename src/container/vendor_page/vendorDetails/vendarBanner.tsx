import Image from "next/image";

const VendorSaleBanner = () => {
  return (
    <div>
      <Image
        src="https://res.cloudinary.com/dsb1inal0/image/upload/v1765784756/139242469_2849412395296137_2872843147255202257_n_ftmprr.jpg"
        alt="Collection of fashion items"
        width={900}
        height={500}
        className="rounded-xl w-full h-[270px] object-cover"
      />
    </div>
  );
};

export default VendorSaleBanner;
