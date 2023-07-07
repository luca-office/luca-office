import {createUUID} from "./uuid"

interface SubjectListener<T> {
  readonly id: UUID
  readonly listener: (data: T) => void
}

export class Subject<T> {
  private readonly listeners: SubjectListener<T>[] = []

  private indexOfSubjectListener(listenerId: UUID): number {
    let listenerIndex = -1

    for (let index = 0; index < this.listeners.length; index++) {
      const entry = this.listeners[index]
      if (entry.id === listenerId) {
        listenerIndex = index
        break
      }
    }
    return listenerIndex
  }

  subscribe(listener: (data: T) => void): UUID {
    const id = createUUID()
    this.listeners.push({id, listener})
    return id
  }

  unsubscribe(listenerId: UUID) {
    const index = this.indexOfSubjectListener(listenerId)
    if (index >= 0) {
      this.listeners.splice(index, 1)
    }
  }

  next(data: T) {
    this.listeners.forEach(({listener}) => listener(data))
  }
}
