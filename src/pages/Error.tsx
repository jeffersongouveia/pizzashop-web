import { Link, useRouteError } from 'react-router-dom'

export default function Error() {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Whoops, something happened...</h1>

      <p className="text-accent-foreground">
        An error occurred, more details below
      </p>

      <pre>{error.message || JSON.stringify(error)}</pre>

      <p className="pt-10 text-accent-foreground">
        Take me back to{' '}
        <Link to="/" className="text-sky-600 dark:text-sky-400">
          Dashboard
        </Link>
      </p>
    </div>
  )
}
