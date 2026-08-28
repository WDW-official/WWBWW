import { MongoClient, type Db } from 'mongodb'

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || 'woodworks_wale'

export function hasMongoConfig() {
  return Boolean(uri)
}

export async function getDb(): Promise<Db> {
  if (!uri) {
    throw new Error('MONGODB_URI is not configured')
  }

  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }

  const client = await global._mongoClientPromise
  return client.db(dbName)
}
