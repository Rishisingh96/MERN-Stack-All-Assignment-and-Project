import React, { useState } from 'react';
import { sendEmail } from './sendEmail';
import AnimatedBg from '../component/common/Animatedbg1';

const FAQForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    industry: '',
    budget: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    
    if (!formData.industry) {
      newErrors.industry = 'Please select an industry';
    }
    
    if (!formData.budget) {
      newErrors.budget = 'Please select a budget range';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      sendEmail(e)
        .then(() => {
          setSubmitSuccess(true);
          setFormData({ name: '', email: '', phone: '', service: '', industry: '', budget: '', message: '' });
          setErrors({});
          setTimeout(() => setSubmitSuccess(false), 5000);
        })
        .catch((error) => {
          console.error('Email send error:', error);
          alert('Failed to send message. Please try again.');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div id="contact" className="relative min-h-screen py-20">
      <AnimatedBg baseColor="#f5f8ff" intensity="medium" speed="normal" />
      <div className="relative z-10 max-w-2xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-blue-100">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Get In Touch</h3>
        <p className="text-gray-600">Fill out the form below and we'll get back to you shortly</p>
      </div>
      
      {submitSuccess && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl mb-8 text-center shadow-sm">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">Thank you for your response!</span>
          </div>
          <p className="text-sm mt-1 text-green-700">We will get back to you soon.</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-white/50 hover:bg-white/80"
              placeholder="Rishi Singh"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-white/50 hover:bg-white/80"
              placeholder="rishi@gmail.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-400 focus:ring-red-500/50 focus:border-red-500' : 'border-gray-200 focus:ring-blue-500/50 focus:border-blue-500'} transition-all bg-white/50 hover:bg-white/80`}
            placeholder="98765 43210"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {errors.phone}
          </p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
              Service Required
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-xl border ${errors.service ? 'border-red-400 focus:ring-red-500/50 focus:border-red-500' : 'border-gray-200 focus:ring-blue-500/50 focus:border-blue-500'} transition-all bg-white/50 hover:bg-white/80 appearance-none cursor-pointer`}
            >
              <option value="">Select a service</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Apps">Mobile Apps</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="ERP & HRMS">ERP & HRMS</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Custom Software">Custom Software</option>
            </select>
            {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-semibold text-gray-700 mb-2">
              Industry
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-xl border ${errors.industry ? 'border-red-400 focus:ring-red-500/50 focus:border-red-500' : 'border-gray-200 focus:ring-blue-500/50 focus:border-blue-500'} transition-all bg-white/50 hover:bg-white/80 appearance-none cursor-pointer`}
            >
              <option value="">Select industry</option>
              <option value="MVP">MVP</option>
              <option value="Startups">Startups</option>
              <option value="Healthcare">Healthcare</option>
              <option value="EdTech">EdTech</option>
              <option value="FinTech">FinTech</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Automobiles">Automobiles</option>
              <option value="Employee Management Tool">Employee Management Tool</option>
              <option value="CRM">CRM</option>
              <option value="B2B Portals">B2B Portals</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Food & Restaurants">Food & Restaurants</option>
              <option value="Other">Other</option>
            </select>
            {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-xl border ${errors.budget ? 'border-red-400 focus:ring-red-500/50 focus:border-red-500' : 'border-gray-200 focus:ring-blue-500/50 focus:border-blue-500'} transition-all bg-white/50 hover:bg-white/80 appearance-none cursor-pointer`}
          >
            <option value="">Select budget range</option>
            <option value="1,000 - 5,000">1,000 - 5,000</option>
            <option value="5,000 - 10,000">5,000 - 10,000</option>
            <option value="10,000 - 25,000">10,000 - 25,000</option>
            <option value="25,000 - 50,000">25,000 - 50,000</option>
            <option value="50,000+">50,000+</option>
          </select>
          {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-white/50 hover:bg-white/80 resize-none"
            placeholder="Tell us about your project..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
            isSubmitting 
              ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Send Message
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          )}
        </button>
      </form>
      </div>
    </div>
  );
};

export default FAQForm;