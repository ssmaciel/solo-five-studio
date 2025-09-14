import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserPlus, Target, TrendingUp } from 'lucide-react';

interface EmptyStateProps {
  onAddStudent: () => void;
}

export function EmptyState({ onAddStudent }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Card className="max-w-md w-full p-8 text-center shadow-card animate-slide-up">
        <div className="gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <UserPlus className="h-8 w-8 text-white" />
        </div>
        
        <h3 className="text-xl font-semibold mb-2">Comece Sua Jornada</h3>
        <p className="text-muted-foreground mb-6">
          Adicione até 5 alunos e transforme suas rotinas de treino e dieta 
          com o Solo-5.
        </p>

        <div className="space-y-3 mb-6 text-sm">
          <div className="flex items-center space-x-3 text-left">
            <div className="bg-accent/10 p-2 rounded-lg">
              <Target className="h-4 w-4 text-accent" />
            </div>
            <span>Gerencie objetivos individuais</span>
          </div>
          <div className="flex items-center space-x-3 text-left">
            <div className="bg-secondary/10 p-2 rounded-lg">
              <TrendingUp className="h-4 w-4 text-secondary" />
            </div>
            <span>Acompanhe progresso em tempo real</span>
          </div>
        </div>

        <Button 
          onClick={onAddStudent}
          variant="hero"
          size="lg"
          className="w-full"
        >
          Adicionar Primeiro Aluno
        </Button>
      </Card>
    </div>
  );
}