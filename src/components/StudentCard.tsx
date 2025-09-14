import { Student } from '@/types/student';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Phone, Mail, TrendingUp, Clock } from 'lucide-react';
import avatarPlaceholder from '@/assets/avatar-placeholder.jpg';

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onRemove: (id: string) => void;
}

export function StudentCard({ student, onEdit, onRemove }: StudentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-accent text-accent-foreground';
      case 'inactive': return 'bg-muted text-muted-foreground';
      case 'pending': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'pending': return 'Pendente';
      default: return 'Desconhecido';
    }
  };

  const daysSinceCheckIn = student.lastCheckIn 
    ? Math.floor((new Date().getTime() - student.lastCheckIn.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <Card className="p-6 shadow-card hover:shadow-elevated transition-smooth animate-slide-up">
      <div className="space-y-4">
        {/* Header with Avatar and Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback className="gradient-primary text-white font-semibold">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{student.name}</h3>
              <p className="text-sm text-muted-foreground">{student.age} anos</p>
            </div>
          </div>
          <Badge className={getStatusColor(student.status)}>
            {getStatusText(student.status)}
          </Badge>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{student.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{student.phone}</span>
          </div>
        </div>

        {/* Goal */}
        <div className="bg-muted/50 p-3 rounded-lg">
          <p className="text-sm font-medium text-muted-foreground mb-1">Objetivo:</p>
          <p className="text-sm">{student.goal}</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-accent" />
            <div>
              <p className="font-medium">{student.adherenceRate}%</p>
              <p className="text-xs text-muted-foreground">Adesão</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-primary" />
            <div>
              <p className="font-medium">
                {student.joinDate.toLocaleDateString('pt-BR')}
              </p>
              <p className="text-xs text-muted-foreground">Início</p>
            </div>
          </div>
        </div>

        {/* Last Check-in */}
        {student.lastCheckIn && (
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Último check-in: há {daysSinceCheckIn} dia{daysSinceCheckIn !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(student)}
            className="flex-1"
          >
            Editar
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => onRemove(student.id)}
            className="flex-1"
          >
            Remover
          </Button>
        </div>
      </div>
    </Card>
  );
}