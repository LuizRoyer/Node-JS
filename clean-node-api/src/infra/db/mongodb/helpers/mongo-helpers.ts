import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
    client: null as MongoClient,
    url: null as string,

    async connect (url: string) {
        this.url = url
        this.client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    },

    async disconnect () {
        await this.client.close()
        this.client = null
    },

    async getCollection (name: string): Promise<Collection> {
        if (!this.client?.isConnected()) {
            await this.connect(this.url)
        }
        return this.client.db().collection(name)
    },
    map: (data: any): any => {
        const { _id, ...collectionWithoutId } = data

        return Object.assign({}, collectionWithoutId, { id: _id })
    },

    mapCollection: (collection: any[]): any[] => {
        return collection.map(c => MongoHelper.map(c))
    }
}
