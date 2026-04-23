import { useState, useMemo } from 'react';
import { AlertTriangle, CheckCircle, Zap, AlertCircle, Bug, Code } from 'lucide-react';
import ToolToAgencyCTA from './ToolToAgencyCTA';

interface WorkflowNode {
  id: string;
  label: string;
  type: 'start' | 'agent' | 'decision' | 'action' | 'end';
}

interface WorkflowEdge {
  from: string;
  to: string;
  label?: string;
  condition?: string;
}

interface IssueDetected {
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: 'infinite_loop' | 'unreachable' | 'missing_guard' | 'dead_end' | 'no_exit';
  node: string;
  description: string;
  recommendation: string;
}

interface DebugResult {
  isValid: boolean;
  totalNodes: number;
  totalEdges: number;
  issues: IssueDetected[];
  reachableNodes: Set<string>;
  unreachableNodes: string[];
  cycles: string[][];
  hasStartNode: boolean;
  hasEndNode: boolean;
}

export function AgenticWorkflowDebugger() {
  const [workflowJson, setWorkflowJson] = useState(
    `{
  "nodes": [
    {"id": "start", "label": "Start", "type": "start"},
    {"id": "analyze", "label": "Analyze Query", "type": "agent"},
    {"id": "decide", "label": "Route Decision", "type": "decision"},
    {"id": "search", "label": "Web Search", "type": "action"},
    {"id": "process", "label": "Process Results", "type": "agent"},
    {"id": "end", "label": "Return Answer", "type": "end"}
  ],
  "edges": [
    {"from": "start", "to": "analyze"},
    {"from": "analyze", "to": "decide"},
    {"from": "decide", "to": "search", "condition": "needs_web_search"},
    {"from": "decide", "to": "process", "condition": "has_context"},
    {"from": "search", "to": "process"},
    {"from": "process", "to": "end"}
  ]
}`
  );

  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);

  const result: DebugResult | null = useMemo(() => {
    try {
      const parsed = JSON.parse(workflowJson);
      const nodes: WorkflowNode[] = parsed.nodes || [];
      const edges: WorkflowEdge[] = parsed.edges || [];

      // Validate basic structure
      if (!Array.isArray(nodes) || !Array.isArray(edges) || nodes.length === 0) {
        return {
          isValid: false,
          totalNodes: nodes.length,
          totalEdges: edges.length,
          issues: [
            {
              severity: 'critical',
              type: 'no_exit',
              node: 'workflow',
              description: 'Invalid workflow structure: nodes must be a non-empty array',
              recommendation: 'Ensure JSON has valid "nodes" array with at least one node',
            },
          ],
          reachableNodes: new Set(),
          unreachableNodes: [],
          cycles: [],
          hasStartNode: false,
          hasEndNode: false,
        };
      }

      const nodeMap = new Map(nodes.map((n) => [n.id, n]));
      const nodeIds = new Set(nodes.map((n) => n.id));
      const adjacencyList = new Map<string, string[]>();

      // Build adjacency list
      nodeIds.forEach((id) => adjacencyList.set(id, []));
      edges.forEach((edge) => {
        if (adjacencyList.has(edge.from) && adjacencyList.has(edge.to)) {
          adjacencyList.get(edge.from)!.push(edge.to);
        }
      });

      // Find start and end nodes
      const startNodes = nodes.filter((n) => n.type === 'start');
      const endNodes = nodes.filter((n) => n.type === 'end');
      const hasStartNode = startNodes.length > 0;
      const hasEndNode = endNodes.length > 0;

      // DFS for reachability
      const reachableNodes = new Set<string>();
      const visited = new Set<string>();
      const recursionStack = new Set<string>();

      const dfs = (nodeId: string, path: string[] = []): string[][] => {
        if (!nodeIds.has(nodeId)) return [];

        visited.add(nodeId);
        reachableNodes.add(nodeId);
        recursionStack.add(nodeId);

        const cycles: string[][] = [];
        const neighbors = adjacencyList.get(nodeId) || [];

        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            const subCycles = dfs(neighbor, [...path, nodeId]);
            cycles.push(...subCycles);
          } else if (recursionStack.has(neighbor)) {
            // Cycle detected
            cycles.push([...path, nodeId, neighbor]);
          }
        }

        recursionStack.delete(nodeId);
        return cycles;
      };

      // Start from all start nodes
      const cycles: string[][] = [];
      if (hasStartNode) {
        startNodes.forEach((sn) => {
          const subCycles = dfs(sn.id);
          cycles.push(...subCycles);
        });
      } else {
        // If no start node, start from first node
        const firstNode = nodes[0].id;
        const subCycles = dfs(firstNode);
        cycles.push(...subCycles);
      }

      // Find unreachable nodes
      const unreachableNodes = Array.from(nodeIds).filter((id) => !reachableNodes.has(id));

      // Detect issues
      const issues: IssueDetected[] = [];

      // Check for infinite loops (cycles)
      if (cycles.length > 0) {
        cycles.forEach((cycle) => {
          const cycleStr = cycle.slice(0, -1).join(' → ');
          issues.push({
            severity: 'critical',
            type: 'infinite_loop',
            node: cycle[0],
            description: `Infinite loop detected: ${cycleStr} → ${cycle[0]}`,
            recommendation: 'Add exit condition or maximum iteration limit to break the loop cycle',
          });
        });
      }

      // Check for unreachable nodes
      unreachableNodes.forEach((nodeId) => {
        const incomingEdges = edges.filter((e) => e.to === nodeId);
        if (incomingEdges.length === 0 && nodeMap.get(nodeId)?.type !== 'start') {
          issues.push({
            severity: 'high',
            type: 'unreachable',
            node: nodeId,
            description: `Node "${nodeId}" is unreachable — no incoming edges`,
            recommendation: 'Connect node from upstream decision or remove if no longer needed',
          });
        }
      });

      // Check for dead ends (no outgoing edges to end nodes)
      nodeIds.forEach((nodeId) => {
        const node = nodeMap.get(nodeId);
        const outgoingEdges = edges.filter((e) => e.from === nodeId);

        if (outgoingEdges.length === 0 && node?.type !== 'end') {
          issues.push({
            severity: 'high',
            type: 'dead_end',
            node: nodeId,
            description: `Node "${nodeId}" is a dead end — no outgoing edges`,
            recommendation: 'Add outgoing edge to continue workflow or mark as end node',
          });
        }
      });

      // Check for missing guards on decision nodes
      const decisionNodes = nodes.filter((n) => n.type === 'decision');
      decisionNodes.forEach((dnode) => {
        const decisionEdges = edges.filter((e) => e.from === dnode.id);
        const edgesWithoutCondition = decisionEdges.filter((e) => !e.condition);

        if (decisionEdges.length > 1 && edgesWithoutCondition.length > 0) {
          issues.push({
            severity: 'medium',
            type: 'missing_guard',
            node: dnode.id,
            description: `Decision node "${dnode.id}" has ${edgesWithoutCondition.length} edge(s) without conditions`,
            recommendation: 'Add explicit condition labels (e.g., "if x else y") to all decision paths',
          });
        }
      });

      // Sort issues by severity
      issues.sort((a, b) => {
        const severityOrder: Record<string, number> = {
          critical: 0,
          high: 1,
          medium: 2,
          low: 3,
        };
        return severityOrder[a.severity] - severityOrder[b.severity];
      });

      return {
        isValid: true,
        totalNodes: nodes.length,
        totalEdges: edges.length,
        issues,
        reachableNodes,
        unreachableNodes,
        cycles,
        hasStartNode,
        hasEndNode,
      };
    } catch (e) {
      return {
        isValid: false,
        totalNodes: 0,
        totalEdges: 0,
        issues: [
          {
            severity: 'critical',
            type: 'no_exit',
            node: 'parse',
            description: `JSON parse error: ${e instanceof Error ? e.message : 'Invalid JSON'}`,
            recommendation: 'Ensure workflow JSON is valid and follows the schema (nodes array, edges array)',
          },
        ],
        reachableNodes: new Set(),
        unreachableNodes: [],
        cycles: [],
        hasStartNode: false,
        hasEndNode: false,
      };
    }
  }, [workflowJson]);

  const severityBadgeColor = {
    critical: 'bg-red-100 text-red-700 border-red-300',
    high: 'bg-orange-100 text-orange-700 border-orange-300',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    low: 'bg-blue-100 text-blue-700 border-blue-300',
  };

  const severityIcon = {
    critical: <AlertTriangle size={18} className="text-red-600" />,
    high: <AlertCircle size={18} className="text-orange-600" />,
    medium: <Zap size={18} className="text-yellow-600" />,
    low: <CheckCircle size={18} className="text-blue-600" />,
  };

  const handleLoadExample = () => {
    setWorkflowJson(`{
  "nodes": [
    {"id": "start", "label": "Start", "type": "start"},
    {"id": "analyze", "label": "Analyze Query", "type": "agent"},
    {"id": "decide", "label": "Route Decision", "type": "decision"},
    {"id": "search", "label": "Web Search", "type": "action"},
    {"id": "process", "label": "Process Results", "type": "agent"},
    {"id": "end", "label": "Return Answer", "type": "end"}
  ],
  "edges": [
    {"from": "start", "to": "analyze"},
    {"from": "analyze", "to": "decide"},
    {"from": "decide", "to": "search", "condition": "needs_web_search"},
    {"from": "decide", "to": "process", "condition": "has_context"},
    {"from": "search", "to": "process"},
    {"from": "process", "to": "end"}
  ]
}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Top Banner Ad Slot */}
      <div className="mb-8 bg-slate-100 border border-slate-300 rounded-md flex items-center justify-center h-24">
        <div className="text-slate-500 text-sm">728×90 Ad Slot</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Input Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Workflow Definition</h2>
            <p className="text-sm text-slate-600">
              Define your agent workflow as JSON with nodes (start, agent, decision, action, end) and edges (with optional conditions).
            </p>

            <div className="space-y-2">
              <label className="font-semibold text-slate-900 text-sm">Workflow JSON</label>
              <textarea
                value={workflowJson}
                onChange={(e) => setWorkflowJson(e.target.value)}
                rows={12}
                className="w-full px-3 py-2 border border-slate-300 rounded-md font-mono text-xs text-slate-900 bg-slate-50"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleLoadExample}
                className="px-4 py-2 border border-slate-300 text-slate-900 rounded-md hover:bg-slate-50 transition-colors"
              >
                Load Example
              </button>
            </div>
          </div>

          {/* Analysis Results */}
          {result && (
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-100 border border-slate-300 rounded-md">
                  <p className="text-xs text-slate-600">Total Nodes</p>
                  <p className="text-xl font-bold text-slate-900">{result.totalNodes}</p>
                </div>
                <div className="p-3 bg-slate-100 border border-slate-300 rounded-md">
                  <p className="text-xs text-slate-600">Total Edges</p>
                  <p className="text-xl font-bold text-slate-900">{result.totalEdges}</p>
                </div>
                <div className="p-3 bg-slate-100 border border-slate-300 rounded-md">
                  <p className="text-xs text-slate-600">Issues Detected</p>
                  <p className="text-xl font-bold text-red-600">{result.issues.length}</p>
                </div>
                <div className="p-3 bg-slate-100 border border-slate-300 rounded-md">
                  <p className="text-xs text-slate-600">Reachable Nodes</p>
                  <p className="text-xl font-bold text-green-600">{result.reachableNodes.size}</p>
                </div>
              </div>

              {/* Health Status */}
              <div
                className={`p-4 border rounded-md ${
                  result.issues.length === 0 ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  {result.issues.length === 0 ? (
                    <CheckCircle size={24} className="text-green-600" />
                  ) : (
                    <Bug size={24} className="text-red-600" />
                  )}
                  <div>
                    <p className="font-semibold text-slate-900">
                      {result.issues.length === 0
                        ? 'Workflow is healthy'
                        : `${result.issues.length} issue${result.issues.length !== 1 ? 's' : ''} detected`}
                    </p>
                    {result.issues.length > 0 && (
                      <p className="text-sm text-slate-700 mt-1">
                        Review issues below to ensure reliable agent execution
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Issues List */}
              {result.issues.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900">Detected Issues</h3>

                  {result.issues.map((issue, idx) => (
                    <div key={idx} className={`border rounded-md overflow-hidden ${severityBadgeColor[issue.severity]}`}>
                      <div
                        className="p-4 cursor-pointer flex items-start justify-between"
                        onClick={() => setExpandedIssue(expandedIssue === idx ? null : idx)}
                      >
                        <div className="flex items-start gap-3 flex-1">
                          {severityIcon[issue.severity]}
                          <div className="flex-1">
                            <p className="font-semibold">{issue.description}</p>
                            <p className="text-xs opacity-75 mt-1">Node: {issue.node}</p>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold uppercase opacity-60 transition-transform ${
                            expandedIssue === idx ? 'transform rotate-180' : ''
                          }`}
                        >
                          ▼
                        </span>
                      </div>

                      {expandedIssue === idx && (
                        <div className="px-4 pb-4 bg-black bg-opacity-5 border-t">
                          <div className="pt-3 space-y-3">
                            <div>
                              <p className="text-xs font-semibold uppercase opacity-75 mb-1">Issue Type</p>
                              <p className="text-sm font-mono opacity-90">{issue.type.replace(/_/g, ' ')}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold uppercase opacity-75 mb-1">Recommendation</p>
                              <p className="text-sm opacity-90">{issue.recommendation}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Structural Analysis */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 rounded-md border ${result.hasStartNode ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                  <p className="text-xs font-semibold text-slate-900">Start Node</p>
                  <p className={`text-sm mt-1 ${result.hasStartNode ? 'text-green-700' : 'text-red-700'}`}>
                    {result.hasStartNode ? '✓ Found' : '✗ Missing'}
                  </p>
                </div>
                <div className={`p-3 rounded-md border ${result.hasEndNode ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                  <p className="text-xs font-semibold text-slate-900">End Node</p>
                  <p className={`text-sm mt-1 ${result.hasEndNode ? 'text-green-700' : 'text-red-700'}`}>
                    {result.hasEndNode ? '✓ Found' : '✗ Missing'}
                  </p>
                </div>
              </div>

              {result.unreachableNodes.length > 0 && (
                <div className="bg-orange-50 border border-orange-300 rounded-md p-3">
                  <p className="text-xs font-semibold text-slate-900 uppercase mb-2">Unreachable Nodes</p>
                  <p className="text-sm text-slate-700">
                    {result.unreachableNodes.join(', ')} — These nodes cannot be reached from the start node
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar Ad + Reference */}
        <div className="lg:col-span-1 space-y-6">
          {/* Right Sidebar Ad Slot */}
          <div className="bg-slate-100 border border-slate-300 rounded-md flex flex-col items-center justify-center h-96">
            <div className="text-slate-500 text-sm text-center">300×600 Ad Slot</div>
          </div>

          {/* JSON Schema Reference */}
          <div className="p-4 bg-slate-50 border border-slate-300 rounded-md space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Workflow Schema</h4>
              <div className="text-xs text-slate-600 space-y-2 font-mono">
                <p className="font-semibold text-slate-900">Node Types:</p>
                <ul className="space-y-1 ml-2">
                  <li>• <span className="font-semibold">start:</span> Entry point</li>
                  <li>• <span className="font-semibold">agent:</span> AI agent step</li>
                  <li>• <span className="font-semibold">decision:</span> Branch logic</li>
                  <li>• <span className="font-semibold">action:</span> External call</li>
                  <li>• <span className="font-semibold">end:</span> Exit point</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-300 pt-3">
              <h4 className="font-semibold text-slate-900 mb-2">Common Issues</h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>• <strong>Infinite Loop:</strong> Cyclic edge pattern (A→B→C→A)</li>
                <li>• <strong>Unreachable:</strong> Node with no incoming edges</li>
                <li>• <strong>Dead End:</strong> Node with no outgoing edges</li>
                <li>• <strong>Missing Guard:</strong> Decision without condition labels</li>
              </ul>
            </div>

            <div className="border-t border-slate-300 pt-3">
              <p className="text-xs text-blue-700 font-semibold">
                💡 <strong>Tip:</strong> Use "condition" field on edges from decision nodes (e.g., "if_success", "retry_needed").
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 pt-8 border-t border-slate-300">
        <ToolToAgencyCTA 
          toolName="Agentic Workflow Debugger" 
          description="Debug complex multi-agent workflows for infinite loops, unreachable states, and missing guards. Ensure reliability before production deployment."
        />
      </div>
    </div>
  );
}
