import { useState } from "react";
import { useAnimals } from "@/hooks/useAdminData";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  PawPrint,
} from "lucide-react";
import type { Animal } from "@/lib/adminStorage";

export const ZooAdmin = () => {
  const { animals, add, update, remove, toggleActive } = useAnimals();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    scientificName: "",
    description: "",
    image: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      scientificName: "",
      description: "",
      image: "",
    });
  };

  const handleAdd = () => {
    if (!formData.name || !formData.scientificName || !formData.image) return;

    add({
      ...formData,
      active: true,
    });

    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEdit = (animal: Animal) => {
    setFormData({
      name: animal.name,
      scientificName: animal.scientificName,
      description: animal.description,
      image: animal.image,
    });
    setEditingAnimal(animal);
  };

  const handleUpdate = () => {
    if (
      !editingAnimal ||
      !formData.name ||
      !formData.scientificName ||
      !formData.image
    )
      return;

    update(editingAnimal.id, formData);
    resetForm();
    setEditingAnimal(null);
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

  const activeAnimals = animals.filter((animal) => animal.active);
  const inactiveAnimals = animals.filter((animal) => !animal.active);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-park-blue">Zoo y Animales</h1>
          <p className="text-gray-600 mt-1">
            Gestiona los animales de la galería del zoológico
          </p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-park-green hover:bg-park-green/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Animal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Animal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Upload de imagen */}
              <div className="space-y-2">
                <Label>Imagen del Animal</Label>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre común</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Ej: León Africano"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scientificName">Nombre científico</Label>
                  <Input
                    id="scientificName"
                    value={formData.scientificName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        scientificName: e.target.value,
                      }))
                    }
                    placeholder="Ej: Panthera leo"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Breve descripción del animal
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Descripción del animal, sus características y hábitat"
                  rows={4}
                />
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
                  disabled={
                    !formData.name ||
                    !formData.scientificName ||
                    !formData.image
                  }
                  className="bg-park-green hover:bg-park-green/90"
                >
                  Agregar Animal
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
              <PawPrint className="w-5 h-5 text-park-blue" />
              <div>
                <p className="text-sm text-gray-600">Total de Animales</p>
                <p className="text-xl font-semibold">{animals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Activos</p>
                <p className="text-xl font-semibold text-green-600">
                  {activeAnimals.length}
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
                <p className="text-sm text-gray-600">Inactivos</p>
                <p className="text-xl font-semibold text-gray-500">
                  {inactiveAnimals.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de animales activos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-green-500" />
            <span>Animales Activos ({activeAnimals.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeAnimals.map((animal) => (
              <Card key={animal.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={animal.image}
                    alt={animal.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleEdit(animal)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toggleActive(animal.id)}
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
                              ¿Eliminar animal?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. El animal se
                              eliminará permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(animal.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h4 className="font-semibold text-sm mb-1">{animal.name}</h4>
                  <p className="text-xs text-gray-600 mb-2 italic">
                    {animal.scientificName}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {animal.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lista de animales inactivos */}
      {inactiveAnimals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <EyeOff className="w-5 h-5 text-gray-400" />
              <span>Animales Inactivos ({inactiveAnimals.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inactiveAnimals.map((animal) => (
                <Card
                  key={animal.id}
                  className={cn("overflow-hidden opacity-60")}
                >
                  <div className="relative">
                    <img
                      src={animal.image}
                      alt={animal.name}
                      className="w-full h-32 object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleEdit(animal)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => toggleActive(animal.id)}
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
                                ¿Eliminar animal?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. El animal se
                                eliminará permanentemente.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(animal.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-semibold text-sm mb-1">
                      {animal.name}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2 italic">
                      {animal.scientificName}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {animal.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal de edición */}
      <Dialog
        open={!!editingAnimal}
        onOpenChange={(open) => !open && setEditingAnimal(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Animal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Upload de imagen */}
            <div className="space-y-2">
              <Label>Imagen del Animal</Label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nombre común</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Ej: León Africano"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-scientificName">Nombre científico</Label>
                <Input
                  id="edit-scientificName"
                  value={formData.scientificName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      scientificName: e.target.value,
                    }))
                  }
                  placeholder="Ej: Panthera leo"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">
                Breve descripción del animal
              </Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Descripción del animal, sus características y hábitat"
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setEditingAnimal(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={
                  !formData.name || !formData.scientificName || !formData.image
                }
                className="bg-park-blue hover:bg-park-blue/90"
              >
                Actualizar Animal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
