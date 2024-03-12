import ErrorPage from '@/pages/error-page';
import type { ErrorInfo, PropsWithChildren } from 'react';
import { Component } from 'react';

interface State extends Readonly<{}> {
  hasError: boolean;
}

interface Props extends PropsWithChildren {}

export default class ErrorBoundary extends Component {
  public props: Props;
  public state: State;

  constructor(props: PropsWithChildren) {
    super(props);
    this.props = props;
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    console.error({ error, errorInfo });
  }

  render() {
    if (this.state.hasError)
      return <ErrorPage retryFn={() => this.setState({ hasError: false })} />;
    return this.props.children;
  }
}
