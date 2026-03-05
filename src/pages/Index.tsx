import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ArrowRight, Code, Users, Trophy } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-nav" />
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-nav-foreground mb-4 tracking-tight">
            A New Way to Learn
          </h1>
          <p className="text-nav-foreground/60 text-base max-w-lg mx-auto mb-8">
            The best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.
          </p>
          <Link
            to="/problemset"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Start Exploring <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Code, title: "4100+ Questions", desc: "Practice coding problems across all difficulty levels and topics." },
            { icon: Users, title: "Community", desc: "Join hundreds of thousands of active developers discussing solutions." },
            { icon: Trophy, title: "Contests", desc: "Challenge yourself weekly and earn rewards through competitive coding." },
          ].map((item) => (
            <div key={item.title} className="text-center p-6 rounded-xl bg-card border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-card-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-card border border-border rounded-xl p-10 text-center">
          <h2 className="text-2xl font-bold text-card-foreground mb-3">Ready to start?</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Explore our problem set and begin your coding journey today.
          </p>
          <Link
            to="/problemset"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            View Problems <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>© 2026 LeetCode Clone</span>
          <div className="flex items-center gap-4">
            <span>Terms</span>
            <span>Privacy</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
