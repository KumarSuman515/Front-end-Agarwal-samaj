import React from "react";
import Image from "next/image";

const LatestNews = () => {
  return (
    <section id="latest-news" className="px-4 md:px-8 2xl:px-0">
      <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-10">
          {/* 70% width main video section */}
          <div className="lg:col-span-7 rounded-2xl bg-gray-900 p-4 text-white md:p-8">
            <h1 className="mb-4 text-center text-3xl font-extrabold md:mb-6 md:text-5xl">
              लाइव न्यूज़ ब्रॉडकास्ट
            </h1>
            {/* Video player */}
            <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg bg-black shadow-xl md:mb-6">
              <video
                className="h-full w-full object-cover"
                controls
                autoPlay
                muted
                loop
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                आपका ब्राउज़र वीडियो टैग को सपोर्ट नहीं करता है।
              </video>
            </div>
            <p className="mx-auto mt-2 max-w-2xl text-center text-base text-gray-300 md:text-lg">
              ब्रेकिंग न्यूज़ और दुनिया भर के रियल-टाइम अपडेट्स। हमारे लाइव कवरेज के साथ हमेशा सूचित रहें।
            </p>
          </div>

          {/* 30% width sidebar section */}
          <aside className="lg:col-span-3 rounded-2xl bg-gray-100 p-4 md:p-6">
            <h2 className="mb-4 border-b-2 border-gray-300 pb-2 text-xl font-bold text-gray-900 md:text-2xl">
              ताज़ा सुर्खियाँ
            </h2>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-300">
                  <Image
                    src="https://images.unsplash.com/photo-1546410531-ef17c24f605a"
                    alt="Breaking News"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <a href="#" className="text-lg font-semibold hover:underline">
                    🔥 ब्रेकिंग: नया AI मॉडल लॉन्च
                  </a>
                  <p className="mt-1 text-sm text-gray-600">
                    एक प्रमुख टेक कंपनी ने नया आर्टिफिशियल इंटेलिजेंस मॉडल लॉन्च किया है...
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-300">
                  <Image
                    src="https://images.unsplash.com/photo-1579621970795-87facc2f976d"
                    alt="Market News"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <a href="#" className="text-lg font-semibold hover:underline">
                    📈 मार्केट: शेयर बाजार में उछाल
                  </a>
                  <p className="mt-1 text-sm text-gray-600">
                    शेयर बाजार में रिकॉर्ड उछाल, निवेशकों में उत्साह...
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-300">
                  <Image
                    src="https://images.unsplash.com/photo-1517404215738-15263e9f9178"
                    alt="Science News"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <a href="#" className="text-lg font-semibold hover:underline">
                    🔬 विज्ञान: मंगल ग्रह पर पानी के सबूत
                  </a>
                  <p className="mt-1 text-sm text-gray-600">
                    वैज्ञानिकों ने मंगल पर जीवन की संभावना की ओर एक और कदम बढ़ाया...
                  </p>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
