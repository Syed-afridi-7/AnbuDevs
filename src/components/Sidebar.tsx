import { Calendar } from "lucide-react";

const days = ["S", "M", "T", "W", "T", "F", "S"];
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const firstDay = new Date(year, month, 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();

const Sidebar = () => {
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const monthName = today.toLocaleString("default", { month: "long" });

  const companies = [
    { name: "Google", count: 2924 },
    { name: "Amazon", count: 1935 },
    { name: "Meta", count: 1384 },
    { name: "Microsoft", count: 1353 },
    { name: "Apple", count: 349 },
    { name: "Bloomberg", count: 1177 },
    { name: "Uber", count: 375 },
    { name: "Oracle", count: 339 },
  ];

  return (
    <div className="w-72 shrink-0 space-y-5">
      {/* Calendar */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-card-foreground">
            {monthName} {year}
          </span>
          <Calendar className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {days.map((d, i) => (
            <div key={i} className="text-[10px] text-muted-foreground font-medium py-1">{d}</div>
          ))}
          {calendarDays.map((day, i) => (
            <div
              key={i}
              className={`text-[11px] py-1 rounded-sm ${
                day === today.getDate()
                  ? "bg-primary text-primary-foreground font-bold"
                  : day
                  ? "text-card-foreground hover:bg-secondary cursor-pointer"
                  : ""
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Trending Companies */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-medium text-card-foreground mb-3">Trending Companies</h3>
        <div className="flex flex-wrap gap-2">
          {companies.map((c) => (
            <button
              key={c.name}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {c.name}
              <span className="bg-primary/15 text-primary text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                {c.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
