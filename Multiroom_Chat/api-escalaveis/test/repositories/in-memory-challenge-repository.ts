import { Challenge } from '../../src/domain/entities/challenge';
import { ChallengeRepository } from './../../src/application/repositories/challengeRepository';

export class InMemoryChallengeRepository implements ChallengeRepository{
   
public challenges :Challenge[] =[]

    async findById(id: string): Promise<Challenge | null> {
        return this.challenges.find(challenge=>challenge.id === id) ?? null
    }

}