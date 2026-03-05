import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ArrowRight, Code, Users, Trophy, Flame, TrendingUp, Zap, BookOpen } from "lucide-react";
import { problems } from "@/data/problems";
import DifficultyBadge from "@/components/DifficultyBadge";

const studyPlans = [
  { title: "Top Interview 150", desc: "Must-do list for interview prep", problems: 150, icon: "🎯", color: "from-primary/20 to-primary/5" },
  { title: "LeetCode 75", desc: "Ace coding interviews with 75 Qs", problems: 75, icon: "⚡", color: "from-easy/20 to-easy/5" },
  { title: "SQL 50", desc: "Crack SQL interview in 50 Qs", problems: 50, icon: "🗃️", color: "from-medium/20 to-medium/5" },
  { title: "Top 100 Liked", desc: "Most popular problems on LeetCode", problems: 100, icon: "❤️", color: "from-hard/20 to-hard/5" },
];

const trendingProblems = problems.slice(0, 6);

const companies = [
  { name: "Google", count: 842 },
  { name: "Amazon", count: 756 },
  { name: "Meta", count: 621 },
  { name: "Microsoft", count: 589 },
  { name: "Apple", count: 412 },
  { name: "Bloomberg", count: 356 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-nav" />
        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-nav-foreground/10 text-nav-foreground/80 text-xs px-3 py-1 rounded-full mb-6">
            <Flame className="w-3.5 h-3.5 text-primary" /> New problems added weekly
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-nav-foreground mb-4 tracking-tight">
            A New Way to Learn
          </h1>
          <p className="text-nav-foreground/60 text-base max-w-lg mx-auto mb-8">
            The best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/problemset"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Start Exploring <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="inline-flex items-center gap-2 bg-nav-foreground/10 text-nav-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:bg-nav-foreground/15 transition-colors">
              <BookOpen className="w-4 h-4" /> Study Plans
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Code, title: "4100+ Questions", desc: "Practice coding problems across all difficulty levels and topics." },
            { icon: Users, title: "Community", desc: "Join hundreds of thousands of active developers discussing solutions." },
            { icon: Trophy, title: "Contests", desc: "Challenge yourself weekly and earn rewards through competitive coding." },
          ].map((item) => (
            <div key={item.title} className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-card-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Study Plans */}
      <section className="max-w-5xl mx-auto px-6 pb-14">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" /> Study Plans
          </h2>
          <button className="text-xs text-primary hover:underline">See all →</button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {studyPlans.map((plan) => (
            <div key={plan.title} className={`rounded-xl border border-border p-5 bg-gradient-to-br ${plan.color} hover:border-primary/30 transition-colors cursor-pointer`}>
              <span className="text-2xl mb-3 block">{plan.icon}</span>
              <h3 className="text-sm font-semibold text-foreground mb-1">{plan.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{plan.desc}</p>
              <span className="text-[10px] text-muted-foreground/80">{plan.problems} problems</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Problems */}
      <section className="max-w-5xl mx-auto px-6 pb-14">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Trending Problems
          </h2>
          <Link to="/problemset" className="text-xs text-primary hover:underline">View all →</Link>
        </div>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary/50">
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">#</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Title</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-4 py-2.5">Acceptance</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {trendingProblems.map((p, idx) => (
                <tr key={p.id} className={`border-t border-border hover:bg-[hsl(var(--row-hover))] transition-colors ${idx % 2 ? "bg-secondary/20" : ""}`}>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{p.id}</td>
                  <td className="px-4 py-3">
                    <Link to={`/problems/${p.id}`} className="text-sm text-foreground hover:text-primary transition-colors">{p.title}</Link>
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-muted-foreground">{p.acceptance}%</td>
                  <td className="px-4 py-3"><DifficultyBadge difficulty={p.difficulty} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Companies */}
      <section className="max-w-5xl mx-auto px-6 pb-14">
        <h2 className="text-lg font-semibold text-foreground mb-5">Top Companies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {companies.map((c) => (
            <div key={c.name} className="rounded-lg border border-border p-4 text-center hover:border-primary/30 transition-colors cursor-pointer bg-card">
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{c.count} questions</p>
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
