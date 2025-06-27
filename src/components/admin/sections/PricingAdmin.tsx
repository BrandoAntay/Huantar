import { useState } from "react";
import { usePriceOptions } from "@/hooks/useAdminData";
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
  DollarSign,
  Palette,
} from "lucide-react";
import type { PriceOption } from "@/lib/adminStorage";

const colorOptions = [
  { value: "#054986", label: "Azul del Parque", preview: "#054986" },
  { value: "#00864b", label: "Verde del Parque", preview: "#00864b" },
  { value: "#f29200", label: "Naranja del Parque", preview: "#f29200" },
  { value: "#dc2626", label: "Rojo", preview: "#dc2626" },
  { value: "#7c3aed", label: "Púrpura", preview: "#7c3aed" },
  { value: "#059669", label: "Verde Esmeralda", preview: "#059669" },
  { value: "#ea580c", label: "Naranja Intenso", preview: "#ea580c" },
  { value: "#0891b2", label: "Azul Cielo", preview: "#0891b2" },
];

export const PricingAdmin = () => {
  const { priceOptions, add, update, remove, toggleActive } = usePriceOptions();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingOption, setEditingOption] = useState<PriceOption | null>(null);
  const [formData, setFormData] = useState({
    price: "",
    category: "",
    ageRange: "",
    description: "",
    color: "#054986",
  });

  const resetForm = () => {
    setFormData({
      price: "",
      category: "",
      ageRange: "",
      description: "",
      color: "#054986",
    });
  };

  const handleAdd = () => {
    if (!formData.price || !formData.category || !formData.ageRange) return;

    add({
      ...formData,
      price: parseFloat(formData.price),
      active: true,
    });

    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEdit = (option: PriceOption) => {
    setFormData({
      price: option.price.toString(),
      category: option.category,
      ageRange: option.ageRange,
      description: option.description || "",
      color: option.color,
    });
    setEditingOption(option);
  };

  const handleUpdate = () => {
    if (
      !editingOption ||
      !formData.price ||
      !formData.category ||
      !formData.ageRange
    )
      return;

    update(editingOption.id, {
      ...formData,
      price: parseFloat(formData.price),
    });
    resetForm();
    setEditingOption(null);
  };

  const handleDelete = (id: number) => {
    remove(id);
  };

  const activeOptions = priceOptions.filter((option) => option.active);
  const inactiveOptions = priceOptions.filter((option) => !option.active);

  const formatPrice = (price: number) => {
    return `S/ ${price.toFixed(1)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-park-blue">
            Costos de Entrada
          </h1>
          <p className="text-gray-600 mt-1">
            Gestiona los precios y categorías de entrada al parque
          </p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-park-green hover:bg-park-green/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Precio
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agregar Nueva Categoría de Precio</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Precio (S/)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    placeholder="10.0"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    placeholder="Ej: Adultos"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ageRange">Edad</Label>
                <Input
                  id="ageRange"
                  value={formData.ageRange}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ageRange: e.target.value,
                    }))
                  }
                  placeholder="Ej: 18 a 60 años"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción (opcional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Descripción de la categoría"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Color del círculo</Label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((colorOption) => (
                    <button
                      key={colorOption.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          color: colorOption.value,
                        }))
                      }
                      className={cn(
                        "flex items-center space-x-2 p-2 rounded border-2 transition-all",
                        formData.color === colorOption.value
                          ? "border-gray-400 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300",
                      )}
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: colorOption.preview }}
                      />
                      <span className="text-xs text-gray-600 truncate">
                        {colorOption.label}
                      </span>
                    </button>
                  ))}
                </div>
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
                    !formData.price || !formData.category || !formData.ageRange
                  }
                  className="bg-park-green hover:bg-park-green/90"
                >
                  Agregar Precio
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
              <DollarSign className="w-5 h-5 text-park-blue" />
              <div>
                <p className="text-sm text-gray-600">Total de Precios</p>
                <p className="text-xl font-semibold">{priceOptions.length}</p>
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
                  {activeOptions.length}
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
                  {inactiveOptions.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de precios activos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-green-500" />
            <span>Precios Activos ({activeOptions.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeOptions.map((option) => (
              <Card key={option.id} className="overflow-hidden relative">
                <CardContent className="p-4 text-center">
                  {/* Círculo con el precio */}
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                    style={{ backgroundColor: option.color }}
                  >
                    {formatPrice(option.price)}
                  </div>

                  {/* Información */}
                  <h4 className="font-semibold text-sm mb-1">
                    {option.category}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    {option.ageRange}
                  </p>
                  {option.description && (
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {option.description}
                    </p>
                  )}

                  {/* Botones de acción */}
                  <div className="flex justify-center space-x-1 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(option)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleActive(option.id)}
                    >
                      <EyeOff className="w-3 h-3" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar precio?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. El precio se
                            eliminará permanentemente.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(option.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lista de precios inactivos */}
      {inactiveOptions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <EyeOff className="w-5 h-5 text-gray-400" />
              <span>Precios Inactivos ({inactiveOptions.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inactiveOptions.map((option) => (
                <Card
                  key={option.id}
                  className={cn("overflow-hidden relative opacity-60")}
                >
                  <CardContent className="p-4 text-center">
                    {/* Círculo con el precio */}
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold shadow-lg grayscale"
                      style={{ backgroundColor: option.color }}
                    >
                      {formatPrice(option.price)}
                    </div>

                    {/* Información */}
                    <h4 className="font-semibold text-sm mb-1">
                      {option.category}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      {option.ageRange}
                    </p>
                    {option.description && (
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {option.description}
                      </p>
                    )}

                    {/* Botones de acción */}
                    <div className="flex justify-center space-x-1 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(option)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleActive(option.id)}
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              ¿Eliminar precio?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. El precio se
                              eliminará permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(option.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal de edición */}
      <Dialog
        open={!!editingOption}
        onOpenChange={(open) => !open && setEditingOption(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Precio</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-price">Precio (S/)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  placeholder="10.0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-category">Categoría</Label>
                <Input
                  id="edit-category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  placeholder="Ej: Adultos"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-ageRange">Edad</Label>
              <Input
                id="edit-ageRange"
                value={formData.ageRange}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ageRange: e.target.value,
                  }))
                }
                placeholder="Ej: 18 a 60 años"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Descripción (opcional)</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Descripción de la categoría"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Color del círculo</Label>
              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map((colorOption) => (
                  <button
                    key={colorOption.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        color: colorOption.value,
                      }))
                    }
                    className={cn(
                      "flex items-center space-x-2 p-2 rounded border-2 transition-all",
                      formData.color === colorOption.value
                        ? "border-gray-400 bg-gray-50"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: colorOption.preview }}
                    />
                    <span className="text-xs text-gray-600 truncate">
                      {colorOption.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setEditingOption(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={
                  !formData.price || !formData.category || !formData.ageRange
                }
                className="bg-park-blue hover:bg-park-blue/90"
              >
                Actualizar Precio
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
