import React, { useState, useEffect, useRef } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import AnimatedBg from '../component/common/Animatedbg1';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    question: "What services does WebInfix offer?",
    answer: "We offer comprehensive web development services including custom web applications, e-commerce platforms, UI/UX design, mobile app development, and performance optimization. Our team specializes in modern technologies like React, Next.js, Node.js, and more."
  },
  {
    question: "How long does it take to complete a project?",
    answer: "Project timelines vary based on complexity. A simple website typically takes 2-4 weeks, while complex web applications may take 2-3 months. During our initial consultation, we provide a detailed timeline based on your specific requirements."
  },
  {
    question: "What is your pricing structure?",
    answer: "We offer flexible pricing models including fixed-price projects and hourly rates. After understanding your requirements, we provide a transparent quote with no hidden costs. We also offer maintenance packages for ongoing support."
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes, we offer comprehensive maintenance packages that include bug fixes, security updates, performance monitoring, and feature enhancements. We ensure your application stays secure and performs optimally."
  },
  {
    question: "Can you help with existing website redesigns?",
    answer: "Absolutely! We specialize in website redesigns and modernizations. We analyze your current site, identify areas for improvement, and transform it into a modern, high-performing platform that meets current standards."
  },
  {
    question: "What technologies do you work with?",
    answer: "We work with a wide range of modern technologies including React, Next.js, Vue.js, Node.js, Python, TypeScript, Tailwind CSS, MongoDB, PostgreSQL, and more. We choose the best tech stack based on your project requirements."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const faqRefs = useRef([]);
  const contentRefs = useRef([]);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    faqRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const isEven = index % 2 === 0;
      gsap.fromTo(
        ref,
        {
          opacity: 0,
          x: isEven ? -100 : 100,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: "back.out(1.4)",
          delay: 0.1 + (index * 0.10),
          scrollTrigger: {
            trigger: ref,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden" id="faq">
      <AnimatedBg baseColor="#F8FAFC" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#3B82F6] text-[#2563EB] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <div className="w-2 h-2 bg-[#3B82F6] rounded-full animate-pulse" />
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            Frequently Asked <span className="text-[#2563EB]">Questions</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our services, process, and pricing.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              ref={(el) => (faqRefs.current[index] = el)}
              className={`
group
overflow-hidden
rounded-2xl
border
bg-white/80
backdrop-blur-xl
shadow-lg
transition-all
duration-500
${openIndex === index
                  ? 'border-blue-400 shadow-[0_20px_60px_rgba(37,99,235,0.2)] ring-2 ring-blue-100'
                  : 'border-blue-100/50 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)] hover:border-blue-200'
                }
`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full px-6 py-5 text-left flex items-center justify-between transition-all duration-300 ${openIndex === index ? 'bg-blue-50/50' : 'hover:bg-white/50'
                  }`}
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <FiChevronUp className="text-[#2563EB]" size={20} />
                  ) : (
                    <FiChevronDown className="text-gray-400" size={20} />
                  )}
                </div>
              </button>

              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className={`overflow-hidden transition-all duration-500 ease-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="px-6 pb-5 pt-2">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 relative z-10">
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <a
            href="#contact"
            className="inline-block bg-gray-900 hover:bg-black text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
