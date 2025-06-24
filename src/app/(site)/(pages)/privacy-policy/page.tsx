import Head from 'next/head';
import Breadcrumb from '@/components/Common/Breadcrumb';

export default function PrivacyPolicy() {
  return (
    <>
      <Breadcrumb title={'Privay Policy'} pages={['Privay Policy']} />
      <div className="min-h-screen bg-gray border-b border-t border-gray-3">
        <Head>
          <title>Privacy Policy - Dev Shop</title>
          <meta name="description" content="Privacy Policy for [Your Store Name]" />
        </Head>

        <main className="container  mx-auto bg-white px-4 py-8 md:py-12 ">
          <div className="max-w-4xl mx-auto    ">
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-6">Privacy Policy</h1>
            <p className="text-gray-600 mb-6">Last updated: 25-May-2025</p>

            <div className="space-y-8 text-gray-600 leading-relaxed">
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">Introduction</h2>
                <p>
                  Welcome to Dev Shop! This Privacy Policy explains how we collect, use, disclose,
                  and safeguard your information when you visit our e-commerce platform. Please read
                  this policy carefully. If you do not agree with the terms, please do not access
                  the site.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">
                  Information We Collect
                </h2>
                <ul className="list-disc pl-6 space-y-4">
                  <li>
                    <span className="font-medium">Personal Information:</span> Name, email address,
                    shipping address, phone number, and payment information when you make a
                    purchase.
                  </li>
                  <li>
                    <span className="font-medium">Usage Data:</span> Information about how you
                    interact with our website, including IP address, browser type, pages visited,
                    and device information.
                  </li>
                  <li>
                    <span className="font-medium">Cookies:</span> We use cookies to enhance your
                    experience and analyze site traffic. You can control cookies through your
                    browser settings.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">
                  How We Use Your Information
                </h2>
                <ul className="list-disc pl-6 space-y-4">
                  <li>Process transactions and deliver products</li>
                  <li>Improve our website and customer service</li>
                  <li>Send promotional emails (you can unsubscribe anytime)</li>
                  <li>Prevent fraudulent activities</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">Data Security</h2>
                <p>
                  We implement industry-standard security measures including SSL encryption, secure
                  payment gateways, and regular system monitoring. However, no electronic
                  transmission is completely secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">
                  Third-Party Services
                </h2>
                <p>
                  We may share information with trusted third parties including payment processors,
                  shipping carriers, and analytics providers. These parties are obligated to
                  maintain the confidentiality of your information.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">Your Rights</h2>
                <ul className="list-disc pl-6 space-y-4">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent for data processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">Contact Us</h2>
                <p className="bg-gray-50 p-4 rounded-lg">
                  For questions about this policy or your personal data, contact us at:
                  <br />
                  <a href="mailto:privacy@yourstore.com" className="text-blue-600 hover:underline">
                    devShop@mystore.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
