import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStudents } from '@/hooks/useStudents';
import { StudentCard } from '@/components/StudentCard';
import { StudentModal } from '@/components/StudentModal';
import { StatsGrid } from '@/components/StatsGrid';
import { EmptyState } from '@/components/EmptyState';
import { useToast } from '@/hooks/use-toast';
import { Student } from '@/types/student';
import { Plus, Users, Dumbbell, BarChart3 } from 'lucide-react';
import fitnessHero from '@/assets/fitness-hero.jpg';

const Index = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const { 
    students, 
    isLoading, 
    canAddStudent, 
    remainingSlots, 
    maxStudents,
    addStudent, 
    updateStudent, 
    removeStudent, 
    getStudentStats 
  } = useStudents();
  
  const { toast } = useToast();
  const stats = getStudentStats();

  const handleAddStudent = async (studentData: Omit<Student, 'id' | 'joinDate' | 'adherenceRate' | 'status'>) => {
    await addStudent(studentData);
  };

  const handleUpdateStudent = async (id: string, updates: Partial<Student>) => {
    await updateStudent(id, updates);
    toast({
      title: "Aluno atualizado",
      description: "Informações atualizadas com sucesso!"
    });
    setEditingStudent(null);
  };

  const handleRemoveStudent = async (id: string) => {
    const student = students.find(s => s.id === id);
    if (student) {
      await removeStudent(id);
      toast({
        title: "Aluno removido",
        description: `${student.name} foi removido com sucesso.`
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(135deg, hsl(18 95% 55% / 0.9) 0%, hsl(0 75% 60% / 0.9) 100%), url(${fitnessHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
              Solo-5 Personal Trainer
            </h1>
            <p className="text-xl mb-8 opacity-90 animate-slide-up" style={{ animationDelay: '200ms' }}>
              Transforme até 5 vidas com treinos e dietas personalizados
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <Button 
                variant="hero"
                size="lg"
                onClick={() => setShowAddModal(true)}
                disabled={!canAddStudent}
                className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30"
              >
                <Plus className="h-5 w-5 mr-2" />
                {canAddStudent ? 'Adicionar Aluno' : 'Limite Atingido (5/5)'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-8 relative z-10">
        {/* Stats Grid */}
        <StatsGrid stats={stats} maxStudents={maxStudents} />

        {/* Main Content */}
        {students.length === 0 ? (
          <EmptyState onAddStudent={() => setShowAddModal(true)} />
        ) : (
          <>
            {/* Students Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">Meus Alunos ({students.length}/5)</h2>
                </div>
                <Button 
                  variant="default"
                  onClick={() => setShowAddModal(true)}
                  disabled={!canAddStudent}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {canAddStudent ? 'Novo Aluno' : `Limite: ${maxStudents}`}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map((student, index) => (
                  <div 
                    key={student.id} 
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <StudentCard
                      student={student}
                      onEdit={setEditingStudent}
                      onRemove={handleRemoveStudent}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="p-6 shadow-card hover:shadow-elevated transition-smooth cursor-pointer animate-slide-up">
                <div className="flex items-center space-x-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Dumbbell className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Templates de Treino</h3>
                    <p className="text-muted-foreground text-sm">
                      Crie e gerencie rotinas personalizadas
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-card hover:shadow-elevated transition-smooth cursor-pointer animate-slide-up">
                <div className="flex items-center space-x-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Relatórios</h3>
                    <p className="text-muted-foreground text-sm">
                      Analise o progresso e adesão
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>

      {/* Add Student Modal */}
      <StudentModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddStudent}
        isLoading={isLoading}
        canAddStudent={canAddStudent}
        remainingSlots={remainingSlots}
      />

      {/* Edit Student Modal */}
      <StudentModal
        open={!!editingStudent}
        onClose={() => setEditingStudent(null)}
        onAdd={handleAddStudent}
        onUpdate={handleUpdateStudent}
        isLoading={isLoading}
        canAddStudent={canAddStudent}
        remainingSlots={remainingSlots}
        editingStudent={editingStudent}
      />
    </div>
  );
};

export default Index;
