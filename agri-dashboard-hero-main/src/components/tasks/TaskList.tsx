import { useState } from 'react';
import { format } from 'date-fns';
import { Task } from '@/types';
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
  Check, 
  Clock
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import TaskForm from './TaskForm';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const TaskList = () => {
  const { t } = useTranslation();
  const { tasks, crops, addTask, updateTask, deleteTask, toggleTaskStatus, getCropById } = useFarm();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  const handleOpenEditDialog = (task: Task) => {
    setCurrentTask(task);
    setIsEditDialogOpen(true);
  };

  const handleAddTask = (taskData: Omit<Task, 'id'>) => {
    addTask(taskData);
    setIsAddDialogOpen(false);
  };

  const handleUpdateTask = (taskData: Omit<Task, 'id'>) => {
    if (currentTask) {
      updateTask({ ...taskData, id: currentTask.id });
      setIsEditDialogOpen(false);
      setCurrentTask(undefined);
    }
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const getCropName = (cropId?: string) => {
    if (!cropId) return '';
    const crop = getCropById(cropId);
    return crop ? crop.name : '';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">My Tasks</h3>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Task
        </Button>
      </div>

      {tasks.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500">{t('noTasks')}</p>
          <Button 
            variant="outline" 
            onClick={() => setIsAddDialogOpen(true)} 
            className="mt-4"
          >
            <Plus className="h-4 w-4 mr-2" /> {t('addTask')}
          </Button>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Status</TableHead>
                <TableHead>{t('taskTitle')}</TableHead>
                <TableHead>{t('taskDate')}</TableHead>
                <TableHead>Related Crop</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} className={task.completed ? "bg-gray-50" : ""}>
                  <TableCell>
                    <Checkbox 
                      checked={task.completed} 
                      onCheckedChange={() => toggleTaskStatus(task.id)}
                    />
                  </TableCell>
                  <TableCell className={cn("font-medium", task.completed && "line-through text-gray-500")}>
                    {task.title}
                  </TableCell>
                  <TableCell>{format(new Date(task.date), 'PP')}</TableCell>
                  <TableCell>
                    {task.cropId && getCropName(task.cropId) ? (
                      <Badge variant="outline">{getCropName(task.cropId)}</Badge>
                    ) : null}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleOpenEditDialog(task)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteTask(task.id)}
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
            <DialogTitle>{t('addTask')}</DialogTitle>
            <DialogDescription>
              Add a new task for your farming activities.
            </DialogDescription>
          </DialogHeader>
          <TaskForm 
            onSubmit={handleAddTask} 
            onCancel={() => setIsAddDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t('editTask')}</DialogTitle>
            <DialogDescription>
              Update your task information.
            </DialogDescription>
          </DialogHeader>
          {currentTask && (
            <TaskForm 
              initialData={currentTask}
              onSubmit={handleUpdateTask} 
              onCancel={() => setIsEditDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskList;
