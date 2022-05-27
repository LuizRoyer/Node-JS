import { Student } from '../../src/domain/entities/student';
import { StudentRepository } from './../../src/application/repositories/studentRepository';

export class InMemoryStudent implements StudentRepository {
    public students: Student[] = []

    async findById(id: string): Promise<Student | null> {
        return this.students.find(student => student.id === id) ?? null
    }

}