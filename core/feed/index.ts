import {
  createFilter,
  createSyncMap,
  type Filter,
  type FilterStore,
  syncMapTemplate
} from '@logux/client'
import { nanoid } from 'nanoid'

import { getClient } from '../client/index.js'
import type { LoaderName } from '../loader/index.js'

export type FeedValue = {
  loader: LoaderName
  title: string
  url: string
}

export const Feed = syncMapTemplate<FeedValue>('feeds', {
  offline: true,
  remote: false
})

export function feedsStore(
  filter: Filter<FeedValue> = {}
): FilterStore<FeedValue> {
  return createFilter(getClient(), Feed, filter)
}

export async function addFeed(
  fields: FeedValue | (FeedValue & { id: string })
): Promise<void> {
  return createSyncMap(getClient(), Feed, {
    id: nanoid(),
    ...fields
  })
}
