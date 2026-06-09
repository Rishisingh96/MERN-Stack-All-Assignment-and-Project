import React from "react";
import { 
  Cookie, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  Settings, 
  RefreshCw, 
  Mail 
} from "lucide-react";

const Cookies = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-8 pb-16">
      {/* Full Width Wrapper matching Privacy Page */}
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-6">
            <Cookie className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-600 text-base">
            <p className="flex items-center gap-1.5">
              <strong>Company:</strong> Webix Infotech India Pvt. Ltd.
            </p>
            <span className="hidden sm:inline text-gray-300">|</span>
            <p className="flex items-center gap-1.5">
              <strong>Effective Date:</strong> January 2026
            </p>
          </div>
        </div>

        {/* Content Box - Full Width Design */}
        <div className="w-full bg-white rounded-3xl shadow-xl p-8 sm:p-12 lg:p-16 space-y-10">
          
          {/* Main Top Paragraph */}
          <p className="text-gray-700 leading-relaxed text-lg border-b border-gray-100 pb-6">
            This Cookie Policy outlines our compliance frameworks regarding how Webix Infotech India Pvt. Ltd. uses 
            cookies and similar state-tracking technologies on our official platform (webixinfotech.com). As a technical 
            entity providing corporate software frameworks, data processing speed, operational security, and UI precision 
            are deeply reliant on temporary browser elements. Please read this framework to understand your digital configuration options.
          </p>

          {/* 1. What Are Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Info className="w-6 h-6 text-amber-600" />
              1. What Are Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies are small data fragments or alphabetic text configurations deployed to your physical storage terminal 
              or computer system when interacting with internet applications. They function as infrastructural memory markers, 
              allowing our host architectures to recognize your specific hardware terminal configuration, establish secure 
              handshakes, preserve navigation choices, and drastically compress page load frequencies.
            </p>
          </section>

          {/* 2. Types of Cookies We Use */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-amber-600" />
              2. Categorization of System Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We divide state-trackers into distinct clear groups depending entirely on their technical role inside our core application environments:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50/60 rounded-2xl p-6 border border-green-100">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-2. h-2 bg-green-600 rounded-full"></span>
                  Essential & Core System Cookies
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  These core identifiers are structurally mandatory for standard portal deployment. They establish structural pathways, validate active user handshakes, initialize basic routing mechanics, and enforce server protection shields. Without these tokens, web operations degrade instantly.
                </p>
              </div>

              <div className="bg-blue-50/60 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Analytical & Telemetry Metrics
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  These modules gather depersonalized navigational data, measuring platform density, module exit rates, block visibility times, and loading latencies. This gives our engineers the clarity needed to scale server resources and polish overall system response metrics.
                </p>
              </div>

              <div className="bg-purple-50/60 rounded-2xl p-6 border border-purple-100">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  Functional State Trackers
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Functional strings preserve personal selections configured during interface interaction—including fluid language choices, UI color preferences, regional settings, and specific technical parameters submitted during form processing workflows.
                </p>
              </div>

              <div className="bg-orange-50/60 rounded-2xl p-6 border border-orange-100">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                  Corporate Engagement Tokens
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  These records verify corporate user footprints across promotional workflows, digital transformation campaigns, and outreach channels. They monitor target conversions, helping us evaluate corporate technical campaign effectiveness accurately.
                </p>
              </div>
            </div>
          </section>

          {/* 3. How We Use Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600" />
              3. Architectural Objectives
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Webix Infotech uses tracking markers exclusively for specialized structural parameters:
            </p>
            <ul className="space-y-3 text-gray-700 list-disc list-inside pl-2">
              <li>Securing structural form transmissions against cross-site request forgery attacks.</li>
              <li>Caching complex image arrays and front-end scripts to lower user cellular data billing rates.</li>
              <li>Evaluating technical interface pathways to prune redundant navigational loops.</li>
              <li>Preserving token authentication states across continuous multi-page service requests.</li>
              <li>Documenting system resource failures and interface bug events for rapid patch engineering.</li>
            </ul>
          </section>

          {/* 4. Third-Party Integration Frameworks */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-600" />
              4. Third-Party Integration Frameworks
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To drive analytics and handle enterprise solutions, our systems communicate with trusted third-party cloud engines. 
              These networks drop persistent variables inside your browser to handle distinct background requests:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-50 border border-gray-100 rounded-xl p-4">
                <p className="font-semibold text-gray-900 text-base">Google Analytics</p>
                <p className="text-sm text-gray-600 mt-1">Operational system latency & traffic mapping</p>
              </div>
              <div className="bg-slate-50 border border-gray-100 rounded-xl p-4">
                <p className="font-semibold text-gray-900 text-base">Google Tag Manager</p>
                <p className="text-sm text-gray-600 mt-1">Dynamic script lifecycle execution</p>
              </div>
              <div className="bg-slate-50 border border-gray-100 rounded-xl p-4">
                <p className="font-semibold text-gray-900 text-base">Cloudflare Infrastructure</p>
                <p className="text-sm text-gray-600 mt-1">Edge security protocols and DDoS filtration</p>
              </div>
              <div className="bg-slate-50 border border-gray-100 rounded-xl p-4">
                <p className="font-semibold text-gray-900 text-base">Meta Enterprise Engine</p>
                <p className="text-sm text-gray-600 mt-1">B2B technical outreach evaluation</p>
              </div>
            </div>
          </section>

          {/* 5. Managing Your Cookie Preferences */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <XCircle className="w-6 h-6 text-amber-600" />
              5. Managing Your Cookie Preferences
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You possess granular command channels over tracking token lifetimes across all modern network hardware devices:
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start bg-amber-50/30 rounded-xl p-4 border border-amber-100/50">
                <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-amber-700">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Native Browser Filtration</h4>
                  <p className="text-sm text-gray-600 mt-0.5">Your viewing application contains advanced settings to drop, purge, or systematically ban cookies. Review your browser's Help menu to target specific cache configurations.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-amber-50/30 rounded-xl p-4 border border-amber-100/50">
                <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-amber-700">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Dynamic UI Banner Options</h4>
                  <p className="text-sm text-gray-600 mt-0.5">Our landing layers provide immediate modal triggers to block non-essential analytics tracking with a single interface interaction.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-amber-50/30 rounded-xl p-4 border border-amber-100/50">
                <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-amber-700">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Global Opt-Out Resource Tools</h4>
                  <p className="text-sm text-gray-600 mt-0.5">Utilize corporate clearing portals like the NAI (Network Advertising Initiative) to strip tracking identifiers across multiple server configurations simultaneously.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Cookie Duration Lifecycles */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Clock className="w-6 h-6 text-amber-600" />
              6. Cookie Duration Lifecycles
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong className="text-gray-900">Volatile Session Elements:</strong> These are temporary string variables structured to self-destruct the absolute second you close your browser application terminal or terminate your system interaction.
              </p>
              <p>
                <strong className="text-gray-900">Persistent Storage Tokens:</strong> These records are safely archived in your browser storage layer for extended tracking windows (ranging typically between 1 to 2 calendar years) or until you execute a manual cache wipe.
              </p>
            </div>
          </section>

          {/* 7. Revisions to the Tracking Architecture */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <RefreshCw className="w-6 h-6 text-amber-600" />
              7. Revisions to the Tracking Architecture
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Webix Infotech retains structural authority to refresh, drop, or update this Cookie Policy overview as backend engineering parameters adapt. Any systematic overhaul will be declared instantly by updating the revised date marker on this component. Continued interaction with our technical ecosystem represents confirmation of these parameters.
            </p>
          </section>

          {/* 8. Contact & Configuration Support */}
          <section className="bg-amber-50/70 border border-amber-100 rounded-3xl p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Mail className="w-6 h-6 text-amber-600" />
              8. Contact & Configuration Support
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you require comprehensive engineering breakdowns regarding our browser token tracking methods, or need assistance modifying your storage state data, please establish contact with our data desk:
            </p>
            
            {/* Contact Details Grid matching Privacy Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong className="text-gray-900 text-sm block uppercase tracking-wider text-amber-600">Company</strong> 
                  Webix Infotech India Pvt. Ltd.
                </p>
                <p>
                  <strong className="text-gray-900 text-sm block uppercase tracking-wider text-amber-600">Email</strong> 
                  <a href="mailto:officialwebixinfotech@gmail.com" className="text-amber-600 hover:underline">
                    officialwebixinfotech@gmail.com
                  </a>
                </p>
                <p>
                  <strong className="text-gray-900 text-sm block uppercase tracking-wider text-amber-600">Phone</strong> 
                  +91 9926820304
                </p>
              </div>
              <div className="text-gray-700">
                <p>
                  <strong className="text-gray-900 text-sm block uppercase tracking-wider text-amber-600">Corporate Address</strong> 
                  Aditya Gateway, MR 10 Road, Vijay Nagar, Indore - 452010, Madhya Pradesh, India
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Continuing to access our technical layout establishes compliance with all system tracking architectures documented here. 
            All Rights Reserved © 2026.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Cookies;