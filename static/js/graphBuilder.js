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
        selector: "node[cat='Extra']",
        style: {
            "background-color": '#3E3C3C',
            "color" : "white"
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

// Helper functions
function onMouseNodeEvent(target, opacity, isOver) {
    let id = target.data('id');
    if(isOver && target.data('desc').length == 6) {
        api.getCourseInfo(id);
    }
    let relatedEdges = target.connectedEdges('[target="'+id+'"]');
    relatedEdges.forEach(edge => {
        edge.style('opacity', opacity);
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

        // Disable user zoom
        cy.userZoomingEnabled( false );

        // Set style
        cy.style().clear().fromJson(nodeStyle).update();
        cy.maxZoom(1); // prevent zoom too large

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