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
    { id: 'n1', label: 'User Intent Parser (LLM)', status: 'success', logs: ['Query received', 'Intent classified: DATA_RETRIEVAL'], latencyMs: 340 },
    { id: 'n2', label: 'Semantic Router', status: 'success', logs: ['Routing to SQL Agent'], latencyMs: 45 },
    { id: 'n3', label: 'SQL Generation Agent', status: 'error', logs: ['Evaluating schema', 'ERROR: Token limit exceeded in context window', 'Fallback triggered'], latencyMs: 4120 },
    { id: 'n4', label: 'Fallback Search Agent', status: 'warning', logs: ['Executing vector search', 'WARN: Low confidence threshold (0.68)'], latencyMs: 1200 },
    { id: 'n5', label: 'Response Synthesizer', status: 'idle', logs: ['Awaiting inputs...'], latencyMs: 0 },
  ]);

  const [selectedNode, setSelectedNode] = useState<string | null>('n3');

  const handleSimulateFix = () => {
    setNodes(nodes.map(n => {
      if (n.id === 'n3') {
        return { ...n, status: 'success', logs: ['Evaluating schema', 'Schema optimized via RAG', 'SQL query generated successfully'], latencyMs: 1850 };
      }
      if (n.id === 'n4') {
        return { ...n, status: 'idle', logs: ['Skipped (primary agent succeeded)'], latencyMs: 0 };
      }
      if (n.id === 'n5') {
        return { ...n, status: 'success', logs: ['Inputs received', 'Response generated', 'Safety checks passed'], latencyMs: 890 };
      }
      return n;
    }));
    setSelectedNode('n5');
  };

  const handleReset = () => {
    setNodes([
      { id: 'n1', label: 'User Intent Parser (LLM)', status: 'success', logs: ['Query received', 'Intent classified: DATA_RETRIEVAL'], latencyMs: 340 },
      { id: 'n2', label: 'Semantic Router', status: 'success', logs: ['Routing to SQL Agent'], latencyMs: 45 },
      { id: 'n3', label: 'SQL Generation Agent', status: 'error', logs: ['Evaluating schema', 'ERROR: Token limit exceeded in context window', 'Fallback triggered'], latencyMs: 4120 },
      { id: 'n4', label: 'Fallback Search Agent', status: 'warning', logs: ['Executing vector search', 'WARN: Low confidence threshold (0.68)'], latencyMs: 1200 },
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
      <h1 className="tu-title">Agentic Workflow Debugger (Simulation)</h1>
      <p className="tu-subtitle">Visualize failure modes and token limits in multi-agent orchestration architectures.</p>
      <hr className="tu-divider" />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '1.25rem' }}>
        
        {/* Graph Column */}
        <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>Execution Graph</h3>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>DAG Visualization</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {nodes.map((node, index) => (
              <div key={node.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setSelectedNode(node.id)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#fff',
                    border: `2px solid ${selectedNode === node.id ? '#0d2b5e' : getStatusColor(node.status)}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow: selectedNode === node.id ? '0 0 0 2px rgba(13, 43, 94, 0.2)' : '0 1px 2px rgba(0,0,0,0.05)',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>{node.label}</span>
                    <span style={{ 
                      width: '10px', height: '10px', borderRadius: '50%', background: getStatusColor(node.status),
                      boxShadow: node.status === 'error' ? '0 0 8px rgba(220, 38, 38, 0.6)' : 'none'
                     }}></span>
                  </div>
                  {node.latencyMs > 0 && (
                    <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', marginTop: '0.2rem' }}>
                      {node.latencyMs}ms
                    </span>
                  )}
                </button>
                {index < nodes.length - 1 && (
                  <div style={{ width: '2px', height: '1.2rem', background: '#cbd5e1', margin: '0.2rem 0' }}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Console Column */}
        <div>
          <div style={{ background: '#0f172a', borderRadius: '8px', overflow: 'hidden', border: '1px solid #334155', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ background: '#1e293b', padding: '0.75rem 1rem', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#e2e8f0', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'monospace' }}>
                Node Inspector: {activeNodeData?.id}
              </span>
              <span style={{ color: getStatusColor(activeNodeData?.status || 'idle'), fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                {activeNodeData?.status}
              </span>
            </div>
            
            <div style={{ padding: '1rem', flex: 1, fontFamily: 'monospace', fontSize: '0.85rem', color: '#a0aec0', background: '#0f172a', lineHeight: 1.6 }}>
              {activeNodeData ? (
                <>
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ color: '#64748b' }}>&gt; Component:</span> <span style={{ color: '#e2e8f0' }}>{activeNodeData.label}</span><br/>
                    <span style={{ color: '#64748b' }}>&gt; Latency:</span> <span style={{ color: '#e2e8f0' }}>{activeNodeData.latencyMs}ms</span>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>&gt; Transaction Logs:</span>
                    <div style={{ marginTop: '0.5rem', background: '#000', padding: '0.75rem', borderRadius: '4px' }}>
                      {activeNodeData.logs.map((log, i) => (
                        <div key={i} style={{ 
                          color: log.includes('ERROR') ? '#f87171' : log.includes('WARN') ? '#fbbf24' : '#10b981',
                          marginBottom: '0.2rem',
                          wordBreak: 'break-all'
                        }}>
                          [{new Date().toISOString().split('T')[1].slice(0, 8)}] {log}
                        </div>
                      ))}
                    </div>
                  </div>

                  {activeNodeData.status === 'error' && (
                    <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px dashed #ef4444', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)' }}>
                      <p style={{ margin: '0 0 0.5rem', fontWeight: 'bold', color: '#fca5a5' }}>Root Cause Analysis Available</p>
                      <p style={{ margin: '0 0 1rem', color: '#fecaca', fontSize: '0.8rem' }}>The DB schema injected into the prompt exceeded the 8k context limit, causing generation failure.</p>
                      <button onClick={handleSimulateFix} style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}>
                        Simulate Remediation (Apply dynamic schema RAG)
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ color: '#64748b' }}>Select a node to inspect logs.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="tu-btn-row" style={{ marginTop: '1.25rem' }}>
         <button type="button" className="tu-btn" onClick={handleReset}>Reset Simulation Track</button>
      </div>
    </div>
  );
}
