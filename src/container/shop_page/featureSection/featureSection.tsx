import { Car, CreditCard, HeartHandshake, MessageSquareText } from 'lucide-react';

const features = [
    {
        icon: <Car size={24} />,
        title: "Free Shipping",
        description: "Free shipping all over the US",
    },
    {
        icon: <HeartHandshake size={24} />,
        title: "100% Satisfaction",
        description: "Free shipping all over the US",
    },
    {
        icon: <CreditCard size={24} />,
        title: "Secure Payments",
        description: "Free shipping all over the US",
    },
    {
        icon: <MessageSquareText size={24} />,
        title: "24/7 Support",
        description: "Free shipping all over the US",
    },
];

const FeatureSection = () => {
    return (
        <div className="w-full">
            {/* Grid Layout for Responsiveness */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-[#EEF2FF] rounded-2xl p-6 flex items-center gap-4 hover:shadow-sm transition-shadow duration-200"
                    >
                        {/* Icon Circle */}
                        <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full shrink-0">
                            {feature.icon}
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col">
                            <h3 className=" leading-tight">
                                {feature.title}
                            </h3>
                            <p className="mt-1">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureSection;