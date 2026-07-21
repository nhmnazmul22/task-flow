const Logo = () => {
    return (
        <div className="flex items-center gap-3">
            <div
                className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                </svg>
            </div>
            <div>
                <p className="text-white font-semibold text-lg tracking-tight">TaskFlow</p>
                <p className="text-white/50 text-xs">Manage tasks that matter</p>
            </div>
        </div>
    );
};

export default Logo;