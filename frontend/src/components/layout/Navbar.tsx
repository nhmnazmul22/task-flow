import { Link } from "react-router";
import Container from "@/components/common/Container";
import Logo_Light from "@/components/common/Logo_Light";
import Button from "@/components/ui/Button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <Container>
        <div className="flex justify-between items-center py-4">
          <Link to="/">
            <Logo_Light />
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="md">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="md">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
