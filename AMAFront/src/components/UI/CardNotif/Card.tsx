import { motion } from "framer-motion";
import Group from "../../../assets/Group.svg";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }} // Começa fora da tela à direita
      animate={{ x: 0, opacity: 1 }} // Anima para dentro da tela
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
      className=" mt-96 bottom-5 right-5 md:bottom-10  w-11/12 max-w-sm md:max-w-md bg-white shadow-2xl rounded-2xl flex flex-col items-center justify-center relative overflow-hidden"
    >
      
      <img
        src={Group}
        className="w-full h-full object-cover rounded-2xl opacity-80"
        alt="Ilustração"
      />

      
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-black/50 rounded-2xl p-6">
        <h1 className="text-xl md:text-2xl font-bold text-white text-center leading-tight">
          🚀 Comece agora!
        </h1>

        <p className="text-sm md:text-lg text-white text-center">
          Faça seu cadastro com um clique e aproveite todos os benefícios.
        </p>

        <button
          onClick={() => navigate("/cadastroTEA")}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-md md:text-lg py-3 px-6 rounded-xl transition-all duration-300"
        >
          Cadastrar Agora
        </button>
      </div>
    </motion.div>
  );
}
