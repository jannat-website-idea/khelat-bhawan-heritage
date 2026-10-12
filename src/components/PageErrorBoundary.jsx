import React from 'react';

export default class PageErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error, details) {
    console.error('Page rendering failed:', error, details);
  }

  componentDidUpdate(previousProps) {
    if (this.state.hasError && previousProps.route !== this.props.route) {
      this.setState({hasError: false});
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="min-h-[70vh] pt-40 px-6 pb-24 bg-background text-foreground">
        <div className="max-w-xl mx-auto rounded-2xl border border-primary/25 bg-card p-8 text-center shadow-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Khelat Bhawan</p>
          <h1 className="font-serif text-3xl mb-3">This section is temporarily unavailable</h1>
          <p className="text-muted-foreground mb-6">Please refresh once. Your current page will remain selected.</p>
          <button
            type="button"
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm uppercase tracking-wider"
            onClick={() => window.location.reload()}
          >
            Refresh this page
          </button>
        </div>
      </main>
    );
  }
}
