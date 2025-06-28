import { useState } from "react";
import { useHeroSlides } from "@/hooks/useAdminData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Camera,
  Sparkles,
  TrendingUp,
  Users,
  Activity,
  ImageIcon,
  Play,
  Pause,
} from "lucide-react";
import type { HeroSlide } from "@/lib/adminStorage";

export const HeroCarouselAdmin = () => {
  const { slides, add, update, remove, toggleActive } = useHeroSlides();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [formData, setFormData] = useState({
    image: "",
    subtitle: "",
    title: "",
    description: "",
  });

  const resetForm = () => {
    setFormData({
      image: "",
      subtitle: "",
      title: "",
      description: "",
    });
  };

  const handleAdd = () => {
    if (!formData.image || !formData.title) return;

    add({
      ...formData,
      active: true,
    });

    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEdit = (slide: HeroSlide) => {
    setFormData({
      image: slide.image,
      subtitle: slide.subtitle,
      title: slide.title,
      description: slide.description,
    });
    setEditingSlide(slide);
  };

  const handleUpdate = () => {
    if (!editingSlide || !formData.image || !formData.title) return;

    update(editingSlide.id, formData);
    resetForm();
    setEditingSlide(null);
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

  const activeSlides = slides.filter((slide) => slide.active);
  const inactiveSlides = slides.filter((slide) => !slide.active);

  return (
    <div className="space-y-8 p-1">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
                  <Camera className="h-6 w-6" />
                </div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-sm">
                  <Sparkles className="mr-1 inline h-4 w-4" />
                  Carrusel Principal
                </div>
              </div>
              <h1 className="text-4xl font-bold">Gestión del Carrusel</h1>
              <p className="text-lg text-white/80">
                Crea experiencias visuales impactantes para tu homepage
              </p>
            </div>

            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-white/90 shadow-xl"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Crear Slide
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 p-2 text-white">
                      <ImageIcon className="h-5 w-5" />
                    </div>
                    <span>Crear Nuevo Slide</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Upload Area */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">
                      Imagen del Slide
                    </Label>
                    <div className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition-all hover:border-blue-400 hover:bg-blue-50">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 cursor-pointer opacity-0"
                        id="image-upload-add"
                      />
                      <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200">
                          <Upload className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                          Arrastra tu imagen aquí
                        </h3>
                        <p className="text-sm text-gray-500">
                          O haz clic para seleccionar desde tu dispositivo
                        </p>
                        <p className="mt-2 text-xs text-gray-400">
                          Formatos: JPG, PNG, WebP (máx. 10MB)
                        </p>
                      </div>
                      {formData.image && (
                        <div className="mt-6">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="h-48 w-full rounded-xl object-cover shadow-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label
                        htmlFor="subtitle"
                        className="text-base font-semibold"
                      >
                        Subtítulo
                      </Label>
                      <Input
                        id="subtitle"
                        value={formData.subtitle}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            subtitle: e.target.value,
                          }))
                        }
                        placeholder="Ej: Parque Zonal"
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="title"
                        className="text-base font-semibold"
                      >
                        Título Principal
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder="Ej: CHAVÍN DE HUÁNTAR"
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="description"
                      className="text-base font-semibold"
                    >
                      Descripción
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
                      placeholder="Describe la experiencia que ofrece este slide..."
                      rows={4}
                      className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        resetForm();
                        setIsAddModalOpen(false);
                      }}
                      className="rounded-xl"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleAdd}
                      disabled={!formData.image || !formData.title}
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Crear Slide
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-white/10"></div>
        <div className="absolute -top-8 right-32 h-16 w-16 rounded-full bg-white/10"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Total Slides
                </p>
                <p className="text-3xl font-bold text-blue-900">
                  {slides.length}
                </p>
              </div>
              <div className="rounded-full bg-blue-500 p-3">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-100 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Activos</p>
                <p className="text-3xl font-bold text-green-900">
                  {activeSlides.length}
                </p>
              </div>
              <div className="rounded-full bg-green-500 p-3">
                <Play className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-orange-50 to-amber-100 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Inactivos</p>
                <p className="text-3xl font-bold text-orange-900">
                  {inactiveSlides.length}
                </p>
              </div>
              <div className="rounded-full bg-orange-500 p-3">
                <Pause className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-purple-50 to-violet-100 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">
                  Rendimiento
                </p>
                <p className="text-3xl font-bold text-purple-900">95%</p>
              </div>
              <div className="rounded-full bg-purple-500 p-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Slides */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-green-100 p-2">
              <Eye className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Slides Activos
              </h2>
              <p className="text-gray-600">
                Estos slides se muestran en el carrusel principal
              </p>
            </div>
          </div>
          <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            {activeSlides.length} activos
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeSlides.map((slide, index) => (
            <Card
              key={slide.id}
              className="group overflow-hidden border-0 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Position indicator */}
                <div className="absolute top-3 left-3 rounded-full bg-black/50 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">
                  #{index + 1}
                </div>

                {/* Action buttons */}
                <div className="absolute top-3 right-3 flex space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEdit(slide)}
                    className="h-8 w-8 rounded-full bg-white/90 p-0 hover:bg-white"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => toggleActive(slide.id)}
                    className="h-8 w-8 rounded-full bg-white/90 p-0 hover:bg-white"
                  >
                    <EyeOff className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 w-8 rounded-full p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar slide?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. El slide se
                          eliminará permanentemente del carrusel.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl">
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(slide.id)}
                          className="rounded-xl bg-red-600 hover:bg-red-700"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-xs font-medium opacity-80">
                    {slide.subtitle}
                  </p>
                  <h3 className="text-lg font-bold">{slide.title}</h3>
                </div>
              </div>

              <CardContent className="p-4">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {slide.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-medium text-green-600">
                      Activo
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(slide)}
                    className="h-8 text-xs hover:bg-blue-50 hover:text-blue-600"
                  >
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Inactive Slides */}
      {inactiveSlides.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-gray-100 p-2">
                <EyeOff className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Slides Inactivos
                </h2>
                <p className="text-gray-600">
                  Estos slides están ocultos del carrusel
                </p>
              </div>
            </div>
            <div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
              {inactiveSlides.length} inactivos
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inactiveSlides.map((slide) => (
              <Card
                key={slide.id}
                className="group overflow-hidden border-0 opacity-75 shadow-lg transition-all hover:opacity-100 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-48 w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>

                  {/* Action buttons */}
                  <div className="absolute top-3 right-3 flex space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(slide)}
                      className="h-8 w-8 rounded-full bg-white/90 p-0 hover:bg-white"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => toggleActive(slide.id)}
                      className="h-8 w-8 rounded-full bg-white/90 p-0 hover:bg-white"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 w-8 rounded-full p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-2xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar slide?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. El slide se
                            eliminará permanentemente.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-xl">
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(slide.id)}
                            className="rounded-xl bg-red-600 hover:bg-red-700"
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-xs font-medium opacity-80">
                      {slide.subtitle}
                    </p>
                    <h3 className="text-lg font-bold">{slide.title}</h3>
                  </div>
                </div>

                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {slide.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                      <span className="text-xs font-medium text-gray-500">
                        Inactivo
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleActive(slide.id)}
                      className="h-8 text-xs hover:bg-green-50 hover:text-green-600"
                    >
                      Activar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog
        open={!!editingSlide}
        onOpenChange={(open) => !open && setEditingSlide(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 p-2 text-white">
                <Edit className="h-5 w-5" />
              </div>
              <span>Editar Slide</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Upload Area */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Imagen del Slide
              </Label>
              <div className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition-all hover:border-blue-400 hover:bg-blue-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 cursor-pointer opacity-0"
                  id="image-upload-edit"
                />
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Cambiar imagen
                  </h3>
                  <p className="text-sm text-gray-500">
                    Haz clic para seleccionar una nueva imagen
                  </p>
                </div>
                {formData.image && (
                  <div className="mt-6">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-48 w-full rounded-xl object-cover shadow-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Label
                  htmlFor="edit-subtitle"
                  className="text-base font-semibold"
                >
                  Subtítulo
                </Label>
                <Input
                  id="edit-subtitle"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      subtitle: e.target.value,
                    }))
                  }
                  placeholder="Ej: Parque Zonal"
                  className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="edit-title" className="text-base font-semibold">
                  Título Principal
                </Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Ej: CHAVÍN DE HUÁNTAR"
                  className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="edit-description"
                className="text-base font-semibold"
              >
                Descripción
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
                placeholder="Describe la experiencia que ofrece este slide..."
                rows={4}
                className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setEditingSlide(null);
                }}
                className="rounded-xl"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={!formData.image || !formData.title}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Actualizar Slide
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
