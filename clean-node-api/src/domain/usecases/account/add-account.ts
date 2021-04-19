import { AccountModel } from '@/domain/models/account'

export type AddAccoutParams = Omit<AccountModel, 'id'>

export interface AddAccount {
    add (account: AddAccoutParams): Promise<AccountModel>
}
