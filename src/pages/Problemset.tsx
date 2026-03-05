import Navbar from "@/components/Navbar";
import ProblemList from "@/components/ProblemList";
import Sidebar from "@/components/Sidebar";

const Problemset = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex gap-6 max-w-7xl mx-auto px-6 py-6">
        {/* Left sidebar placeholder */}
        <aside className="w-40 shrink-0 hidden lg:block">
          <div className="space-y-1">
            {["Library", "Quest", "Study Plan"].map((item) => (
              <button
                key={item}
                className="w-full text-left text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-md hover:bg-secondary transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-6 px-3">
            <p className="text-xs text-muted-foreground/60">Sign in to view lists and track study progress.</p>
            <button className="mt-3 text-xs bg-secondary hover:bg-accent text-foreground px-4 py-1.5 rounded-full transition-colors border border-border">
              Sign in
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <ProblemList />
        </main>

        {/* Right sidebar */}
        <aside className="hidden xl:block">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
};

export default Problemset;
