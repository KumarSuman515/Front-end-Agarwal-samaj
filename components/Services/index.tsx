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
      color: "from-goldenrod to-darkgoldenrod"
    },
    {
      id: 2,
      icon: "❤️",
      title: "Matrimony Services",
      description: "Find your life partner within the trusted Agarwal Samaj community. Verified profiles and secure matchmaking.",
      link: "/matrimony",
      color: "from-gold to-goldenrod"
    },
    {
      id: 3,
      icon: "📢",
      title: "Community Classifieds",
      description: "Post and browse local classifieds, business opportunities, and community announcements.",
      link: "/classified",
      color: "from-saddlebrown to-burlywood"
    },
    {
      id: 4,
      icon: "🤝",
      title: "Membership Programs",
      description: "Join our community with different membership tiers. Access exclusive benefits and networking opportunities.",
      link: "/membership",
      color: "from-darkgoldenrod to-goldenrod"
    },
    {
      id: 5,
      icon: "📝",
      title: "Community Blog",
      description: "Read and share articles about community news, cultural insights, and member stories.",
      link: "/blog",
      color: "from-burlywood to-wheat"
    },
    {
      id: 6,
      icon: "📞",
      title: "Contact & Support",
      description: "Get in touch with community leaders, ask questions, and get support when you need it.",
      link: "/support",
      color: "from-wheat to-cream"
    }
  ];

  return (
    <>
      <section id="services" className="section-padding bg-gradient-to-b from-white to-alabaster dark:from-black dark:to-blacksection">
        <div className="relative mx-auto max-w-c-1390 container-padding">
          <SectionHeader
            headerInfo={{
              title: "Our Community Services",
              subtitle: "What We Offer",
              description: "Discover the comprehensive range of services designed to strengthen and connect the Agarwal Samaj community.",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative glass-effect rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden card-hover"
              >
                <div className="p-8">
                  <div className={`w-20 h-20 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-4 group-hover:text-goldenrod transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-waterloo dark:text-manatee mb-6 leading-relaxed text-lg">
                    {service.description}
                  </p>
                  
                  <a
                    href={service.link}
                    className="inline-flex items-center text-goldenrod font-semibold hover:text-darkgoldenrod transition-colors duration-300 group/link"
                  >
                    Learn More
                    <svg className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
                
                <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
