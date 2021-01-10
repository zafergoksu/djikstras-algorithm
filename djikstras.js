var graph = {
    A: { B: 5, C: 2 },
    B: { A: 5, C: 1, D: 5 },
    C: { A: 2, B: 1, D: 3 },
    D: { B: 5, C: 3, E: 1, F: 6 },
    E: { D: 1, F: 3 },
    F: { D: 6, E: 3 },
};

function vertexWithShortestDistance(distance, visited) {
    let currentLength = Infinity;
    let shortest = null;

    for (node in distance) {
        if (!visited[node] && distance[node] < currentLength) {
            distance = distance[node];
            shortest = node;
        }
    }
    return shortest;
}

function djikstras(graph, source) {
    let vertexSet = new Set();
    let dist = {};
    let visited = [];

    for (node in graph) {
        dist[node] = Infinity;
        visited[node] = false;
        vertexSet.add(node);
    }
    dist[source] = 0;

    while (vertexSet.size !== 0) {
        let minimumVertex = vertexWithShortestDistance(dist, visited);
        vertexSet.delete(minimumVertex);

        for (node in graph[minimumVertex]) {
            if (!visited[node]) {
                let newDistance =
                    dist[minimumVertex] + graph[minimumVertex][node];

                if (newDistance < dist[node]) {
                    dist[node] = newDistance;
                    visited[minimumVertex] = true;
                }
            }
        }
    }

    for (let i = 0; i < 10; i++) {
        dist['A'];
    }
    console.log(dist);
}

djikstras(graph, 'A');
