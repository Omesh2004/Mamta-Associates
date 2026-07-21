import Link from "next/link";
import { Phone, Mail, Factory, Leaf } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/80 py-12 px-5 sm:px-8 transition-colors duration-500 backdrop-blur-md">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-4">
          
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest dark:bg-white/10 text-white shadow-sm">
                <Leaf className="h-6 w-6 text-white dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-base font-bold text-slate-900 dark:text-white tracking-tight">MAMTA ASSOCIATES</p>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Green Cleaning Technology</p>
              </div>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-sm">
              Engineering uncompromising performance with globally certified safety standards for industrial and commercial facilities.
            </p>

            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                <span>+91 98311 92035</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                <a href="mailto:anubhavmisra74@gmail.com" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  anubhavmisra74@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Factory className="h-4 w-4 text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p>Registered Office:</p>
                  <p className="text-slate-500 dark:text-slate-500">Shop no 4, 7 Khudiram Bose Sarani,<br />Opposite Royal Government of Bhutan Consulate,<br />Kolkata 700080</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-6">Navigation</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-600 dark:text-slate-400">
              <li><Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Corporate Profile</Link></li>
              <li><Link href="/catalog" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Product Catalog</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-6">Legal & Compliance</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-600 dark:text-slate-400">
              <li><Link href="/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Disclaimer</Link></li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <strong>GST:</strong> 19AFVPM5018E1Z5
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500 dark:text-slate-500">
          <p>© {currentYear} Mamta Associates. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Powered by <span className="text-emerald-600 dark:text-emerald-500 font-bold">Haylide Green Cleaning Technology</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
