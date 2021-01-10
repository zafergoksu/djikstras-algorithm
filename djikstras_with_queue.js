class Graph {
    constructor() {
        this.nodes = [];
        this.adjacencyList = {};
    }

    addNode(node) {
        this.nodes.push(node);
        this.adjacencyList[node] = [];
    }

    addEdge(a, b, weight) {
        this.adjacencyList[a].push({ node: b, weight });
        this.adjacencyList[b].push({ node: a, weight });
    }

    findPathWithDijkstra(startNode, endNode) {
        let times = {};
        let pathQueue = {};
        let priorityQueue = new PriorityQueue();

        times[startNode] = 0;

        this.nodes.forEach((node) => {
            if (node !== startNode) {
                times[node] = Infinity;
            }
        });

        priorityQueue.enqueue({ node: startNode, weight: 0 });

        while (!priorityQueue.isEmpty()) {
            let shortestStep = priorityQueue.dequeue();
            let currentNode = shortestStep.node;

            this.adjacencyList[currentNode].forEach((neighbour) => {
                let time = times[currentNode] + neighbour.weight;

                if (time < times[neighbour.node]) {
                    times[neighbour.node] = time;
                    pathQueue[neighbour.node] = currentNode;
                    priorityQueue.enqueue({
                        node: neighbour.node,
                        weight: time,
                    });
                }
            });
        }

        let path = [endNode];
        let lastStep = endNode;

        while (lastStep !== startNode) {
            path.unshift(pathQueue[lastStep]);
            lastStep = pathQueue[lastStep];
        }

        return `Path is ${path} and time is ${times[endNode]}`;
    }

    toString() {
        for (let node of this.nodes) {
            console.log(node, this.adjacencyList[node]);
        }
    }
}

class PriorityQueue {
    constructor() {
        this.collection = [];
    }

    enqueue(element) {
        if (this.isEmpty()) {
            this.collection.push(element);
        } else {
            let added = false;
            for (let i = 0; i < this.collection.length; i++) {
                if (element.weight < this.collection[i].weight) {
                    this.collection.splice(i, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.collection.push(element);
            }
        }
    }

    dequeue() {
        return this.collection.shift();
    }

    isEmpty() {
        return this.collection.length === 0;
    }
}

let map = new Graph();

map.addNode('A');
map.addNode('B');
map.addNode('C');
map.addNode('D');
map.addNode('E');
map.addNode('F');

map.addEdge('A', 'B', 5);
map.addEdge('A', 'C', 2);
map.addEdge('B', 'C', 1);
map.addEdge('B', 'D', 5);
map.addEdge('C', 'D', 3);
map.addEdge('D', 'E', 1);
map.addEdge('D', 'F', 6);
map.addEdge('E', 'F', 3);

//map.toString();

console.log(map.findPathWithDijkstra('A', 'F'));
console.log(map.findPathWithDijkstra('F', 'A'));
console.log(map.findPathWithDijkstra('A', 'B'));
