import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Find Your Perfect Rental in Zambia
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          RentZambia connects tenants with landlords and agents to make property rental simple, fast, and secure.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card p-6 rounded-lg shadow-md border border-border">
            <h3 className="text-2xl font-semibold text-foreground mb-3">For Tenants</h3>
            <p className="text-muted-foreground mb-4">
              Search thousands of rental properties, schedule visits, and book securely.
            </p>
            <Link 
              href="/tenant" 
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Find Properties
            </Link>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-md border border-border">
            <h3 className="text-2xl font-semibold text-foreground mb-3">For Landlords & Agents</h3>
            <p className="text-muted-foreground mb-4">
              List your properties, manage inquiries, and connect with potential tenants.
            </p>
            <Link 
              href="/landlord" 
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              List Properties
            </Link>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-md border border-border">
            <h3 className="text-2xl font-semibold text-foreground mb-3">Admin Panel</h3>
            <p className="text-muted-foreground mb-4">
              Manage the platform, approve listings, and ensure quality standards.
            </p>
            <Link 
              href="/admin" 
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Manage Platform
            </Link>
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Search & Filter</h3>
              <p className="text-muted-foreground">Find properties that match your criteria</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Connect & Book</h3>
              <p className="text-muted-foreground">Schedule visits and secure your rental</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Move In</h3>
              <p className="text-muted-foreground">Enjoy your new rental with peace of mind</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            href="/login" 
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors mr-4"
          >
            Sign In
          </Link>
          <Link 
            href="/register" 
            className="inline-block bg-secondary text-secondary-foreground px-6 py-3 rounded-md text-lg font-medium hover:bg-secondary/90 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}
