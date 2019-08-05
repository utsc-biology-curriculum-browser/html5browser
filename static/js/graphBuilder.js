const cytoscape = require('cytoscape');
const klay = require('cytoscape-klay');

// const options = {
//     name: 'klay',
//     nodeDimensionsIncludeLabels: false, // Boolean which changes whether label dimensions are included when calculating node dimensions
//     fit: true, // Whether to fit
//     padding: 2, // Padding on fit
//     animate: false, // Whether to transition the node positions
//     animateFilter: function( node, i ){ return true; }, // Whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
//     animationDuration: 500, // Duration of animation in ms if enabled
//     animationEasing: undefined, // Easing of animation if enabled
//     transform: function( node, pos ){ return pos; }, // A function that applies a transform to the final node position
//     ready: undefined, // Callback on layoutready
//     stop: undefined, // Callback on layoutstop
//     klay: {
//         // Following descriptions taken from http://layout.rtsys.informatik.uni-kiel.de:9444/Providedlayout.html?algorithm=de.cau.cs.kieler.klay.layered
//         addUnnecessaryBendpoints: false, // Adds bend points even if an edge does not change direction.
//         aspectRatio: 1.6, // The aimed aspect ratio of the drawing, that is the quotient of width by height
//         borderSpacing: 2, // Minimal amount of space to be left to the border
//         compactComponents: false, // Tries to further compact components (disconnected sub-graphs).
//         crossingMinimization: 'LAYER_SWEEP', // Strategy for crossing minimization.
//         /* LAYER_SWEEP The layer sweep algorithm iterates multiple times over the layers, trying to find node orderings that minimize the number of crossings. The algorithm uses randomization to increase the odds of finding a good result. To improve its results, consider increasing the Thoroughness option, which influences the number of iterations done. The Randomization seed also influences results.
//         INTERACTIVE Orders the nodes of each layer by comparing their positions before the layout algorithm was started. The idea is that the relative order of nodes as it was before layout was applied is not changed. This of course requires valid positions for all nodes to have been set on the input graph before calling the layout algorithm. The interactive layer sweep algorithm uses the Interactive Reference Point option to determine which reference point of nodes are used to compare positions. */
//         cycleBreaking: 'GREEDY', // Strategy for cycle breaking. Cycle breaking looks for cycles in the graph and determines which edges to reverse to break the cycles. Reversed edges will end up pointing to the opposite direction of regular edges (that is, reversed edges will point left if edges usually point right).
//         /* GREEDY This algorithm reverses edges greedily. The algorithm tries to avoid edges that have the Priority property set.
//         INTERACTIVE The interactive algorithm tries to reverse edges that already pointed leftwards in the input graph. This requires node and port coordinates to have been set to sensible values.*/
//         direction: 'DOWN', // Overall direction of edges: horizontal (right / left) or vertical (down / up)
//         /* UNDEFINED, RIGHT, LEFT, DOWN, UP */
//         edgeRouting: 'ORTHOGONAL', // Defines how edges are routed (POLYLINE, ORTHOGONAL, SPLINES)
//         edgeSpacingFactor: 0.5, // Factor by which the object spacing is multiplied to arrive at the minimal spacing between edges.
//         feedbackEdges: false, // Whether feedback edges should be highlighted by routing around the nodes.
//         fixedAlignment: 'BALANCED', // Tells the BK node placer to use a certain alignment instead of taking the optimal result.  This option should usually be left alone.
//         /* NONE Chooses the smallest layout from the four possible candidates.
//         LEFTUP Chooses the left-up candidate from the four possible candidates.
//         RIGHTUP Chooses the right-up candidate from the four possible candidates.
//         LEFTDOWN Chooses the left-down candidate from the four possible candidates.
//         RIGHTDOWN Chooses the right-down candidate from the four possible candidates.
//         BALANCED Creates a balanced layout from the four possible candidates. */
//         inLayerSpacingFactor: 0.5, // Factor by which the usual spacing is multiplied to determine the in-layer spacing between objects.
//         layoutHierarchy: false, // Whether the selected layouter should consider the full hierarchy
//         linearSegmentsDeflectionDampening: 0.3, // Dampens the movement of nodes to keep the diagram from getting too large.
//         mergeEdges: false, // Edges that have no ports are merged so they touch the connected nodes at the same points.
//         mergeHierarchyCrossingEdges: true, // If hierarchical layout is active, hierarchy-crossing edges use as few hierarchical ports as possible.
//         nodeLayering:'NETWORK_SIMPLEX', // Strategy for node layering.
//         /* NETWORK_SIMPLEX This algorithm tries to minimize the length of edges. This is the most computationally intensive algorithm. The number of iterations after which it aborts if it hasn't found a result yet can be set with the Maximal Iterations option.
//         LONGEST_PATH A very simple algorithm that distributes nodes along their longest path to a sink node.
//         INTERACTIVE Distributes the nodes into layers by comparing their positions before the layout algorithm was started. The idea is that the relative horizontal order of nodes as it was before layout was applied is not changed. This of course requires valid positions for all nodes to have been set on the input graph before calling the layout algorithm. The interactive node layering algorithm uses the Interactive Reference Point option to determine which reference point of nodes are used to compare positions. */
//         nodePlacement:'LINEAR_SEGMENTS', // Strategy for Node Placement
//         /* BRANDES_KOEPF Minimizes the number of edge bends at the expense of diagram size: diagrams drawn with this algorithm are usually higher than diagrams drawn with other algorithms.
//         LINEAR_SEGMENTS Computes a balanced placement.
//         INTERACTIVE Tries to keep the preset y coordinates of nodes from the original layout. For dummy nodes, a guess is made to infer their coordinates. Requires the other interactive phase implementations to have run as well.
//         SIMPLE Minimizes the area at the expense of... well, pretty much everything else. */
//         randomizationSeed: 1, // Seed used for pseudo-random number generators to control the layout algorithm; 0 means a new seed is generated
//         routeSelfLoopInside: false, // Whether a self-loop is routed around or inside its node.
//         separateConnectedComponents: true, // Whether each connected component should be processed separately
//         spacing: 5, // Overall setting for the minimal amount of space to be left between objects
//         thoroughness: 5 // How much effort should be spent to produce a nice layout..
//     },
//     priority: function( edge ){ return null; }, // Edges with a non-nil value are skipped when geedy edge cycle breaking is enabled
// };

