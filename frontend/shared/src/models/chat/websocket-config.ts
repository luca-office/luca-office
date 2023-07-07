export interface WebSocketConfig {
  readonly reconnectAttempts: number
  readonly reconnectIntervalInMs: number
}

export const defaultWebSocketConfig: WebSocketConfig = {
  reconnectAttempts: 10,
  reconnectIntervalInMs: 1000
}
