import { easeInOut, motion } from "framer-motion";
import { Footer } from "../components/Footer";
export function Global() {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, z: -50 },
    visible: { opacity: 1, scale: 1, z: 0 },
  };
  return (
    <main className="container mx-auto px-6 py-20">
      {/* Global Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Global Reach
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Delivering scalable, AI-powered content moderation solutions to
          communities across the globe. We are committed to providing real-time,
          intelligent moderation no matter where you are.
        </p>
      </div>

      {/* Regions Grid Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
        {[
          {
            imgurl:
              "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
            title: "North America",
            description:
              "Serving the USA, Canada, and Mexico with top-tier AI solutions, ensuring rapid and effective content moderation across diverse platforms.",
          },
          {
            imgurl:
              "https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg",
            title: "Europe",
            description:
              "Providing cutting-edge AI-powered content moderation solutions to various European countries, focusing on multilingual capabilities and diverse cultures.",
          },
          {
            imgurl:
              "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
            title: "Asia",
            description:
              "Expanding our AI-driven moderation to Asia, supporting major markets including India, China, Japan, and Southeast Asia, adapting to local languages and trends.",
          },
          {
            imgurl:
              "https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg",
            title: "Africa",
            description:
              "Empowering African communities with scalable and reliable AI solutions, ensuring online safety and effective content moderation throughout the continent.",
          },
          {
            imgurl:
              "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg",
            title: "Australia",
            description:
              "Bringing state-of-the-art AI solutions to Australia, ensuring safe online spaces and empowering local platforms to moderate content effectively.",
          },
          {
            imgurl:
              "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1280px-Flag_of_Brazil.svg.png",
            title: "South America",
            description:
              "Extending our AI-powered moderation services to South America, supporting diverse languages and cultures across the continent.",
          },
        ].map((feature, index) => (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.1, ease: easeInOut }}
            key={index}
          >
            <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors text-center">
              <div className="mb-4">
                <img
                  src={feature.imgurl}
                  alt={feature.title}
                  className={`h-12 w-${
                    feature.title === "South America" ||
                    feature.title === "Australia"
                      ? "16"
                      : "12"
                  } mx-auto`}
                />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          </motion.div>
        ))}
        {/* North America */}
        {/* <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors text-center">
                    <div className="mb-4">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" 
                            alt="USA" 
                            className="h-12 w-12 mx-auto"
                        />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">North America</h3>
                    <p className="text-gray-400">
                        Serving the USA, Canada, and Mexico with top-tier AI solutions, ensuring rapid and effective content moderation across diverse platforms.
                    </p>
                </div> */}

        {/* Europe */}
        {/* <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors text-center">
                    <div className="mb-4">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg" 
                            alt="Germany" 
                            className="h-12 w-12 mx-auto"
                        />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">Europe</h3>
                    <p className="text-gray-400">
                        Providing cutting-edge AI-powered content moderation solutions to various European countries, focusing on multilingual capabilities and diverse cultures.
                    </p>
                </div> */}

        {/* Asia */}
        {/* <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors text-center">
                    <div className="mb-4">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" 
                            alt="India" 
                            className="h-12 w-12 mx-auto"
                        />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">Asia</h3>
                    <p className="text-gray-400">
                        Expanding our AI-driven moderation to Asia, supporting major markets including India, China, Japan, and Southeast Asia, adapting to local languages and trends.
                    </p>
                </div> */}

        {/* Africa */}
        {/* <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors text-center">
                    <div className="mb-4">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg" 
                            alt="South Africa" 
                            className="h-12 w-12 mx-auto"
                        />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">Africa</h3>
                    <p className="text-gray-400">
                        Empowering African communities with scalable and reliable AI solutions, ensuring online safety and effective content moderation throughout the continent.
                    </p>
                </div> */}

        {/* Australia */}
        {/* <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors text-center">
                    <div className="mb-4">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg" 
                            alt="Australia" 
                            className="h-12 w-14 mx-auto"
                        />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">Australia</h3>
                    <p className="text-gray-400">
                        Bringing state-of-the-art AI solutions to Australia, ensuring safe online spaces and empowering local platforms to moderate content effectively.
                    </p>
                </div> */}

        {/* South America */}
        {/* <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors text-center">
                    <div className="mb-4">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1280px-Flag_of_Brazil.svg.png" 
                            alt="Brazil" 
                            className="h-12 w-16 mx-auto"
                        />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">South America</h3>
                    <p className="text-gray-400">
                        Extending our AI-powered moderation services to South America, supporting diverse languages and cultures across the continent.
                    </p>
                </div>  */}
      </div>

      {/* Global Commitment Section */}
      <div className="mt-16 text-center">
        <p className="text-lg text-gray-400">
          No matter where you are in the world, Maverick AI is here to help you
          ensure a safe and inclusive online environment. Our AI technology
          adapts to local needs and cultures, empowering communities to thrive
          safely online.
        </p>
      </div>
      <Footer />
    </main>
  );
}
