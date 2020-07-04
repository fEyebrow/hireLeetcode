interface Stack {
  line: number
  column: number
  filename: string
}
export interface ErrorMessage {
  message: string
  stack: Stack[]
}

export interface Error {
  stack: string
}

export function parseError(err: Error): ErrorMessage {
  const stack = err.stack.split('\n')
  let message = ''
  let start = 0
  if (stack[0].includes('Error')) {
    message = stack[0].split(':')[1].trim()
    start = 1
  }
  const errorMessageStack = stack
    .slice(start)
    .map((item: string): Stack | null => {
      const regex = /((https:|http:).+):(.+):(.+)/
      const result = item.match(regex)
      if (!Array.isArray(result)) {
        return null
      }
      return {
        line: Number(result[3]),
        column: Number(result[4]),
        filename: result[1],
      }
    })
    .filter(item => item)
  return {
    message,
    stack: errorMessageStack,
  }
}
