import { Component, type ReactNode } from "react";
import { Compass } from "lucide-react";

type Props = { children: ReactNode };
type State = { error: Error | null };

// Shows a friendly message with a reload button instead of a blank page if
// something fails while rendering a page.
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 pt-24">
        <div className="text-center max-w-md">
          <Compass className="w-12 h-12 text-primary mx-auto mb-6" aria-hidden="true" />
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">This page didn't load correctly.</h1>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-7 py-3.5 rounded-xl font-semibold font-sans text-sm bg-primary text-primary-foreground shadow-md shadow-primary/20"
          >
            Reload page
          </button>
          <p className="mt-8 text-xs text-muted-foreground font-mono break-words">{error.message}</p>
        </div>
      </div>
    );
  }
}
