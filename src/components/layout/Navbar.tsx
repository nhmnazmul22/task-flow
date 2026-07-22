import Container from "@/components/common/Container";
import Logo_Light from "@/components/common/Logo_Light";

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <Container>
        <div className="flex justify-between items-center py-4">
          <div>
            <Logo_Light />
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-blue-500">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-500">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-500">
              Contact
            </a>
          </div>
          <div>
            
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
