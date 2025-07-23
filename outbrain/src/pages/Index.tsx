import NewsHeader from "@/components/NewsHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-insurance.png";

const Index = () => {
  const ageGroups = [
    { label: "18-34", href: "https://example.com/quote?age=18-34" },
    { label: "35-44", href: "https://example.com/quote?age=35-44" },
    { label: "45-54", href: "https://example.com/quote?age=45-54" },
    { label: "55-64", href: "https://example.com/quote?age=55-64" },
    { label: "65-74", href: "https://example.com/quote?age=65-74" },
    { label: "75+", href: "https://example.com/quote?age=75+" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NewsHeader />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            My Insurance Went From{" "}
            <span className="text-primary">$147 to $37</span>{" "}
            Thanks To This Website!
          </h1>
          
          {/* Subheadline */}
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-12 font-medium">
            Brand New Policy Makes Auto Insurance So Cheap, It's Like Shopping At Walmart
          </h2>

          {/* Hero Image */}
          <div className="mb-12 flex justify-center">
            <img 
              src={heroImage} 
              alt="Auto Insurance Savings Screenshot" 
              className="max-w-full h-auto rounded-lg shadow-xl"
            />
          </div>

          {/* Call to Action */}
          <h3 className="text-2xl md:text-3xl font-bold mb-8">
            Tap your age below to see how much you can save
          </h3>

          {/* Age Selection Card */}
          <Card className="p-8 max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold mb-8">What's Your Age?</h4>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ageGroups.map((group) => (
                <Button
                  key={group.label}
                  variant="age"
                  asChild
                  className="w-full"
                >
                  <a href={group.href} target="_blank" rel="noopener noreferrer">
                    {group.label}
                  </a>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-8 text-sm">
            <a 
              href="/terms" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="/privacy" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            © 2024 Insurance News. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;