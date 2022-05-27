import { Entity } from "../../core/domain/entity";


type SubmissionProps = {
    challengeId: string
    studentId: string
    createdAt?: Date
}

export class Submission extends Entity<SubmissionProps> {
    private constructor(props: SubmissionProps, id?: string) {
        super(props, id)
    }

    static create(props: SubmissionProps, id?: string) {

        props.createdAt ??= new Date()
        const submission = new Submission(props, id)

        return submission
    }
}