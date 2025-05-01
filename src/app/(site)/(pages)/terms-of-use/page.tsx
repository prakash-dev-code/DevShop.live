import Head from 'next/head';
import Breadcrumb from '@/components/Common/Breadcrumb';

export default function TermsOfUse() {
  return (
    <>
      <Breadcrumb title={'Terms of Use'} pages={['Terms of Use']} />
      <div className="min-h-screen bg-gray border-b border-t border-gray-3">
        <Head>
          <title>Terms of Use - Dev Shop</title>
          <meta name="description" content="Terms of Use for Dev Shop" />
        </Head>

        <main className="container mx-auto bg-white px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-6">Terms of Use</h1>
            <p className="text-gray-600 mb-6">Effective Date: 25-May-2025</p>

            <div className="space-y-8 text-gray-600 leading-relaxed">
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">
                  Acceptance of Terms
                </h2>
                <p>
                  By accessing or using the Dev Shop website, you agree to be bound by these Terms
                  of Use. If you disagree with any part of these terms, you may not access our
                  services.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">
                  User Responsibilities
                </h2>
                <ul className="list-disc pl-6 space-y-4">
                  <li>Provide accurate and current information</li>
                  <li>Maintain confidentiality of your account credentials</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Not engage in any fraudulent or harmful activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">
                  Intellectual Property
                </h2>
                <p>
                  All content on this website, including text, graphics, logos, and images, is the
                  property of Dev Shop or its licensors and protected by copyright laws.
                  Unauthorized use of any materials may violate intellectual property rights.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">
                  Purchases & Payments
                </h2>
                <ul className="list-disc pl-6 space-y-4">
                  <li>All prices are in USD unless otherwise stated</li>
                  <li>We reserve the right to refuse or cancel any order</li>
                  <li>Payment must be completed before order processing</li>
                  <li>Sales tax will be calculated during checkout</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">Termination</h2>
                <p>
                  We may terminate or suspend access to our services immediately, without prior
                  notice, for any breach of these terms. Upon termination, your right to use the
                  service will cease immediately.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">Disclaimer</h2>
                <p>
                  Our services are provided "as is" without warranties of any kind. Dev Shop does
                  not guarantee uninterrupted or error-free service, or the accuracy of product
                  descriptions.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">Governing Law</h2>
                <p>
                  These terms shall be governed by the laws of [Your Country/State] without regard
                  to its conflict of law provisions. Any disputes shall be resolved in the courts of
                  [Your Country/State].
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">
                  Changes to Terms
                </h2>
                <p>
                  We reserve the right to modify these terms at any time. Continued use after
                  changes constitutes acceptance of the revised terms. We will notify users of
                  significant changes via email or website notice.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">
                  Contact Information
                </h2>
                <p className="bg-gray-50 p-4 rounded-lg">
                  For questions about these Terms of Use:
                  <br />
                  <a href="mailto:legal@devshop.com" className="text-blue-600 hover:underline">
                    legal@devshop.com
                  </a>
                  <br />
                  Mailing Address: 123 Commerce Street, Tech City, TC 12345
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
