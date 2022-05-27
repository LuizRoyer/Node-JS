import { InMemoryChallengeRepository } from './../../../test/repositories/in-memory-challenge-repository';
import { InMemoryStudent } from './../../../test/repositories/in-memory-student-repository';
import { CreateChallengeSubmission } from './create-challenge-submission';

describe('create challenge submission ', async () => {
    it('should success at create', async () => {

        const studentRepository = new InMemoryStudent()
        const challengeReposirory = new InMemoryChallengeRepository()

        const server = new CreateChallengeSubmission(studentRepository, challengeReposirory)

        const response = await server.execute({
            studentId: '2101',
            challengeId: '2122112'
        })

        expect(response).toBeTruthy()
    })
})