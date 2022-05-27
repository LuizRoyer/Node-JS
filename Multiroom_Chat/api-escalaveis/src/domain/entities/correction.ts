import { Entity } from "../../core/domain/entity";


type CorrectionProps = {
    grade: number
    submission: string
    createdAt: Date
}

export class Correction extends Entity<CorrectionProps> {
    private constructor(props: CorrectionProps, id?: string) {
        super(props, id)
    }

    static create(props: CorrectionProps, id?: string) {

        if (props.grade < 0 || props.grade > 10) {
            throw new Error('Invalid Grade')
        }

        const correction = new Correction(props, id)

        return correction
    }
}