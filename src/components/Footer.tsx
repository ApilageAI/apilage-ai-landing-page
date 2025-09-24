import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-10 grid gap-8 md:grid-cols-4 text-sm text-gray-700">
        <div className="space-y-2">
          <h3 className="text-gray-900 font-semibold">Apilage AI</h3>
          <p>ශ්‍රී ලාංකික සන්දර්භයන් සහ භාෂා සඳහා විශේෂයෙන් නිර්මාණය කළ AI.</p>
        </div>
        <div>
          <h4 className="text-gray-900 font-medium mb-2">Company</h4>
          <ul className="space-y-1">
            <li><Link href="#about" className="hover:text-gray-900">About</Link></li>
            <li><Link href="#features" className="hover:text-gray-900">Features</Link></li>
            <li><Link href="#pricing" className="hover:text-gray-900">Pricing</Link></li>
            <li><Link href="#blog" className="hover:text-gray-900">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gray-900 font-medium mb-2">Support</h4>
          <ul className="space-y-1">
            <li><Link href="#contact" className="hover:text-gray-900">Contact</Link></li>
            <li><Link href="#privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
            <li><Link href="#terms" className="hover:text-gray-900">Terms of Service</Link></li>
            <li><Link href="#refund" className="hover:text-gray-900">Refund Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gray-900 font-medium mb-2">Contact</h4>
          <ul className="space-y-1">
            <li>contact@apilageai.lk</li>
            <li>+94 70 184 0527</li>
            <li>151, Suwasewa Mawatha, Kalutara South, Sri Lanka</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 py-4">
        © 2025 apilageai.lk. All rights reserved.
      </div>
    </footer>
  );
}


