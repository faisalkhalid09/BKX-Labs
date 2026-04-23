import { useState } from 'react';

type ComponentStatus = 'success' | 'warning' | 'error' | 'idle';

interface WorkflowNode {
  id: string;
  label: string;
  status: ComponentStatus;
  logs: string[];
  latencyMs: number;
}

export function AgenticWorkflowDebugger() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: 'n1', label: 'User Intent Parser', status: 'success', logs: ['Query received', 'Intent: RETRIEVAL'], latencyMs: 340 },
    { id: 'n2', label: 'Semantic Router', status: 'success', logs: ['Routing to SQL Agent'], latencyMs: 45 },
    { id: 'n3', label: 'SQL Generation Agent', status: 'error', logs: ['ERROR: Token limit exceeded', 'Context window overflow'], latencyMs: 4120 },
    { id: 'n4', label: 'Fallback Search Agent', status: 'warning', logs: ['WARN: Low confidence (0.68)'], latencyMs: 1200 },
    { id: 'n5', label: 'Response Synthesizer', status: 'idle', logs: ['Awaiting inputs...'], latencyMs: 0 },
  ]);

  const [selectedNode, setSelectedNode] = useState<string | null>('n3');

  const handleSimulateFix = () => {
    setNodes(nodes.map(n => {
      if (n.id === 'n3') return { ...n, status: 'success', logs: ['Schema optimized via RAG', 'SQL generated'], latencyMs: 1850 };
      if (n.id === 'n4') return { ...n, status: 'idle', logs: ['Skipped'], latencyMs: 0 };
      if (n.id === 'n5') return { ...n, status: 'success', logs: ['Response generated'], latencyMs: 890 };
      return n;
    }));
    setSelectedNode('n5');
  };

  const handleReset = () => {
    setNodes([
      { id: 'n1', label: 'User Intent Parser', status: 'success', logs: ['Query received', 'Intent: RETRIEVAL'], latencyMs: 340 },
      { id: 'n2', label: 'Semantic Router', status: 'success', logs: ['Routing to SQL Agent'], latencyMs: 45 },
      { id: 'n3', label: 'SQL Generation Agent', status: 'error', logs: ['ERROR: Token limit exceeded', 'Context window overflow'], latencyMs: 4120 },
      { id: 'n4', label: 'Fallback Search Agent', status: 'warning', logs: ['WARN: Low confidence (0.68)'], latencyMs: 1200 },
      { id: 'n5', label: 'Response Synthesizer', status: 'idle', logs: ['Awaiting inputs...'], latencyMs: 0 },
    ]);
    setSelectedNode('n3');
  };

  const activeNodeData = nodes.find(n => n.id === selectedNode);

  const getStatusColor = (status: ComponentStatus) => {
    switch(status) {
      case 'success': return '#10b981';
      case 'warning': return '#d97706';
      case 'error': return '#dc2626';
      default: return '#9ca3af';
    }
  };

  return (
    <div className="tu-wrap">
      <span className="tu-tag">BKX AI Operations</span>
      <h1 className="tu-title">Agentic Workflow Debugger</h1>
      <p className="tu-subtitle">Simulate and visualize failure modes in multi-agent LLM orchestration.</p>
      <hr className="tu-divider" />

      <div className="tu-split-layout">
        <div className="tu-split-left">
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #d4d9de' }}>
            <h3 style={{ fontSize: '0.82rem', fontWeight: 700, margin: '0 0 1rem', color: '#0d2b5e', textTransform: 'uppercase' }}>Execution Graph (DAG)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {nodes.map((node, index) => (
                <div key={node.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedNode(node.id)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'white',
                      border: `1px solid ${selectedNode === node.id ? '#0d2b5e' : '#d4d9de'}`,
                      borderLeft: `4px solid ${getStatusColor(node.status)}`,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      boxShadow: selectedNode === node.id ? '0 2px 4px rgba(13, 43, 94, 0.1)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{node.label}</span>
                      <span style={{ fontSize: '0.7rem', color: '#4f565c' }}>{node.latencyMs}ms</span>
                    </div>
                  </button>
                  {index < nodes.length - 1 && (
                    <div style={{ width: '1px', height: '0.8rem', background: '#d4d9de' }}></div>
                  )}
                </div>
              ))}
            </div>

            <div className="tu-aeo" style={{ marginTop: '2rem' }}>
              <p>
                <strong>Workflow Observability:</strong> Agentic systems (Autogen, LangGraph) require 
                trace-level visibility to detect "infinite loops" and "context hallucinations" before 
                they escalate production costs.
              </p>
            </div>
            
            <button type="button" className="tu-btn tu-btn-sm" onClick={handleReset} style={{ marginTop: '1rem' }}>Reset Sim</button>
          </div>
        </div>

        <div className="tu-split-right">
          <div style={{ background: '#0f172a', borderRadius: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: '400px' }}>
            <div style={{ background: '#1e293b', padding: '0.75rem 1rem', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#e2e8f0', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'monospace' }}>LOGS: {activeNodeData?.label}</span>
              <span style={{ color: getStatusColor(activeNodeData?.status || 'idle'), fontSize: '0.72rem', fontWeight: 800 }}>{activeNodeData?.status.toUpperCase()}</span>
            </div>
            
            <div style={{ padding: '1rem', flex: 1, fontFamily: 'monospace', fontSize: '0.8rem', color: '#a0aec0', lineHeight: 1.6 }}>
              {activeNodeData ? (
                <>
                  <div style={{ background: 'black', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
                    {activeNodeData.logs.map((log, i) => (
                      <div key={i} style={{ color: log.includes('ERROR') ? '#ef4444' : log.includes('WARN') ? '#f59e0b' : '#10b981' }}>
                        [{new Date().toISOString().split('T')[1].slice(0, 8)}] {log}
                      </div>
                    ))}
                  </div>

                  {activeNodeData.status === 'error' && (
                    <div style={{ padding: '1rem', border: '1px solid #dc2626', borderRadius: '6px', background: 'rgba(220, 38, 38, 0.05)' }}>
                      <p style={{ margin: '0 0 0.5rem', fontWeight: 700, color: '#f87171', fontSize: '0.75rem' }}>ROOT CAUSE: TOKEN OVERFLOW</p>
                      <button onClick={handleSimulateFix} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '0.5rem 0.875rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontSize: '0.78rem' }}>
                        Apply Dynamic RAG Optimization
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ opacity: 0.5 }}>Select a node to inspect logs.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
