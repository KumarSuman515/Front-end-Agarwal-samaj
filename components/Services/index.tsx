import React from "react";
import SectionHeader from "@/components/Common/SectionHeader";

const Services = () => {
  const services = [
    {
      id: 1,
      icon: "📸",
      title: "Community Gallery",
      description: "Explore and share photos from community events, celebrations, and gatherings. Connect through visual memories.",
      link: "/gallery",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      icon: "❤️",
      title: "Matrimony Services",
      description: "Find your life partner within the trusted Agarwal Samaj community. Verified profiles and secure matchmaking.",
      link: "/matrimony",
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 3,
      icon: "📢",
      title: "Community Classifieds",
      description: "Post and browse local classifieds, business opportunities, and community announcements.",
      link: "/classified",
      color: "from-green-500 to-green-600"
    },
    {
      id: 4,
      icon: "🤝",
      title: "Membership Programs",
      description: "Join our community with different membership tiers. Access exclusive benefits and networking opportunities.",
      link: "/membership",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 5,
      icon: "📝",
      title: "Community Blog",
      description: "Read and share articles about community news, cultural insights, and member stories.",
      link: "/blog",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 6,
      icon: "📞",
      title: "Contact & Support",
      description: "Get in touch with community leaders, ask questions, and get support when you need it.",
      link: "/support",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <>
      <section id="services" className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <SectionHeader
            headerInfo={{
              title: "Our Community Services",
              subtitle: "What We Offer",
              description: "Discover the comprehensive range of services designed to strengthen and connect the Agarwal Samaj community.",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <a
                    href={service.link}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
                
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
