"use client";

import { motion } from "framer-motion";

export default function DisclaimerPage() {
  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 px-5 sm:px-8 transition-colors duration-500 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-1/4 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/2 rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/3 rounded-full bg-teal-600/10 blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-300">
            Legal
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-10">
            Disclaimer
          </h1>
          
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 p-8 sm:p-12 shadow-xl shadow-emerald-900/5 dark:shadow-none backdrop-blur-xl">
            <div className="prose prose-slate dark:prose-invert prose-emerald max-w-none prose-headings:font-bold prose-a:text-emerald-600 dark:prose-a:text-emerald-400 hover:prose-a:text-emerald-500">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-8 border-b border-slate-100 dark:border-white/10 pb-4">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>
              
              <h3>1. Informational Purposes Only</h3>
              <p>
                The information contained in this website and our digital catalog is for general informational purposes only. The information is provided by Mamta Associates and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. 
              </p>

              <h3>2. Product Specifications</h3>
              <p>
                Product formulations, certifications, packaging, and eco-scores listed on this website may be subject to minor variations or updates in the manufacturing process. Final specifications, pricing, and compliance documentation should be verified directly with our sales or technical team during the formal quotation process. The online catalog is not a binding technical document.
              </p>

              <h3>3. Technical Data Sheets (TDS) and MSDS</h3>
              <p>
                Users of our chemical products must refer to the official, offline Material Safety Data Sheets (MSDS) and Technical Data Sheets (TDS) provided at the time of purchase for complete safety, handling, and dilution instructions. Mamta Associates assumes no liability for the misuse of products based solely on the summarized marketing information available on this website.
              </p>

              <h3>4. External Links</h3>
              <p>
                Through this website, you may be able to link to other websites which are not under the control of Mamta Associates. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
              </p>

              <div className="mt-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 p-6 border border-emerald-100 dark:border-emerald-500/20">
                <h3 className="!mt-0 text-emerald-900 dark:text-emerald-100">Contact Us</h3>
                <p className="!mb-0 text-emerald-800 dark:text-emerald-200">
                  To request official compliance documentation or technical specifications, please contact us at:
                  <br />
                  <strong>Email:</strong> <a href="mailto:anubhavmisra74@gmail.com" className="font-semibold">anubhavmisra74@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
