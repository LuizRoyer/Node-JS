import { AddAccoutParams } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models/account'

export interface AddAccountRepository {
    add(accountData: AddAccoutParams): Promise<AccountModel>
}
