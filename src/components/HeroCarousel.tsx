import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Carrusel principal de imágenes con información del parque
 * Cambia automáticamente cada 5 segundos y permite navegación manual
 */
export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Datos de las imágenes del carrusel con información del parque
  const slides = [
    {
      id: 1,
      image: "/placeholder.svg",
      subtitle: "Parque Zonal",
      title: "CHAVIN DE HUANTAR",
      description:
        "Ven y descubre algunas de las 7 maravillas del mundo mientras te maravillas con la fauna que habita nuestro parque.",
      buttonText: "Explora el Parque",
    },
    {
      id: 2,
      image: "/placeholder.svg",
      subtitle: "Estatuas Famosas",
      title: "FOTOS EPICAS",
      description:
        "¡Conoce a nuestros personajes favoritos! Prepárate para vivir momentos únicos y llevarte los mejores recuerdos.",
      buttonText: "Explora el Parque",
    },
    {
      id: 3,
      image: "/placeholder.svg",
      subtitle: "Centro Deportivo",
      title: "RECREACIÓN FAMILIAR",
      description:
        "Demuestra tus habilidades en nuestra amplia loza deportiva, perfecta para partidos de fútbol, vóley y más.",
      buttonText: "Explora el Parque",
    },
    {
      id: 4,
      image: "/placeholder.svg",
      subtitle: "Piscina Refrescante",
      title: "UN CHAPUZÓN DE ALEGRÍA",
      description:
        "Sumérgete en la diversión. Nuestra piscina es el lugar perfecto para refrescarte y pasar momentos inolvidables",
      buttonText: "Explora el Parque",
    },
    {
      id: 5,
      image: "/placeholder.svg",
      subtitle: "Paseos en Botes",
      title: "NAVEGA Y RELÁJATE",
      description:
        "Relájate y navega en nuestros botes a pedal. Una experiencia tranquila rodeada de naturaleza.",
      buttonText: "Explora el Parque",
    },
  ];

  /**
   * Efecto para cambio automático de slides cada 5 segundos
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  /**
   * Navega al slide anterior
   */
  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  /**
   * Navega al slide siguiente
   */
  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  /**
   * Navega directamente a un slide específico
   */
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Container de las imágenes */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative flex-shrink-0 w-full h-full">
            {/* Imagen de fondo */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundColor: index % 2 === 0 ? "#054986" : "#f29200", // Alternating background colors for placeholder
              }}
            />

            {/* Overlay para mejor legibilidad del texto */}
            <div className="absolute inset-0 bg-black bg-opacity-40" />

            {/* Contenido del slide */}
            <div className="relative h-full flex items-center">
              <div className="text-left text-white px-4 max-w-2xl ml-16 lg:ml-24">
                {/* Subtítulo */}
                <p className="text-sm sm:text-lg font-light mb-2 tracking-wide uppercase opacity-90">
                  {slide.subtitle}
                </p>

                {/* Título principal */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>

                {/* Descripción */}
                <p className="text-sm sm:text-lg mb-8 leading-relaxed opacity-90 max-w-xl">
                  {slide.description}
                </p>

                {/* Botón de acción */}
                <Button
                  size="lg"
                  className="bg-park-orange hover:bg-park-orange-light text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {slide.buttonText}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Slide siguiente"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicadores de slide */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              currentSlide === index
                ? "bg-white scale-110"
                : "bg-white bg-opacity-50 hover:bg-opacity-75",
            )}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
