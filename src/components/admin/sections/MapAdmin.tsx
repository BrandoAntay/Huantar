import { useState } from "react";
import { useMapData } from "@/hooks/useAdminData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Edit,
  Eye,
  EyeOff,
  Upload,
  Map,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
} from "lucide-react";

export const MapAdmin = () => {
  const { mapData, update, toggleActive } = useMapData();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
  });

  const handleEdit = () => {
    if (mapData) {
      setFormData({
        image: mapData.image,
      });
      setIsEditModalOpen(true);
    }
  };

  const handleUpdate = () => {
    if (!formData.image) return;

    update({
      image: formData.image,
    });

    setIsEditModalOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData((prev) => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!mapData) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <Map className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            No hay datos del mapa
          </h2>
          <p className="text-gray-500">
            Ocurrió un error al cargar la información del mapa
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-park-blue">Mapa del Parque</h1>
          <p className="text-gray-600 mt-1">
            Gestiona la imagen del mapa que se muestra en la homepage
          </p>
        </div>

        <Button
          onClick={handleEdit}
          className="bg-park-blue hover:bg-park-blue/90 text-white"
        >
          <Edit className="w-4 h-4 mr-2" />
          Editar Mapa
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Map className="w-5 h-5 text-park-blue" />
              <div>
                <p className="text-sm text-gray-600">Estado del Mapa</p>
                <p className="text-xl font-semibold">Configurado</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              {mapData.active ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <div>
                <p className="text-sm text-gray-600">Visibilidad</p>
                <p
                  className={cn(
                    "text-xl font-semibold",
                    mapData.active ? "text-green-600" : "text-red-600",
                  )}
                >
                  {mapData.active ? "Visible" : "Oculto"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vista del mapa actual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-5 h-5 text-park-blue" />
              <span>Mapa Actual</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" onClick={handleEdit}>
                <Edit className="w-4 h-4 mr-1" />
                Editar
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant={mapData.active ? "destructive" : "default"}
                  >
                    {mapData.active ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-1" />
                        Desactivar
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-1" />
                        Activar
                      </>
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {mapData.active ? "¿Desactivar mapa?" : "¿Activar mapa?"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {mapData.active
                        ? "El mapa se ocultará de la sección 'Mapa del Parque' en la homepage."
                        : "El mapa volverá a mostrarse en la sección 'Mapa del Parque' en la homepage."}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={toggleActive}
                      className={
                        mapData.active ? "bg-red-600 hover:bg-red-700" : ""
                      }
                    >
                      {mapData.active ? "Desactivar" : "Activar"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Vista previa del mapa */}
            <div
              className={cn(
                "relative rounded-lg overflow-hidden border-2",
                mapData.active
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50",
              )}
            >
              <img
                src={mapData.image}
                alt="Mapa del parque"
                className={cn(
                  "w-full h-64 object-cover",
                  !mapData.active && "grayscale opacity-60",
                )}
              />

              {/* Status overlay */}
              <div
                className={cn(
                  "absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium",
                  mapData.active
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200",
                )}
              >
                {mapData.active ? "Visible en homepage" : "Oculto en homepage"}
              </div>

              {/* Preview overlay para estados */}
              {!mapData.active && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
                    <p className="text-sm font-medium text-gray-700">
                      Mapa desactivado
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Información del estado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">
                  Estado de visibilidad:
                </h4>
                <div className="flex items-center space-x-2">
                  {mapData.active ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={
                      mapData.active ? "text-green-600" : "text-red-600"
                    }
                  >
                    {mapData.active
                      ? "El mapa se muestra en la homepage"
                      : "El mapa está oculto en la homepage"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Acciones rápidas:</h4>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" onClick={handleEdit}>
                    <Edit className="w-3 h-3 mr-1" />
                    Cambiar imagen
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de edición */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Mapa del Parque</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Upload de imagen */}
            <div className="space-y-2">
              <Label>Nueva imagen del mapa</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload-edit"
                  />
                  <label htmlFor="image-upload-edit" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Haz clic para seleccionar una nueva imagen del mapa
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Recomendado: Imágenes claras y legibles del mapa del
                      parque
                    </p>
                  </label>
                </div>
                {formData.image && (
                  <div className="mt-4">
                    <img
                      src={formData.image}
                      alt="Preview del nuevo mapa"
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Imagen actual para comparación */}
            <div className="space-y-2">
              <Label>Imagen actual</Label>
              <div className="border rounded-lg p-2 bg-gray-50">
                <img
                  src={mapData.image}
                  alt="Mapa actual"
                  className="w-full h-32 object-cover rounded"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setFormData({ image: mapData.image });
                  setIsEditModalOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={!formData.image}
                className="bg-park-blue hover:bg-park-blue/90"
              >
                Actualizar Mapa
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
