import logo from '../../../assets//logo.png'
import { Button } from "../../UI";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
const navigate = useNavigate();

const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };
  
  return (
    <nav className="container mx-auto h-20 sticky top-0 glass__bg px-4">
      <div className="flex justify-between items-center h-full">
        <img  src={logo} className="w-30"/>
        <Button onClick={handleLogout} className="text-base bg-red-700">
            Sair
        </Button>
        
      </div>
    </nav>
  );
};

export default Navbar;
