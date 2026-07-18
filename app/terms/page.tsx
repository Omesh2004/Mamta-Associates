"use client";

import { motion } from "framer-motion";

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 p-8 sm:p-12 shadow-xl shadow-emerald-900/5 dark:shadow-none backdrop-blur-xl">
            <div className="prose prose-slate dark:prose-invert prose-emerald max-w-none prose-headings:font-bold prose-a:text-emerald-600 dark:prose-a:text-emerald-400 hover:prose-a:text-emerald-500">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-8 border-b border-slate-100 dark:border-white/10 pb-4">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>
              
              <p className="lead text-lg text-slate-600 dark:text-slate-300">
                Welcome to Mamta Associates. By accessing or using our website and product catalog, you agree to comply with and be bound by the following terms and conditions of use.
              </p>

              <h3>1. Use of Website Content</h3>
              <p>
                The content of the pages of this website, including but not limited to product catalogs, images, text, and technical specifications, is for your general information and business use only. It is subject to change without notice.
              </p>

              <h3>2. Intellectual Property</h3>
              <p>
                This website contains material which is owned by or licensed to Mamta Associates. This material includes, but is not limited to, the design, layout, look, appearance, graphics, and product formulations. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
              </p>
              <p>
                Any automated scraping, data mining, or unauthorized extraction of product data from this catalog for commercial competitor use is strictly prohibited.
              </p>

              <h3>3. Quotations and B2B Transactions</h3>
              <p>
                The submission of a quotation request via our website does not constitute a legally binding contract of sale. All product orders, pricing agreements, and supply contracts will be finalized offline through formal business correspondence.
              </p>

              <h3>4. Limitation of Liability</h3>
              <p>
                Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through this website meet your specific compliance and operational requirements.
              </p>

              <h3>5. Governing Law</h3>
              <p>
                Your use of this website and any dispute arising out of such use of the website is subject to the local laws of India.
              </p>

              <div className="mt-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 p-6 border border-emerald-100 dark:border-emerald-500/20">
                <h3 className="!mt-0 text-emerald-900 dark:text-emerald-100">Contact Us</h3>
                <p className="!mb-0 text-emerald-800 dark:text-emerald-200">
                  For any inquiries regarding these terms, please contact us at:
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
