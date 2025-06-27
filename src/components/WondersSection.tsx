import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

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
 * Sección de Maravillas del Mundo con carrusel deslizable
 * Permite navegación con click y arrastre, redirige a páginas de detalle
 */
export const WondersSection = () => {
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

 // Datos de las maravillas del mundo
  const wonders: Wonder[] = [
    {
      id: 1,
      name: "Cristo Redentor",
      image: "/placeholder.svg",
      description: "Réplica del",
      fullDescription:
        "Contempla esta icónica estatua que se alza sobre la ciudad de Río de Janeiro. El Cristo Redentor es símbolo de fe y acogida, reconocido mundialmente como una de las nuevas maravillas del mundo.",
    },
    {
      id: 2,
      name: "Machu Picchu",
      image: "/placeholder.svg",
      description: "Réplica de",
      fullDescription:
        "Explora la ciudadela inca más famosa del mundo, suspendida entre las montañas de los Andes. Machu Picchu representa la cumbre de la ingeniería y espiritualidad de la civilización inca.",
    },
    {
      id: 3,
      name: "Gran Muralla China",
      image: "/placeholder.svg",
      description: "Réplica de la",
      fullDescription:
        "Recorre una sección de la fortificación más larga del mundo. La Gran Muralla China es testimonio del ingenio humano y la determinación de proteger una civilización milenaria.",
    },
        {
      id: 4,
      name: "Las Pirámides de Guiza",
      image: "/placeholder.svg",
      description: "Réplicas de",
      fullDescription:
        "Explora las majestuosas Pirámides de Guiza, construidas hace más de 4,500 años como tumbas para los faraones. Estas maravillas del mundo antiguo siguen desafiando al tiempo y revelando el misterio de una civilización que dominó la ingeniería, la astronomía y el arte con una precisión asombrosa.",
    },
  ];

  /**
   * Inicia el proceso de arrastre del carrusel
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  /**
   * Maneja el movimiento durante el arrastre
   */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    setHasMoved(true);
    const x = e.pageX - (carouselRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  /**
   * Finaliza el proceso de arrastre
   */
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  /**
   * Maneja el clic en una tarjeta de maravilla
   * Solo redirige si no hubo movimiento de arrastre
   */
  const handleWonderClick = (wonder: Wonder, e: React.MouseEvent) => {
    if (hasMoved) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    navigate(`/maravilla/${wonder.id}`, { state: { wonder } });
  };

  /**
   * Navega el carrusel hacia la dirección especificada
   */
  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = 320;
    const newScrollLeft =
      direction === "left"
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;

    carouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  /**
   * Maneja eventos globales para el drag
   */
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !carouselRef.current) return;
      e.preventDefault();
      setHasMoved(true);
      const x = e.pageX - (carouselRef.current.offsetLeft || 0);
      const walk = (x - startX) * 1.5;
      carouselRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);

  return (
    <section id="maravillas" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-park-blue mb-4">
            Maravillas del Mundo
          </h2>
          <div className="w-24 h-1 bg-park-orange mx-auto rounded"></div>
        </div>

        {/* Container del carrusel con botones de navegación y padding extra para evitar cortes */}
        <div className="relative py-8">
          {/* Botón izquierdo */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50 border-gray-200"
            onClick={() => scrollCarousel("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Carrusel deslizable con padding vertical para acomodar el efecto hover */}
          <div
            ref={carouselRef}
            className={cn(
              "flex overflow-x-auto scrollbar-hide space-x-6 px-12 select-none py-6",
              isDragging ? "cursor-grabbing" : "cursor-grab",
            )}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {wonders.map((wonder) => (
              <Card
                key={wonder.id}
                className={cn(
                  "flex-shrink-0 w-80 sm:w-96 transform transition-all duration-300",
                  !isDragging &&
                    "hover:scale-105 hover:shadow-xl cursor-pointer",
                )}
                onClick={(e) => handleWonderClick(wonder, e)}
                onDragStart={(e) => e.preventDefault()}
              >
                <CardContent className="p-0">
                  {/* Imagen de la maravilla */}
                  <div className="relative h-64 overflow-hidden rounded-t-lg">
                    <img
                      src={wonder.image}
                      alt={wonder.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 pointer-events-none"
                      style={{ backgroundColor: "#054986" }}
                      draggable={false}
                    />
                  </div>

                  {/* Información de la maravilla */}
                  <div className="p-6 text-center">
                    <p className="text-sm text-gray-600 mb-1">
                      {wonder.description}
                    </p>
                    <h3 className="text-xl font-bold text-park-blue">
                      {wonder.name}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Botón derecho */}
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50 border-gray-200"
            onClick={() => scrollCarousel("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Indicador de deslizamiento */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Desliza horizontalmente para ver más maravillas
          </p>
        </div>
      </div>
    </section>
  );
};