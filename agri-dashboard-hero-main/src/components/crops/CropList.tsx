import { useState } from 'react';
import { format } from 'date-fns';
import { Crop } from '@/types';
import { useFarm } from '@/context/FarmContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Save 
} from 'lucide-react';
import CropForm from './CropForm';

const CropList = () => {
  const { t } = useTranslation();
  const { crops, addCrop, updateCrop, deleteCrop } = useFarm();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCrop, setCurrentCrop] = useState<Crop | undefined>(undefined);

  const handleOpenEditDialog = (crop: Crop) => {
    setCurrentCrop(crop);
    setIsEditDialogOpen(true);
  };

  const handleAddCrop = (cropData: Omit<Crop, 'id'>) => {
    addCrop(cropData);
    setIsAddDialogOpen(false);
  };

  const handleUpdateCrop = (cropData: Omit<Crop, 'id'>) => {
    if (currentCrop) {
      updateCrop({ ...cropData, id: currentCrop.id });
      setIsEditDialogOpen(false);
      setCurrentCrop(undefined);
    }
  };

  const handleDeleteCrop = (id: string) => {
    if (confirm('Are you sure you want to delete this crop?')) {
      deleteCrop(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">My Crops</h3>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Crop
        </Button>
      </div>

      {crops.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500">{t('noCrops')}</p>
          <Button 
            variant="outline" 
            onClick={() => setIsAddDialogOpen(true)} 
            className="mt-4"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Crop
          </Button>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('cropName')}</TableHead>
                <TableHead>{t('cropType')}</TableHead>
                <TableHead>{t('plantingDate')}</TableHead>
                <TableHead>{t('harvestDate')}</TableHead>
                <TableHead>{t('cropArea')}</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crops.map((crop) => (
                <TableRow key={crop.id}>
                  <TableCell className="font-medium">{crop.name}</TableCell>
                  <TableCell>{crop.type}</TableCell>
                  <TableCell>{format(new Date(crop.plantingDate), 'PP')}</TableCell>
                  <TableCell>{format(new Date(crop.harvestDate), 'PP')}</TableCell>
                  <TableCell>{crop.area} sq m</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleOpenEditDialog(crop)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteCrop(crop.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t('addCrop')}</DialogTitle>
            <DialogDescription>
              Add a new crop to your farm management.
            </DialogDescription>
          </DialogHeader>
          <CropForm 
            onSubmit={handleAddCrop} 
            onCancel={() => setIsAddDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t('editCrop')}</DialogTitle>
            <DialogDescription>
              Update your crop information.
            </DialogDescription>
          </DialogHeader>
          {currentCrop && (
            <CropForm 
              initialData={currentCrop}
              onSubmit={handleUpdateCrop} 
              onCancel={() => setIsEditDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CropList;