const options = {
  name: 'preset',
  padding: 5 // padding on fit
};

let nodeStyle = [
    {
        selector: 'node',
        style: {
            'label' : 'data(desc)',
            'text-halign' : 'center',
            'text-valign' : 'center',
            'font-size' : '15px',
            'shape': 'rectangle'
        }
    },
    {
        selector: "node[cat!='parent']",
        style: {
            'padding' : '2px',
            'width' : 'label',
            'height' : 'label'
        }
    },
    {
        selector: "node[cat='First Year']",
        style: {
            "background-color": '#FCC3E2'
        }
    },
    {
        selector: "node[cat='Second Year']",
        style: {
            "background-color": '#6E056B',
            "color" : "white"
        }
    },
    {
        selector: "node[cat='Third Year']",
        style: {
            "background-color": '#F9F33B'
        }
    },
    {
        selector: "node[cat='Third/Fourth Year']",
        style: {
            "background-color": '#F79900'
        }
    },
    {
        selector: "node[cat='Fourth Year']",
        style: {
            "background-color": '#97DD71'
        }
    },
    {
        selector: "node[cat='Ecology and Evolution']",
        style: {
            "background-color": '#97DD71'
        }
    },
    {
        selector: "node[cat='Organismal Biology']",
        style: {
            "background-color": '#02FFCB'
        }
    },
    {
        selector: "node[cat='PBN']",
        style: {
            "background-color": '#F79900'
        }
    },
    {
        selector: "node[cat='CEC']",
        style: {
            "background-color": '#97DD71'
        }
    },
    {
        selector: "node[cat='CGD']",
        style: {
            "background-color": '#02FFCB'
        }
    },
    {
        selector: "node[cat='OB']",
        style: {
            "background-color": '#022864',
            "color" : "white"
        }
    },
    {
        selector: "node[cat='parent']",
        style: {
            'text-halign' : 'center',
            'text-valign' : 'top',
            'border-color': '#000000',
            'border-style': 'solid',
            "background-color": '#D8D8D8',
            'min-width': '100px'
        }
    },
    {
        selector: 'edge',
        style: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'opacity': 0.2
        }
    },
    {
        selector: "edge[cat='correq']",
        style: {
            "line-style":　"dotted"
        }
    },
    {
        selector: "edge[cat='recommend']",
        style: {
            "line-style":　"dashed",
            "line-color" : "green",
            'target-arrow-color': 'green',
        }
    },
    {
        selector: "edge[cat='orpre']",
        style: {
            "line-style":　"dashed"
        }
    }
];

//cytoscape.use(klay);

// Helper functions
function onMouseNodePass(pass, opacity) {
    if(pass.data('desc').length < 6) {
        let id = pass.data('id');
        let relatedEdges = pass.connectedEdges('[target="'+id+'"]');
        relatedEdges.forEach(edge => {
            edge.style('opacity', opacity);
            let source = edge.source();
            onMouseNodePass(source, opacity);
        });
    }
}

function onMouseNodeEvent(target, opacity, isOver) {
    let id = target.data('id');
    if(isOver && target.data('desc').length == 6) {
        api.getCourseInfo(id);
    }
    let relatedEdges = target.connectedEdges('[target="'+id+'"]');
    relatedEdges.forEach(edge => {
        edge.style('opacity', opacity);
        let source = edge.source();
        onMouseNodePass(source, opacity);
    });
}

var graphBuilder = (function(){
    var module = {};

    module.build = (containerId, nodes, edges, zoomable) => {
        if(containerId == null || nodes == null || edges == null) {
            return;
        }

        // Build the graph --------------------
        let cy = cytoscape({
            container: document.getElementById(containerId)
        });

        /*if(!zoomable) {
            cy.userZoomingEnabled( false ); // disable zoom
            //options.klay.spacing = 7.5;
        } else {
            cy.minZoom(0.6); // prevent zoom too small
            //options.klay.spacing = 3;
        }*/
        

        // Set style
        cy.style().clear().fromJson(nodeStyle).update();
        cy.maxZoom(5); // prevent zoom too large

        // Add node and edge
        cy.add(nodes);
        cy.add(edges);

        // Use layout
        cy.layout( options ).run(); 

        // Event -------
        // Hover events
        cy.on('mouseout', 'node', (e) => {
            e.preventDefault();
            let target = e.target;
            onMouseNodeEvent(target, 0.2, false);
        });

        cy.on('mouseover', 'node', (e) => {
            e.preventDefault();
            let target = e.target;
            onMouseNodeEvent(target, 1, true);
        });

        // Click event
        cy.on('click', 'node', (e) => {
            e.preventDefault();
            let target = e.target;
            if(target.data('desc').length == 6) {
                window.open('https://utsc.calendar.utoronto.ca/course/'+ target.data('id'), '_blank');
            }
        });
    }
    return module;
})();