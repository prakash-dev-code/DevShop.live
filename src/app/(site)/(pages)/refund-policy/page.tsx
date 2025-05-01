import Head from 'next/head';
import Breadcrumb from '@/components/Common/Breadcrumb';

export default function RefundPolicy() {
  return (
    <>
      <Breadcrumb title={'Refund Policy'} pages={['Refund Policy']} />
      <div className="min-h-screen bg-gray border-b border-t border-gray-3">
        <Head>
          <title>Refund Policy - Dev Shop</title>
          <meta name="description" content="Refund Policy for Dev Shop" />
        </Head>

        <main className="container mx-auto bg-white px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-6">Refund Policy</h1>
            <p className="text-gray-600 mb-6">Last updated: 25-May-2025</p>

            <div className="space-y-8 text-gray-600 leading-relaxed">
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">Overview</h2>
                <p>
                  At Dev Shop, we strive to ensure complete customer satisfaction with our products.
                  Please read this policy carefully to understand our procedures regarding returns
                  and refunds.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">
                  Eligibility for Refunds
                </h2>
                <ul className="list-disc pl-6 space-y-4">
                  <li>Products must be returned within 30 days of purchase</li>
                  <li>Items must be in original packaging with all tags attached</li>
                  <li>Proof of purchase is required for all refund requests</li>
                  <li>Digital products may have different refund conditions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">
                  Non-Refundable Items
                </h2>
                <ul className="list-disc pl-6 space-y-4">
                  <li>Downloadable software products</li>
                  <li>Gift cards</li>
                  <li>Personalized or custom-made products</li>
                  <li>Products damaged by improper use</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">Refund Process</h2>
                <ol className="list-decimal pl-6 space-y-4">
                  <li>Contact our support team to initiate a return</li>
                  <li>Package the item securely with original accessories</li>
                  <li>Ship the item using a trackable method</li>
                  <li>Allow 5-7 business days for processing after receipt</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">Refund Methods</h2>
                <p>
                  Refunds will be issued to the original payment method. Processing times may vary
                  depending on your financial institution:
                </p>
                <ul className="list-disc pl-6 space-y-4 mt-4">
                  <li>Credit/Debit Cards: 5-10 business days</li>
                  <li>PayPal: 3-5 business days</li>
                  <li>Bank Transfers: 7-14 business days</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">
                  Return Shipping
                </h2>
                <p>
                  Customers are responsible for return shipping costs unless the return is due to
                  our error. We recommend using insured shipping with tracking for all returns.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4">Contact Us</h2>
                <p className="bg-gray-50 p-4 rounded-lg">
                  For any questions regarding our refund policy:
                  <br />
                  <a href="mailto:returns@devshop.com" className="text-blue-600 hover:underline">
                    returns@devshop.com
                  </a>
                  <br />
                  Support Phone: +91 999 999 9999
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
