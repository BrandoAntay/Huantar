import { useState } from "react";
import { useGroupImages } from "@/hooks/useAdminData";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  Users,
  Image as ImageIcon,
} from "lucide-react";
import type { GroupImage } from "@/lib/adminStorage";

export const GroupsAdmin = () => {
  const { groupImages, add, update, remove, toggleActive } = useGroupImages();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GroupImage | null>(null);
  const [formData, setFormData] = useState({
    image: "",
    alt: "",
    caption: "",
  });

  const resetForm = () => {
    setFormData({
      image: "",
      alt: "",
      caption: "",
    });
  };

  const handleAdd = () => {
    if (!formData.image || !formData.alt) return;

    add({
      ...formData,
      active: true,
    });

    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEdit = (image: GroupImage) => {
    setFormData({
      image: image.image,
      alt: image.alt,
      caption: image.caption,
    });
    setEditingImage(image);
  };

  const handleUpdate = () => {
    if (!editingImage || !formData.image || !formData.alt) return;

    update(editingImage.id, formData);
    resetForm();
    setEditingImage(null);
  };

  const handleDelete = (id: number) => {
    remove(id);
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

  const activeImages = groupImages.filter((image) => image.active);
  const inactiveImages = groupImages.filter((image) => !image.active);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-park-blue">Grupos Grandes</h1>
          <p className="text-gray-600 mt-1">
            Gestiona las imágenes del carrusel de la sección Grupos Grandes
          </p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-park-green hover:bg-park-green/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Imagen
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agregar Nueva Imagen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Upload de imagen */}
              <div className="space-y-2">
                <Label>Imagen del Grupo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload-add"
                    />
                    <label
                      htmlFor="image-upload-add"
                      className="cursor-pointer"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Haz clic para seleccionar una imagen o arrastra aquí
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Recomendado: Imágenes de grupos disfrutando en el parque
                      </p>
                    </label>
                  </div>
                  {formData.image && (
                    <div className="mt-4">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alt">Descripción de la imagen (Alt text)</Label>
                <Input
                  id="alt"
                  value={formData.alt}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, alt: e.target.value }))
                  }
                  placeholder="Ej: Grupo disfrutando en el parque"
                  required
                />
                <p className="text-xs text-gray-500">
                  Describe lo que se ve en la imagen para accesibilidad
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="caption">Pie de foto (opcional)</Label>
                <Input
                  id="caption"
                  value={formData.caption}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      caption: e.target.value,
                    }))
                  }
                  placeholder="Ej: Diversión familiar garantizada"
                />
                <p className="text-xs text-gray-500">
                  Texto que aparecerá sobre la imagen
                </p>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setIsAddModalOpen(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAdd}
                  disabled={!formData.image || !formData.alt}
                  className="bg-park-green hover:bg-park-green/90"
                >
                  Agregar Imagen
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-5 h-5 text-park-blue" />
              <div>
                <p className="text-sm text-gray-600">Total de Imágenes</p>
                <p className="text-xl font-semibold">{groupImages.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Activas</p>
                <p className="text-xl font-semibold text-green-600">
                  {activeImages.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <EyeOff className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Inactivas</p>
                <p className="text-xl font-semibold text-gray-500">
                  {inactiveImages.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de imágenes activas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-green-500" />
            <span>Imágenes Activas ({activeImages.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeImages.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={image.image}
                    alt={image.alt}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleEdit(image)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toggleActive(image.id)}
                      >
                        <EyeOff className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              ¿Eliminar imagen?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. La imagen se
                              eliminará permanentemente del carrusel.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(image.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  {/* Caption overlay */}
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                      <p className="text-white text-xs text-center">
                        {image.caption}
                      </p>
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <p className="text-xs text-gray-600 font-medium mb-1">
                    {image.alt}
                  </p>
                  {image.caption && (
                    <p className="text-xs text-gray-500">{image.caption}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lista de imágenes inactivas */}
      {inactiveImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <EyeOff className="w-5 h-5 text-gray-400" />
              <span>Imágenes Inactivas ({inactiveImages.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inactiveImages.map((image) => (
                <Card
                  key={image.id}
                  className={cn("overflow-hidden opacity-60")}
                >
                  <div className="relative">
                    <img
                      src={image.image}
                      alt={image.alt}
                      className="w-full h-40 object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleEdit(image)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => toggleActive(image.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                ¿Eliminar imagen?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. La imagen se
                                eliminará permanentemente del carrusel.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(image.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    {/* Caption overlay */}
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                        <p className="text-white text-xs text-center">
                          {image.caption}
                        </p>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <p className="text-xs text-gray-600 font-medium mb-1">
                      {image.alt}
                    </p>
                    {image.caption && (
                      <p className="text-xs text-gray-500">{image.caption}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal de edición */}
      <Dialog
        open={!!editingImage}
        onOpenChange={(open) => !open && setEditingImage(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Imagen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Upload de imagen */}
            <div className="space-y-2">
              <Label>Imagen del Grupo</Label>
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
                      Haz clic para cambiar la imagen
                    </p>
                  </label>
                </div>
                {formData.image && (
                  <div className="mt-4">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-alt">
                Descripción de la imagen (Alt text)
              </Label>
              <Input
                id="edit-alt"
                value={formData.alt}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, alt: e.target.value }))
                }
                placeholder="Ej: Grupo disfrutando en el parque"
                required
              />
              <p className="text-xs text-gray-500">
                Describe lo que se ve en la imagen para accesibilidad
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-caption">Pie de foto (opcional)</Label>
              <Input
                id="edit-caption"
                value={formData.caption}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, caption: e.target.value }))
                }
                placeholder="Ej: Diversión familiar garantizada"
              />
              <p className="text-xs text-gray-500">
                Texto que aparecerá sobre la imagen
              </p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setEditingImage(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={!formData.image || !formData.alt}
                className="bg-park-blue hover:bg-park-blue/90"
              >
                Actualizar Imagen
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
