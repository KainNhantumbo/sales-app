import { Component } from 'react';
import ErrorPage from '@/pages/error-page';
import type { PropsWithChildren, ErrorInfo, ReactNode } from 'react';

interface State extends Readonly<{}> {
  hasError: boolean;
}

export default class ErrorBoundary extends Component {
  public props!: PropsWithChildren;
  public state: State;

  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    console.error({ error, errorInfo });
  }

  render(): ReactNode {
    if (this.state.hasError)
      return <ErrorPage retryFn={() => this.setState({ hasError: false })} />;
    return this.props.children;
  }
}
