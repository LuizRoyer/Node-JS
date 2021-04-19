export interface UpdateAccessTokenRepositoy {
    updateAccessToken (id: string, token: string): Promise<void>
}
