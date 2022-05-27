import crypto from 'crypto'

export abstract class Entity<T> {
    id: string
    props: T
 

    constructor(props: T, id?: string) {
        this.id = id ?? crypto.randomUUID()
        this.props = props
    }
}