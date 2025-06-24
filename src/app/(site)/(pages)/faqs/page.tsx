import Head from 'next/head';
import Breadcrumb from '@/components/Common/Breadcrumb';

export default function FAQs() {
  return (
    <>
      <Breadcrumb title={'FAQs'} pages={['FAQs']} />
      <div className="min-h-screen bg-gray border-b border-t border-gray-3">
        <Head>
          <title>FAQs - Dev Shop</title>
          <meta name="description" content="Frequently Asked Questions - Dev Shop" />
        </Head>

        <main className="container mx-auto bg-white px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-6">
              Frequently Asked Questions
            </h1>

            <div className="space-y-8 text-gray-600 leading-relaxed">
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">
                  Ordering & Payments
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg md:text-xl font-medium text-dark mb-2">
                      How do I place an order?
                    </h3>
                    <p>
                      Select your items, proceed to checkout, enter your shipping details, and
                      complete payment. You&apos;ll receive an order confirmation email once
                      successful.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-medium text-dark mb-2">
                      What payment methods do you accept?
                    </h3>
                    <p>
                      We accept all major credit cards (Visa, Mastercard, American Express), PayPal,
                      and Apple Pay. All transactions are securely processed.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">
                  Shipping & Delivery
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg md:text-xl font-medium text-dark mb-2">
                      How long does shipping take?
                    </h3>
                    <p>
                      Standard shipping: 3-5 business days
                      <br />
                      Express shipping: 1-2 business days
                      <br />
                      International: 7-14 business days
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-medium text-dark mb-2">
                      Do you offer international shipping?
                    </h3>
                    <p>
                      Yes, we ship worldwide. Customs fees may apply depending on your
                      country&apos;s regulations.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">
                  Returns & Exchanges
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg md:text-xl font-medium text-dark mb-2">
                      What&apos;s your return policy?
                    </h3>
                    <p>
                      You may return unworn, undamaged items within 30 days of delivery. Please
                      review our full{' '}
                      <a href="/refund-policy" className="text-blue-600 hover:underline">
                        Refund Policy
                      </a>{' '}
                      for details.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-medium text-dark mb-2">
                      How do I initiate a return?
                    </h3>
                    <p>
                      Contact our support team with your order number. We&apos;ll provide a return
                      label and instructions. Returns typically process within 5 business days of
                      receipt.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">
                  Product Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg md:text-xl font-medium text-dark mb-2">
                      Are your products authentic?
                    </h3>
                    <p>
                      We guarantee 100% authenticity for all products. All items are sourced
                      directly from manufacturers or authorized distributors.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-medium text-dark mb-2">
                      Do you offer technical support?
                    </h3>
                    <p>
                      Yes, we provide free technical support for all products. Contact our support
                      team via email or live chat during business hours.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">
                  Contact & Support
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">Customer support hours: Mon-Fri 9AM-6PM (IST)</p>
                  <p>
                    Email:{' '}
                    <a href="mailto:support@devshop.com" className="text-blue-600 hover:underline">
                      support@devshop.com
                    </a>
                    <br />
                    Phone: +91 999 999 9999
                    <br />
                    Live Chat: Available during business hours
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
