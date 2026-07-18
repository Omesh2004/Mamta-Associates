"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 p-8 sm:p-12 shadow-xl shadow-emerald-900/5 dark:shadow-none backdrop-blur-xl">
            <div className="prose prose-slate dark:prose-invert prose-emerald max-w-none prose-headings:font-bold prose-a:text-emerald-600 dark:prose-a:text-emerald-400 hover:prose-a:text-emerald-500">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-8 border-b border-slate-100 dark:border-white/10 pb-4">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>
              
              <p className="lead text-lg text-slate-600 dark:text-slate-300">
                Mamta Associates (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>

              <h3>1. Information We Collect</h3>
              <p>
                We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products, or when you contact us via our quotation and contact forms. This may include:
              </p>
              <ul>
                <li>Name and Job Title</li>
                <li>Company Name</li>
                <li>Contact Information including email address and phone number</li>
                <li>Any other information you provide in your inquiries</li>
              </ul>

              <h3>2. How We Use Your Information</h3>
              <p>
                We use the information we collect primarily to provide, maintain, and improve our services and business relationships. Specifically, we may use your information to:
              </p>
              <ul>
                <li>Respond to your quotation requests and inquiries.</li>
                <li>Send you technical data sheets, product updates, or administrative information.</li>
                <li>Improve our website functionality and user experience.</li>
                <li>Maintain internal records for B2B relationship management.</li>
              </ul>

              <h3>3. Data Sharing and Disclosure</h3>
              <p>
                We do not sell, trade, or rent your personal identification information to third parties. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners or trusted affiliates.
              </p>

              <h3>4. Data Security</h3>
              <p>
                We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards, no internet transmission can be guaranteed to be 100% secure.
              </p>

              <div className="mt-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 p-6 border border-emerald-100 dark:border-emerald-500/20">
                <h3 className="!mt-0 text-emerald-900 dark:text-emerald-100">Contact Us</h3>
                <p className="!mb-0 text-emerald-800 dark:text-emerald-200">
                  If you have questions or comments about this Privacy Policy, please contact us at:
                  <br />
                  <strong>Email:</strong> <a href="mailto:anubhavmisra74@gmail.com" className="font-semibold">anubhavmisra74@gmail.com</a>
                  <br />
                  <strong>Phone:</strong> <span className="font-semibold">+91 98311 92035</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
