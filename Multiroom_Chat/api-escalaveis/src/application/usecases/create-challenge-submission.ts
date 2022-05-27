import { ChallengeRepository } from './../repositories/challengeRepository';
import { StudentRepository } from '../repositories/studentRepository';
import { Submission } from '../../domain/entities/submission';

type CreateChallengeSubmissionRequest = {
    studentId: string
    challengeId: string
}

export class CreateChallengeSubmission {
    constructor(
        private studentRepository: StudentRepository,
        private challengeRepository: ChallengeRepository) { }

    async execute({ studentId, challengeId }: CreateChallengeSubmissionRequest) {

        if (!await this.studentRepository.findById(studentId))
            throw new Error('Student not found')

        if (!await this.challengeRepository.findById(challengeId))
            throw new Error('Challenge not found')


        const submission = Submission.create({
            studentId, challengeId
        })

        return submission
    }
}