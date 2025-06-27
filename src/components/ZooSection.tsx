import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Animal {
  id: number;
  name: string;
  scientificName: string;
  description: string;
  image: string;
}

export const ZooSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const animalsPerPage = 6;

  const allAnimals: Animal[] = [
    {
      id: 1,
      name: "León Africano",
      scientificName: "Panthera leo",
      description:
        "El rey de la sabana, conocido por su melena majestuosa y rugido poderoso que puede escucharse a kilómetros de distancia.",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Jaguar",
      scientificName: "Panthera onca",
      description:
        "El felino más grande de América, excelente nadador y con la mordida más poderosa entre todos los grandes felinos.",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Oso de Anteojos",
      scientificName: "Tremarctos ornatus",
      description:
        "Único oso nativo de Sudamérica, habita en los bosques andinos y es conocido por las marcas alrededor de sus ojos.",
      image: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Cóndor Andino",
      scientificName: "Vultur gryphus",
      description:
        "Ave nacional del Perú, una de las aves voladoras más grandes del mundo con una envergadura de hasta 3 metros.",
      image: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Vicuña",
      scientificName: "Vicugna vicugna",
      description:
        "Camélido sudamericano que produce la fibra más fina del mundo, símbolo de la fauna andina peruana.",
      image: "/placeholder.svg",
    },
    {
      id: 6,
      name: "Mono Choro",
      scientificName: "Lagothrix lagotricha",
      description:
        "Primate endémico de la Amazonía peruana, conocido por su cola prensil y comportamiento social complejo.",
      image: "/placeholder.svg",
    },
    {
      id: 7,
      name: "Puma",
      scientificName: "Puma concolor",
      description:
        "Felino americano de gran adaptabilidad, capaz de vivir desde el nivel del mar hasta los 5,800 metros de altura.",
      image: "/placeholder.svg",
    },
    {
      id: 8,
      name: "Otorongo",
      scientificName: "Panthera onca",
      description:
        "Jaguar amazónico, depredador apex de la selva peruana con un patrón único de rosetas en su pelaje.",
      image: "/placeholder.svg",
    },
    {
      id: 9,
      name: "Boa Esmeralda",
      scientificName: "Corallus caninus",
      description:
        "Serpiente no venenosa de la Amazonía, conocida por su hermoso color verde esmeralda y hábitos arbóreos.",
      image: "/placeholder.svg",
    },
    {
      id: 10,
      name: "Tucán",
      scientificName: "Ramphastos tucanus",
      description:
        "Ave tropical caracterizada por su colorido pico grande, importante dispersor de semillas en la selva.",
      image: "/placeholder.svg",
    },
    {
      id: 11,
      name: "Perezoso",
      scientificName: "Bradypus tridactylus",
      description:
        "Mamífero arbóreo de movimientos lentos, adaptado perfectamente a la vida en las copas de los árboles.",
      image: "/placeholder.svg",
    },
    {
      id: 12,
      name: "Tapir",
      scientificName: "Tapirus terrestris",
      description:
        "Mamífero herbívoro considerado un 'fósil viviente', importante para la dispersión de semillas en la Amazonía.",
      image: "/placeholder.svg",
    },
  ];

  const totalPages = Math.ceil(allAnimals.length / animalsPerPage);
  const startIndex = (currentPage - 1) * animalsPerPage;
  const currentAnimals = allAnimals.slice(startIndex, startIndex + animalsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    document.getElementById("zoologia")?.scrollIntoView({ behavior: "smooth" });
  };

  // Cierra el visor si se presiona ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImageIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="zoologia" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-park-blue mb-4">
            Zoo y Animales
          </h2>
          <div className="w-24 h-1 bg-park-green mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentAnimals.map((animal, index) => (
            <Card
              key={animal.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-96"
            >
              <div className="relative h-full w-full">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: "#00864b" }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 h-[70%] flex flex-col justify-center">
                  <CardContent className="p-6 w-full">
                    <h3 className="text-xl font-bold text-park-blue mb-2">
                      {animal.name}
                    </h3>
                    <p className="text-sm font-medium text-park-green mb-3 italic">
                      {animal.scientificName}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {animal.description}
                    </p>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setSelectedImageIndex(index)}
                      className="mt-4"
                    >
                      Ver foto
                    </Button>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2"
          >
            Anterior
          </Button>

          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  onClick={() => goToPage(pageNumber)}
                  className={cn(
                    "w-10 h-10 p-0 text-sm",
                    currentPage === pageNumber
                      ? "bg-park-blue hover:bg-park-blue/90 text-white"
                      : "hover:bg-park-blue/10 text-park-blue"
                  )}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2"
          >
            Siguiente
          </Button>
        </div>

        <div className="text-center mt-4 text-sm text-gray-600">
          Mostrando {startIndex + 1}-
          {Math.min(startIndex + animalsPerPage, allAnimals.length)} de{" "}
          {allAnimals.length} animales
        </div>
      </div>

      {/* Modal responsive para imagen ampliada */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4">
          <div className="relative">
            <img
              src={currentAnimals[selectedImageIndex].image}
              alt="Foto ampliada"
              className="max-w-[80vw] max-h-[80vh] w-auto h-auto rounded shadow-lg mx-auto"
            />

            {/* Botón cerrar */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="fixed top-4 right-4 z-50 text-white bg-black/60 hover:bg-black/80 rounded-full p-3 text-xl"
              aria-label="Cerrar"
            >
              ✕
            </button>

            {/* Flecha izquierda */}
            {selectedImageIndex > 0 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                className="absolute left-[-3rem] top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/80 rounded-full p-3 text-2xl"
                aria-label="Anterior"
              >
                ‹
              </button>
            )}

            {/* Flecha derecha */}
            {selectedImageIndex < currentAnimals.length - 1 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                className="absolute right-[-3rem] top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/80 rounded-full p-3 text-2xl"
                aria-label="Siguiente"
              >
                ›
              </button>
            )}

            {/* Contador de imagen */}
            <div className="mt-4 text-center text-white text-sm bg-black/50 px-3 py-1 rounded-full mx-auto">
              Imagen {selectedImageIndex + 1} de {currentAnimals.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
