import { Link } from "react-router";
import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
      <Container className="relative text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Ready to manage projects
          <br />
          <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            the right way?
          </span>
        </h2>
        <p className="mt-6 text-lg text-slate-300 max-w-xl mx-auto">
          Join thousands of teams already using TaskFlow. Free for small teams,
          no credit card required.
        </p>
        <div className="mt-10">
          <Link to="/signup">
            <Button variant="success" size="lg">
              Get Started — It's Free
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
