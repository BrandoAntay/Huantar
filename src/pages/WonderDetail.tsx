import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/**
 * Interfaz para definir la estructura de una maravilla
 */
interface Wonder {
  id: number;
  name: string;
  image: string;
  description: string;
  fullDescription: string;
}

/**
 * Página de detalle de una maravilla específica
 * Muestra información completa con imagen y descripción detallada
 */
const WonderDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // Obtener datos de la maravilla desde el estado de navegación
  const wonder = location.state?.wonder as Wonder;

  // Si no hay datos en el estado, crear datos por defecto basados en el ID
  const getWonderById = (wonderId: string): Wonder => {
    const wonders: Record<string, Wonder> = {
      "1": {
        id: 1,
        name: "Cristo Redentor",
        image: "/placeholder.svg",
        description: "Réplica del",
        fullDescription:
        "Contempla esta icónica estatua que se alza sobre la ciudad de Río de Janeiro. El Cristo Redentor es símbolo de fe y acogida, reconocido mundialmente como una de las nuevas maravillas del mundo.",
      },
      "2": {
        id: 2,
        name: "Machu Picchu",
        image: "/placeholder.svg",
        description: "Réplica de",
        fullDescription:
        "Explora la ciudadela inca más famosa del mundo, suspendida entre las montañas de los Andes. Machu Picchu representa la cumbre de la ingeniería y espiritualidad de la civilización inca.",
      },
    };

    return wonders[wonderId] || wonders["1"];
  };

  const currentWonder = wonder || getWonderById(id || "1");

  /**
   * Efecto para hacer scroll al top cuando se carga la página
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /**
   * Maneja el regreso a la página principal
   */
  const handleGoBack = () => {
    navigate("/");
    // Hacer scroll a la sección de maravillas después de un breve delay
    setTimeout(() => {
      document
        .getElementById("maravillas")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra de navegación */}
      <Navbar />

      {/* Contenido principal con espaciado para navbar fija */}
      <main className="pt-16">
        {/* Header con botón de regreso */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Button
              variant="outline"
              onClick={handleGoBack}
              className="mb-4 hover:bg-park-blue hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Maravillas
            </Button>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Inicio</span>
              <span>/</span>
              <span>Maravillas</span>
              <span>/</span>
              <span className="text-park-blue font-medium">
                {currentWonder.name}
              </span>
            </div>
          </div>
        </div>

        {/* Contenido principal de la maravilla */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Lado izquierdo - Imagen */}
            <div className="space-y-6">
              <div className="relative">
                <img
                  src={currentWonder.image}
                  alt={currentWonder.name}
                  className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                  style={{ backgroundColor: "#054986" }}
                />

                {/* Badge de maravilla del mundo */}
                <div className="absolute top-4 left-4 bg-park-orange text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Maravilla del Mundo
                </div>
              </div>
            </div>

            {/* Lado derecho - Información detallada */}
            <div className="lg:pl-8">
              <Card className="shadow-xl border-0">
                <CardContent className="p-8">
                  {/* Título */}
                  <div className="mb-6">
                    <p className="text-park-orange font-medium mb-2">
                      {currentWonder.description}
                    </p>
                    <h1 className="text-3xl lg:text-4xl font-bold text-park-blue mb-4">
                      {currentWonder.name}
                    </h1>
                    <div className="w-16 h-1 bg-park-orange rounded"></div>
                  </div>

                  {/* Descripción completa */}
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                      {currentWonder.fullDescription}
                    </p>
                  </div>

                  {/* Características destacadas */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="font-bold text-park-blue mb-4">
                      Características destacadas:
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-park-orange rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Réplica fiel a escala de la maravilla original
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-park-orange rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Material de construcción resistente a la intemperie
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-park-orange rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Diseño detallado con elementos icónicos
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-park-orange rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Espacios acondicionados para la toma de fotografías
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Pie de página */}
      <Footer />
    </div>
  );
};

export default WonderDetail;
