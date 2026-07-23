import Container from "@/components/common/Container";

const steps = [
  {
    step: "01",
    title: "Create a Workspace",
    description:
      "Sign up and create your first workspace in seconds. Invite your team members with a single link.",
  },
  {
    step: "02",
    title: "Set Up Your Board",
    description:
      "Customize columns to match your workflow — To Do, In Progress, Review, Done. Add tasks with descriptions, labels, and assignees.",
  },
  {
    step: "03",
    title: "Collaborate & Ship",
    description:
      "Move tasks with drag-and-drop, leave comments, and track progress in real-time. Ship projects faster than ever.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-slate-50">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">
            How it works
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Up and running in minutes
          </h2>
          <p className="mt-4 text-slate-500 text-lg">
            No complex setup. No steep learning curve. Just sign up, create a
            board, and start shipping.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item) => (
            <div key={item.step} className="relative">
              <span className="text-7xl font-bold text-slate-100 absolute -top-4 -left-2 select-none">
                {item.step}
              </span>
              <div className="relative pt-12 pl-2">
                <h3 className="text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
