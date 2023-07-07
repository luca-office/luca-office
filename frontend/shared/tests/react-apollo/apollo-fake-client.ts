import {ApolloLink, Observable, ApolloClient, InMemoryCache} from "@apollo/client"

const createMockLink = (options: any) => {
  return new ApolloLink(
    () =>
      new Observable(observer => {
        if (!options.fail) {
          observer.next({
            data: options.resolveWith
          })
          observer.complete()
        } else {
          observer.error(options.failWith)
        }
      })
  )
}

export const makeFakeClient = (options: any) =>
  new ApolloClient({
    link: createMockLink(options),
    cache: new InMemoryCache()
  })
