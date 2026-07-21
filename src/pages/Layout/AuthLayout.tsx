import {Outlet} from "react-router";
import Logo from "@/components/common/Logo.tsx";

const TaskCard = ({
                      title,
                      tag,
                      color,
                      className = "",
                  }: {
    title: string;
    tag: string;
    color: string;
    className?: string;
}) => (
    <div
        className={`absolute bg-white/10 backdrop-blur-sm rounded-xl p-4 w-52 border border-white/20 shadow-lg ${className}`}
    >
        <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${color}`}/>
            <span className="text-white/60 text-xs font-medium uppercase tracking-wider">
        {tag}
      </span>
        </div>
        <p className="text-white text-sm font-medium leading-snug">{title}</p>
        <div className="mt-3 flex gap-1.5">
            <div className="h-1 w-12 rounded-full bg-white/20"/>
            <div className="h-1 w-8 rounded-full bg-white/10"/>
        </div>
    </div>
);

const AuthLayout = () => {
    return (
        <div className="flex min-h-screen">
            {/* Left — animated visual panel */}
            <div
                className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-linear-to-br from-indigo-600 via-violet-600 to-purple-700">
                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />

                {/* Glow orbs */}
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-400/30 rounded-full blur-3xl auth-pulse"/>
                <div
                    className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl auth-pulse"
                    style={{animationDelay: "2s"}}/>

                {/* Floating task cards */}
                <TaskCard
                    title="Design system review"
                    tag="In Progress"
                    color="bg-amber-400"
                    className="top-[12%] left-[8%] auth-float-1"
                />
                <TaskCard
                    title="API integration Sprint"
                    tag="To Do"
                    color="bg-sky-400"
                    className="top-[38%] left-[52%] auth-float-2"
                />
                <TaskCard
                    title="User onboarding flow"
                    tag="Done"
                    color="bg-emerald-400"
                    className="bottom-[15%] left-[18%] auth-float-3"
                />

                {/* Flow lines — dashed connectors between cards */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M 180 200 Q 350 160 420 260"
                        fill="none"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="2"
                        strokeDasharray="6 6"
                        className="auth-dash"
                    />
                    <path
                        d="M 420 280 Q 300 380 220 420"
                        fill="none"
                        stroke="rgba(255,255,255,0.12)"
                        strokeWidth="2"
                        strokeDasharray="6 6"
                        className="auth-dash"
                        style={{animationDelay: "0.5s"}}
                    />
                </svg>

                {/* Branding — bottom left */}
                <div className="absolute bottom-8 left-8 auth-fade-in">
                    <Logo/>
                </div>

                {/* Center headline */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center pointer-events-none">
                    <h1 className="text-white text-4xl xl:text-5xl font-bold leading-tight mb-4 auth-slide-up">
                        Where teams
                        <br/>
                        move forward
                    </h1>
                    <p className="text-white/60 text-lg max-w-md auth-slide-up-delay-1">
                        Organize, track, and deliver — all in one flow.
                    </p>
                </div>
            </div>

            {/* Right — form panel */}
            <div className="w-full lg:w-[45%] flex items-center justify-center bg-white px-6 py-12">
                <div className="w-full max-w-md">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
