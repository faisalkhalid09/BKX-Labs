export type WorkflowNode = {
  id: string;
  name: string;
  nextNodeIds: string[];
  hasGuard: boolean;
};

export type AgentWorkflowInput = {
  nodes: WorkflowNode[];
};

export type LoopDetection = {
  cycleFound: boolean;
  loops: string[][];
};

export type WorkflowDebugResult = {
  isValid: boolean;
  loopDetections: LoopDetection;
  unreachableNodes: string[];
  orphanedNodes: string[];
  recommendations: string[];
};

function detectCycles(nodes: WorkflowNode[]): string[][] {
  const visited = new Set<string>();
  const recStack = new Set<string>();
  const cycles: string[][] = [];

  function dfs(nodeId: string, path: string[]): void {
    if (recStack.has(nodeId)) {
      const cycleStart = path.indexOf(nodeId);
      if (cycleStart !== -1) {
        cycles.push(path.slice(cycleStart).concat(nodeId));
      }
      return;
    }

    if (visited.has(nodeId)) {
      return;
    }

    visited.add(nodeId);
    recStack.add(nodeId);

    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      for (const nextId of node.nextNodeIds) {
        dfs(nextId, [...path, nodeId]);
      }
    }

    recStack.delete(nodeId);
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      dfs(node.id, []);
    }
  }

  return cycles;
}

export function debugAgentWorkflow(input: AgentWorkflowInput): WorkflowDebugResult {
  const nodeMap = new Map(input.nodes.map((n) => [n.id, n]));
  const cycles = detectCycles(input.nodes);
  const allNodeIds = new Set(input.nodes.map((n) => n.id));
  const reachableNodes = new Set<string>();
  const unreachableNodes: string[] = [];
  const orphanedNodes: string[] = [];
  const recommendations: string[] = [];

  if (input.nodes.length === 0) {
    return {
      isValid: false,
      loopDetections: { cycleFound: false, loops: [] },
      unreachableNodes: [],
      orphanedNodes: [],
      recommendations: ["Define at least one workflow node."],
    };
  }

  function markReachable(nodeId: string): void {
    if (reachableNodes.has(nodeId)) return;
    reachableNodes.add(nodeId);
    const node = nodeMap.get(nodeId);
    if (node) {
      for (const nextId of node.nextNodeIds) {
        if (allNodeIds.has(nextId)) {
          markReachable(nextId);
        } else {
          orphanedNodes.push(nextId);
        }
      }
    }
  }

  const rootNode = input.nodes[0];
  if (rootNode) {
    markReachable(rootNode.id);
  }

  for (const nodeId of allNodeIds) {
    if (!reachableNodes.has(nodeId)) {
      unreachableNodes.push(nodeId);
    }
  }

  if (cycles.length > 0) {
    cycles.forEach((cycle, idx) => {
      const cycleNodes = cycle.slice(0, -1).join(" → ");
      const hasGuards = cycle.slice(0, -1).every((nodeId) => {
        const node = nodeMap.get(nodeId);
        return node && node.hasGuard;
      });

      if (!hasGuards) {
        recommendations.push(
          `Cycle ${idx + 1} (${cycleNodes}) lacks loop guards. Add retry limits or timeout conditions.`
        );
      } else {
        recommendations.push(
          `Cycle ${idx + 1} (${cycleNodes}) has guards—likely intentional retry pattern.`
        );
      }
    });
  }

  if (unreachableNodes.length > 0) {
    recommendations.push(
      `Unreachable nodes detected: ${unreachableNodes.join(", ")}. Remove or re-link them.`
    );
  }

  const isValid = cycles.length === 0 && unreachableNodes.length === 0 && orphanedNodes.length === 0;

  return {
    isValid,
    loopDetections: {
      cycleFound: cycles.length > 0,
      loops: cycles.map((c) => c.slice(0, -1)),
    },
    unreachableNodes,
    orphanedNodes,
    recommendations: recommendations.length > 0 ? recommendations : ["Workflow is valid with no detected issues."],
  };
}
