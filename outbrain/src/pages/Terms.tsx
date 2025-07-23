import NewsHeader from "@/components/NewsHeader";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <NewsHeader />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using this website, you accept and agree to be bound by the terms 
                and provision of this agreement. These Terms of Service ("Terms") govern your use 
                of our insurance comparison service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
              <p className="mb-4">
                Permission is granted to temporarily download one copy of the materials on our 
                website for personal, non-commercial transitory viewing only. This is the grant 
                of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
              <p className="mb-4">
                The materials on this website are provided on an 'as is' basis. We make no 
                warranties, expressed or implied, and hereby disclaim and negate all other 
                warranties including without limitation, implied warranties or conditions of 
                merchantability, fitness for a particular purpose, or non-infringement of 
                intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Insurance Quotes</h2>
              <p className="mb-4">
                We provide a platform to compare insurance quotes from various providers. We are 
                not an insurance company and do not sell insurance directly. All insurance 
                transactions are between you and the respective insurance providers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Limitations</h2>
              <p className="mb-4">
                In no event shall our company or its suppliers be liable for any damages 
                (including, without limitation, damages for loss of data or profit, or due to 
                business interruption) arising out of the use or inability to use the materials 
                on our website, even if we or our authorized representative has been notified 
                orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Accuracy of Materials</h2>
              <p className="mb-4">
                The materials appearing on our website could include technical, typographical, 
                or photographic errors. We do not warrant that any of the materials on its 
                website are accurate, complete, or current. We may make changes to the materials 
                contained on its website at any time without notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Modifications</h2>
              <p className="mb-4">
                We may revise these terms of service for its website at any time without notice. 
                By using this website, you are agreeing to be bound by the then current version 
                of these terms of service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us through 
                our website contact form.
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

export default Terms;