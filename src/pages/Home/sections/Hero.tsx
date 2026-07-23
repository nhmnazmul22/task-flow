import { Link } from "react-router";
import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
      <Container className="relative py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 mb-6">
            Trusted by 10,000+ teams worldwide
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Manage projects.
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Ship faster.
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            TaskFlow brings your team's tasks, boards, and workflows into one
            place. Kanban boards, real-time updates, and seamless collaboration
            — all in a workspace built for speed.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="success" size="lg">
                Start for Free
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg" className="border-slate-600 text-white hover:bg-white/5 hover:border-slate-500">
                See How It Works
              </Button>
            </a>
          </div>
        </div>

        <div className="mt-16 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur p-4 shadow-2xl shadow-emerald-500/5">
            <div className="rounded-xl bg-slate-900/80 border border-slate-700/30 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-slate-500 font-mono">
                  taskflow.app/dashboard
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-500 mb-2">To Do</p>
                  <div className="space-y-2">
                    <div className="h-8 bg-slate-700/50 rounded-md" />
                    <div className="h-8 bg-slate-700/50 rounded-md w-3/4" />
                    <div className="h-8 bg-slate-700/50 rounded-md w-1/2" />
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-500 mb-2">In Progress</p>
                  <div className="space-y-2">
                    <div className="h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-md" />
                    <div className="h-8 bg-slate-700/50 rounded-md w-2/3" />
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-500 mb-2">Done</p>
                  <div className="space-y-2">
                    <div className="h-8 bg-slate-700/30 rounded-md" />
                    <div className="h-8 bg-slate-700/30 rounded-md w-4/5" />
                    <div className="h-8 bg-slate-700/30 rounded-md w-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
