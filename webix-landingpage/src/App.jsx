import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import HeroSection from "./sections/HeroSection";
import FooterSection from "./component/common/Footer";
import Navbar from "./component/common/Navbar";
import Privacy from "./sections/Privacy";
import Cookies from "./sections/Cookies";
import ConsentBanner from "./component/common/ConsentBanner";
import SEO from "./component/common/SEO";

const PlateformSection = lazy(() => import("./sections/PlateformSection"));
const ServicesSection = lazy(() => import("./sections/ServicesSection"));
const FAQSection = lazy(() => import("./sections/FAQSection"));
const ProjectEcosystem = lazy(() => import("./sections/ProjectEcosystem"));

function App() {  
  return (

    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <SEO 
                title="Webix Infotech | Software & Web Development Company in Indore"
                description="Webix Infotech provides web development, mobile app development, custom software solutions, AI solutions, and digital marketing services in Indore, India."
                keywords="Web Development Company, Software Development Company, Mobile App Development, AI Solutions, Digital Marketing, Indore, India"
                canonical="https://webixinfotech.com/"
                
                structuredData={[
                  {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    name: "Webix Infotech",
                    url: "https://webixinfotech.com",
                    logo: "https://webixinfotech.com/logo.png",
                    telephone: "+91-9926820304",
                    address: {
                      "@type": "PostalAddress",
                      streetAddress: "Aditya Gateway MR 10",
                      addressLocality: "Indore",
                      addressRegion: "Madhya Pradesh",
                      postalCode: "452010",
                      addressCountry: "IN"
                    },
                    sameAs: [
                      "https://www.linkedin.com/company/webixinfotech",
                      "https://www.facebook.com/webixinfotech",
                      "https://www.instagram.com/webixinfotech"
                    ]
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    name: "Webix Infotech",
                    image: "https://webixinfotech.com/logo.png",
                    telephone: "+91-9926820304",
                    address: {
                      "@type": "PostalAddress",
                      streetAddress: "Aditya Gateway MR 10",
                      addressLocality: "Indore",
                      addressRegion: "Madhya Pradesh",
                      postalCode: "452010",
                      addressCountry: "IN"
                    },
                    geo: {
                      "@type": "GeoCoordinates",
                      latitude: "22.7176",
                      longitude: "75.8333"
                    },
                    openingHoursSpecification: [
                      {
                        "@type": "OpeningHoursSpecification",
                        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                        opens: "09:00",
                        closes: "18:00"
                      },
                      {
                        "@type": "OpeningHoursSpecification",
                        dayOfWeek: "Saturday",
                        opens: "10:00",
                        closes: "14:00"
                      }
                    ],
                    areaServed: {
                      "@type": "GeoCircle",
                      geoMidpoint: {
                        "@type": "GeoCoordinates",
                        latitude: "22.7176",
                        longitude: "75.8333"
                      },
                      geoRadius: "100000"
                    },
                    priceRange: "$$"
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    name: "Webix Infotech",
                    url: "https://webixinfotech.com",
                    description: "Webix Infotech provides web development, mobile app development, custom software solutions, AI solutions, and digital marketing services in Indore, India.",
                    potentialAction: {
                      "@type": "SearchAction",
                      target: {
                        "@type": "EntryPoint",
                        urlTemplate: "https://webixinfotech.com/search?q={search_term_string}"
                      },
                      "query-input": "required name=search_term_string"
                    }
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "Service",
                    name: "Web Development",
                    description: "Modern, scalable web applications built with cutting-edge frameworks and performance-first architecture.",
                    provider: {
                      "@type": "Organization",
                      name: "Webix Infotech",
                      url: "https://webixinfotech.com"
                    },
                    areaServed: {
                      "@type": "Country",
                      name: "India"
                    }
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "Service",
                    name: "Mobile Apps",
                    description: "Cross-platform mobile experiences with native performance that users love and businesses rely on.",
                    provider: {
                      "@type": "Organization",
                      name: "Webix Infotech",
                      url: "https://webixinfotech.com"
                    },
                    areaServed: {
                      "@type": "Country",
                      name: "India"
                    }
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "Service",
                    name: "Digital Marketing",
                    description: "Boost your online presence with SEO, social media marketing, paid advertising, content strategies, and data-driven campaigns.",
                    provider: {
                      "@type": "Organization",
                      name: "Webix Infotech",
                      url: "https://webixinfotech.com"
                    },
                    areaServed: {
                      "@type": "Country",
                      name: "India"
                    }
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "Service",
                    name: "ERP & HRMS",
                    description: "Complete ERP and HRMS solutions to manage operations, attendance",
                    provider: {
                      "@type": "Organization",
                      name: "Webix Infotech",
                      url: "https://webixinfotech.com"
                    },
                    areaServed: {
                      "@type": "Country",
                      name: "India"
                    }
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "Service",
                    name: "UI/UX Design",
                    description: "Award-worthy interfaces that delight users and convert visitors into loyal customers.",
                    provider: {
                      "@type": "Organization",
                      name: "Webix Infotech",
                      url: "https://webixinfotech.com"
                    },
                    areaServed: {
                      "@type": "Country",
                      name: "India"
                    }
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "Service",
                    name: "Custom Software",
                    description: "Custom software solutions designed to improve efficiency, scalability",
                    provider: {
                      "@type": "Organization",
                      name: "Webix Infotech",
                      url: "https://webixinfotech.com"
                    },
                    areaServed: {
                      "@type": "Country",
                      name: "India"
                    }
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: [
                      {
                        "@type": "Question",
                        name: "What services does WebInfix offer?",
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: "We offer comprehensive web development services including custom web applications, e-commerce platforms, UI/UX design, mobile app development, and performance optimization. Our team specializes in modern technologies like React, Next.js, Node.js, and more."
                        }
                      },
                      {
                        "@type": "Question",
                        name: "How long does it take to complete a project?",
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: "Project timelines vary based on complexity. A simple website typically takes 2-4 weeks, while complex web applications may take 2-3 months. During our initial consultation, we provide a detailed timeline based on your specific requirements."
                        }
                      },
                      {
                        "@type": "Question",
                        name: "What is your pricing structure?",
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: "We offer flexible pricing models including fixed-price projects and hourly rates. After understanding your requirements, we provide a transparent quote with no hidden costs. We also offer maintenance packages for ongoing support."
                        }
                      },
                      {
                        "@type": "Question",
                        name: "Do you provide ongoing support and maintenance?",
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: "Yes, we offer comprehensive maintenance packages that include bug fixes, security updates, performance monitoring, and feature enhancements. We ensure your application stays secure and performs optimally."
                        }
                      },
                      {
                        "@type": "Question",
                        name: "Can you help with existing website redesigns?",
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: "Absolutely! We specialize in website redesigns and modernizations. We analyze your current site, identify areas for improvement, and transform it into a modern, high-performing platform that meets current standards."
                        }
                      },
                      {
                        "@type": "Question",
                        name: "What technologies do you work with?",
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: "We work with a wide range of modern technologies including React, Next.js, Vue.js, Node.js, Python, TypeScript, Tailwind CSS, MongoDB, PostgreSQL, and more. We choose the best tech stack based on your project requirements."
                        }
                      }
                    ]
                  }
                ]}
              />
              <Navbar />
              <HeroSection />
              <Suspense fallback={<div className="min-h-[400px]" />}>
                <PlateformSection />
              </Suspense>
              <Suspense fallback={<div className="min-h-[400px]" />}>
                <ServicesSection />
              </Suspense>
              <Suspense fallback={<div className="min-h-[400px]" />}>
                <ProjectEcosystem />
              </Suspense>
              <Suspense fallback={<div className="min-h-[400px]" />}>
                <FAQSection />
              </Suspense>
              <FooterSection />
              <ConsentBanner />
            </>
          } />
          <Route path="/privacy-policy" element={
            <>
              <SEO 
                title="Privacy Policy"
                description="Read our privacy policy to understand how Webix Infotech collects, uses, and protects your personal information. Learn about your rights and our data practices."
                keywords="Privacy Policy, Data Protection, Personal Information, Webix Infotech, GDPR Compliance"
                canonical="https://webixinfotech.com/privacy-policy"
              />
              <Privacy />
              <FooterSection />
            </>
          } />
          <Route path="/cookie-policy" element={
            <>
              <SEO 
                title="Cookie Policy"
                description="Learn about Webix Infotech's cookie policy and how we use cookies to enhance your browsing experience. Understand your cookie preferences and settings."
                keywords="Cookie Policy, Cookies, Browser Cookies, Tracking, Webix Infotech, Cookie Consent"
                canonical="https://webixinfotech.com/cookie-policy"
              />
              <Cookies />
              <FooterSection />
            </>
          } />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;