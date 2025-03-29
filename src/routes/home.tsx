import { Link } from "react-router";
import { Button } from "@/components/ui/button";

function Home() {
  return (
    <div className="w-full h-[98vh] px-4 custom-scroll flex flex-col gap-4 border border-gray-200 rounded-lg ">
      {/* Hero Section */}
      <section className="my-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold  mb-6">
          Welcome to Bookify
        </h1>
        <p className="text-lg md:text-xl text-accent-foreground max-w-2xl mx-auto mb-8">
          Your personal library management system. Organize, discover, and enjoy
          your reading journey.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto">
            <Link to="/books">Browse Books</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto">
            <Link to="/authors">View Authors</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className=" px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Bookify?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard
            title="Easy Management"
            description="Add and organize your books with just a few clicks."
            icon="📚"
          />
          <FeatureCard
            title="Discover More"
            description="Find new books and authors to expand your horizons."
            icon="🔍"
          />
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4 max-w-7xl mx-auto rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8">Get Started</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <QuickLinkCard
            title="View All Books"
            description="See your complete collection"
            link="/books"
            linkText="Browse Books"
          />
          <QuickLinkCard
            title="View All Authors"
            description="Explore all authors"
            link="/authors"
            linkText="Browse Authors"
          />
        </div>
      </section>
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className=" p-6 rounded-lg shadow-sm hover:shadow-md transition-all outline-none border border-gray-100 text-center cursor-pointer hover:-translate-y-1 duration-200">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-accent-foreground">{description}</p>
    </div>
  );
}

// Quick Link Card Component
function QuickLinkCard({
  title,
  description,
  link,
  linkText,
}: {
  title: string;
  description: string;
  link: string;
  linkText: string;
}) {
  return (
    <div className=" p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-accent-foreground mb-4">{description}</p>
      <Button
        asChild
        variant="outline"
        className="w-full">
        <Link to={link}>{linkText}</Link>
      </Button>
    </div>
  );
}

export default Home;
