import Container from "@/components/common/Container";

const logos = [
  "Acme Corp",
  "Globex",
  "Initech",
  "Umbrella",
  "Hooli",
  "Stark Ind.",
];

const TrustedBy = () => {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <Container>
        <p className="text-center text-sm font-medium text-slate-400 uppercase tracking-wider mb-8">
          Trusted by innovative teams everywhere
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {logos.map((name) => (
            <span
              key={name}
              className="text-slate-300 font-semibold text-lg tracking-tight select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TrustedBy;
