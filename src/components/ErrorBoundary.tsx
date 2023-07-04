import { Component } from 'react';
import ErrorPage from '@/pages/error-page';
import type { PropsWithChildren, ErrorInfo, ReactNode } from 'react';

interface IState extends Readonly<{}> {
  hasError: boolean;
}

export default class ErrorBoundary extends Component {
  public props!: PropsWithChildren;
  public state: IState;

  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ hasError: true });
    console.log({ error, errorInfo });
  }

  render(): ReactNode {
    if (this.state.hasError)
      return (
        <ErrorPage retryFn={(): void => this.setState({ hasError: false })} />
      );
    return this.props.children;
  }
}
