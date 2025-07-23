import NewsHeader from "@/components/NewsHeader";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <NewsHeader />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We collect information you provide directly to us when you use our insurance 
                comparison service. This may include:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Personal information such as name, email address, phone number, and address</li>
                <li>Vehicle information including make, model, year, and VIN</li>
                <li>Driving history and insurance history</li>
                <li>Payment information when processing transactions</li>
                <li>Usage data and website interaction information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide insurance quotes and comparison services</li>
                <li>Connect you with insurance providers</li>
                <li>Improve our website and services</li>
                <li>Communicate with you about our services</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Insurance companies and agents to provide quotes</li>
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your consent</li>
              </ul>
              <p className="mb-4">
                We do not sell your personal information to third parties for their marketing purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and data storage</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking</h2>
              <p className="mb-4">
                Our website uses cookies and similar tracking technologies to enhance your 
                experience. Cookies help us:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and advertisements</li>
                <li>Improve our services and user experience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <p className="mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
                <li>File a complaint with regulatory authorities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
              <p className="mb-4">
                We retain your information for as long as necessary to provide our services 
                and comply with legal obligations. Typically, we retain data for:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Account information: Until account deletion</li>
                <li>Transaction records: 7 years for tax and legal purposes</li>
                <li>Marketing data: Until you opt-out</li>
                <li>Website analytics: 2 years</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Third-Party Links</h2>
              <p className="mb-4">
                Our website may contain links to third-party websites. We are not responsible 
                for the privacy practices of these external sites. We encourage you to review 
                their privacy policies before providing any personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of 
                significant changes by posting the new policy on our website and updating 
                the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or our data practices, 
                please contact us through our website contact form or email us directly.
              </p>
            </section>
          </div>

          <div className="mt-12 text-center">
            <a 
              href="/" 
              className="text-primary hover:text-primary/80 font-medium"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;