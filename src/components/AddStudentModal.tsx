import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Student } from '@/types/student';

interface AddStudentModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (studentData: Omit<Student, 'id' | 'joinDate' | 'adherenceRate' | 'status'>) => Promise<void>;
  isLoading: boolean;
  canAddStudent: boolean;
  remainingSlots: number;
}

export function AddStudentModal({ 
  open, 
  onClose, 
  onAdd, 
  isLoading, 
  canAddStudent, 
  remainingSlots 
}: AddStudentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    goal: '',
    currentWeight: '',
    targetWeight: '',
    height: ''
  });

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canAddStudent) {
      toast({
        title: "Limite atingido",
        description: "Você já tem o máximo de 5 alunos.",
        variant: "destructive"
      });
      return;
    }

    try {
      await onAdd({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: parseInt(formData.age),
        goal: formData.goal,
        currentWeight: formData.currentWeight ? parseFloat(formData.currentWeight) : undefined,
        targetWeight: formData.targetWeight ? parseFloat(formData.targetWeight) : undefined,
        height: formData.height ? parseFloat(formData.height) : undefined
      });

      toast({
        title: "Aluno adicionado!",
        description: `${formData.name} foi adicionado com sucesso.`
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        goal: '',
        currentWeight: '',
        targetWeight: '',
        height: ''
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao adicionar aluno",
        description: error instanceof Error ? error.message : "Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!canAddStudent) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Limite Atingido</DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <div className="gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">5/5</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Máximo de Alunos Atingido</h3>
            <p className="text-muted-foreground mb-6">
              Você já tem 5 alunos cadastrados. Para adicionar um novo aluno, 
              primeiro remova um aluno existente.
            </p>
            <Button onClick={onClose} variant="outline">
              Entendi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Aluno ({remainingSlots} vagas restantes)</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                placeholder="Ex: João Silva"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Idade *</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                required
                placeholder="Ex: 28"
                min="16"
                max="80"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              placeholder="joao@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
              placeholder="(11) 99999-9999"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Objetivo *</Label>
            <Textarea
              id="goal"
              value={formData.goal}
              onChange={(e) => handleInputChange('goal', e.target.value)}
              required
              placeholder="Ex: Perda de peso e definição muscular"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Altura (cm)</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                placeholder="180"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentWeight">Peso atual (kg)</Label>
              <Input
                id="currentWeight"
                type="number"
                step="0.1"
                value={formData.currentWeight}
                onChange={(e) => handleInputChange('currentWeight', e.target.value)}
                placeholder="75.5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetWeight">Peso meta (kg)</Label>
              <Input
                id="targetWeight"
                type="number"
                step="0.1"
                value={formData.targetWeight}
                onChange={(e) => handleInputChange('targetWeight', e.target.value)}
                placeholder="70.0"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="flex-1"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant="hero" 
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? 'Adicionando...' : 'Adicionar Aluno'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}