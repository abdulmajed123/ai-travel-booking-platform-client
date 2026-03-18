const features = [
  {
    title: "AI Travel Suggestions",
    desc: "Get smart destination recommendations based on your interests.",
  },
  {
    title: "Easy Booking",
    desc: "Book flights, hotels, and tours in just a few clicks.",
  },
  {
    title: "Secure Payment",
    desc: "Your transactions are fully safe and encrypted.",
  },
  {
    title: "24/7 Support",
    desc: "We are always here to help you anytime.",
  },
];

const Feature = () => {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center"
            >
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
