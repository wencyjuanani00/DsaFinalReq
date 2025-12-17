const dsTabs = document.querySelectorAll('.ds-tab');
const tabContents = document.querySelectorAll('.tab-content');

dsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        
        dsTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `${targetTab}-tab`) {
                content.classList.add('active');
                
                const langButtons = content.querySelectorAll('.lang-btn');
                const codeContainers = content.querySelectorAll('.code-container');
                
                if (langButtons.length > 0) {
                    langButtons.forEach(btn => btn.classList.remove('active'));
                    langButtons[0].classList.add('active');
                    
                    codeContainers.forEach(container => {
                        if (container.id.includes('cpp')) {
                            container.style.display = 'block';
                        } else {
                            container.style.display = 'none';
                        }
                    });
                }
            }
        });
    });
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('lang-btn')) {
        const parentTab = e.target.closest('.tab-content');
        const lang = e.target.getAttribute('data-lang');
        
        parentTab.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        
        parentTab.querySelectorAll('.code-container').forEach(container => {
            if (container.id.includes(lang)) {
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        });
    }

    // Run individual algorithm
    if (e.target.closest('.btn-run')) {
        const card = e.target.closest('.algorithm-card');
        if (card) {
            runAlgorithm(card.id);
        }
    }

    // Run all algorithms
    if (e.target.id === 'run-all-btn') {
        algorithmCards.forEach(card => runAlgorithm(card.id));
    }
});

const filterButtons = document.querySelectorAll('.filter-btn');
const algorithmCards = document.querySelectorAll('.algorithm-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        algorithmCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

if (window.location.hash) {
    setTimeout(() => {
        const element = document.querySelector(window.location.hash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            element.style.animation = 'pulse 0.5s';
            
            setTimeout(() => {
                element.style.animation = '';
            }, 500);
        }
    }, 300);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(52, 152, 219, 0); }
        100% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0); }
    }
    
    .algorithm-card {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

function runExample(type) {
    const outputs = {
        array: `Array elements: 5 7 10 15
Element at index 2: 10
Array elements: 5 12 10 15
Array elements: 12 10 15
Current size: 3
Is empty: No`,

        stack: `Infix: a+b*(c^d-e)^(f+g*h)-i
Postfix: abcd^e-fgh*+^*+i-`,

        queue: `Queue elements: 10 20 30
Dequeued: 10
Queue elements: 20 30
Queue elements: 20 30 40 50 60`,

        tree: `Inorder Traversal: 4 2 5 1 3
Preorder Traversal: 1 2 4 5 3
Postorder Traversal: 4 5 2 3 1`
    };

    const outputBox = document.getElementById(type + "-output");
    if (outputBox) {
        outputBox.textContent = outputs[type] || "No output available.";
    }
}

function runAlgorithm(id) {
    const outputs = {
        "binary-search": `Binary Search Example:
Array: [1, 3, 5, 7, 9]
Target: 7
Result index: 3`,

        "bubble-sort": `Bubble Sort Example:
Original Array: [5, 3, 8, 4, 2]
Sorted Array: [2, 3, 4, 5, 8]`,

        "quick-sort": `Quick Sort Example:
Original Array: [9, 7, 5, 11, 12, 2]
Sorted Array: [2, 5, 7, 9, 11, 12]`,

        "dijkstra": `Dijkstra Example:
Graph edges with weights:
A->B=4, A->C=2, B->C=5
Shortest distances from A:
A:0 B:4 C:2`,

        "dfs": `DFS Example:
Visited order: 1 2 4 5 3`,

        "bfs": `BFS Example:
Visited order: 1 2 3 4 5`,

        "merge-sort": `Merge Sort Example:
Original Array: [8, 4, 5, 7, 1, 3, 6, 2]
Sorted Array: [1, 2, 3, 4, 5, 6, 7, 8]`,

        "kruskal": `Kruskal Example:
Edges selected for Minimum Spanning Tree:
(A,B=1),(B,C=2),(C,D=3)`,

        "knapsack": `Knapsack Example:
Items: [2,3,4], Values: [3,4,5], Capacity: 5
Max value: 7`,

        "floyd-warshall": `Floyd-Warshall Example:
Shortest paths between all pairs:
0 3 8
Infinity 0 5
Infinity Infinity 0`
    };

    const outputBox = document.getElementById(id + "-output");
    if (outputBox) {
        outputBox.textContent = outputs[id] || "No output available for this algorithm.";
    }
}
