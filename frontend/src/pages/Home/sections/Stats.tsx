import Container from "@/components/common/Container";

type Stat = {
  value: string;
  label: string;
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

const stats: Stat[] = [
  { value: "10K+", label: "Active Teams" },
  { value: "2M+", label: "Tasks Completed" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9/5", label: "User Rating" },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "TaskFlow replaced three tools for our team. The realtime boards are incredibly smooth.",
    name: "Sarah Chen",
    role: "Engineering Lead",
    company: "Nextera",
  },
  {
    quote:
      "We shipped our product 40% faster after switching to TaskFlow. The multi-workspace feature is a game changer.",
    name: "Marcus Rivera",
    role: "Product Manager",
    company: "Orbiter",
  },
  {
    quote:
      "Clean UI, fast performance, and great collaboration features. Exactly what a growing startup needs.",
    name: "Aisha Patel",
    role: "CTO",
    company: "Luminal",
  },
];

const Stats = () => {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl md:text-5xl font-bold bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Loved by teams everywhere
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-6 rounded-2xl border border-slate-200 bg-slate-50"
            >
              <p className="text-slate-600 leading-relaxed italic">
                "{t.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t.role} at {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Stats;
