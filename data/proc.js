const fs = require('fs');
const path = require('path');

let mapInfo = JSON.parse(fs.readFileSync(path.join(__dirname, 'mapInfo-original.json')));

 /* -- Add nodes -- */
function Node(id, desc, cat) {
    this.group = 'nodes';
    this.data = {'id': id, 'desc' : desc.slice(0, 6), 'cat': cat};
}

function Edge(id, sourceId, targetId, cat) {
    this.group = 'edges';
    this.data = {
        'id': id,
        'source': sourceId,
        'target': targetId,
        'cat': cat
    }
}

function constructNode(id, cat) {
    if(id.length == 8) {
        return new Node(id, id, cat);
    } else {
        let lst = id.split('-');
        return new Node(id, lst[0], cat);
        // TODO: TBD whether use compound nodes, or add edges
    }
}

function constructEdge(id, cat) {
    let pair = id.split('<');
    return new Edge(id, pair[1], pair[0], cat);
}


function updateForParent(nodeMap, id) {
    let lst = id.split('<');
    if(lst.length < 2) {return false;}
    let target = lst[0];
    let source = lst[1];
    if(target.length == 8) {return false;} // target not a parent
    nodeMap[source].data.parent = target;
    nodeMap[target].data.cat = 'parent';
    return true;
}

ans = {};

for(let progId in mapInfo) {
    ans[progId] = {"nodes":[], "edges": []};

    //-------------------------------------------------
    let curNodes = mapInfo[progId].nodes;
    // Map to track nodes
    let nodeMap = {};
    for(let year in curNodes) {
        for(let i=0;i<curNodes[year].length;i++) {
            let id=curNodes[year][i];
            let newNode = constructNode(id, year);
            nodeMap[id] = newNode;
        }
    }

    //-------------------------------------------------
    let ansEdges = ans[progId].edges;
    let curEdges = mapInfo[progId].edges;
    for (let cat in curEdges) {
        for(let i=0;i<curEdges[cat].length;i++) {
            let id = curEdges[cat][i];
            if(!updateForParent(nodeMap, id)) {
                ansEdges.push(constructEdge(id, cat));
            }
        }
    }

    //-------------------------------------------------
    // For result nodes
    let ansNodes = ans[progId].nodes;
    for(let year in curNodes) {
        for(let i=0;i<curNodes[year].length;i++) {
            let id=curNodes[year][i];
            ansNodes.push(nodeMap[id]);
        }
    }
}

fs.writeFileSync(path.join(__dirname, 'mapInfo.json'), JSON.stringify(ans, null, 2));