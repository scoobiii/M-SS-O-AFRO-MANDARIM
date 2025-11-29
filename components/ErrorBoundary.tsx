
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleHardReset = () => {
    if (window.confirm("CRITICAL: This will wipe all local data to fix the corruption. Continue?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-mono text-red-500">
          <div className="max-w-2xl w-full bg-black border-2 border-red-600 rounded-lg p-8 shadow-[0_0_50px_rgba(220,38,38,0.3)]">
            <div className="flex items-center gap-4 mb-6 border-b border-red-900 pb-4">
              <AlertTriangle size={48} />
              <div>
                <h1 className="text-2xl font-bold">SYSTEM FAILURE DETECTED</h1>
                <p className="text-red-400">Critical architecture error in render loop.</p>
              </div>
            </div>

            <div className="bg-red-950/30 p-4 rounded border border-red-900 mb-6 overflow-auto max-h-64 text-sm">
              <p className="font-bold mb-2">{this.state.error?.toString()}</p>
              <pre className="text-xs opacity-70 whitespace-pre-wrap">
                {this.state.errorInfo?.componentStack}
              </pre>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded border border-slate-600 transition-all"
              >
                <RefreshCw size={18} /> Reboot System (Reload)
              </button>
              
              <button 
                onClick={this.handleHardReset}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded border border-red-500 transition-all ml-auto"
              >
                <Trash2 size={18} /> Hard Reset / Wipe Data
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
