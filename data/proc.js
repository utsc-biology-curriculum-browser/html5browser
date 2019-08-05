const fs = require('fs');
const path = require('path');

let mapInfo = JSON.parse(fs.readFileSync(path.join(__dirname, 'mapInfo-original.json')));

let pos = null;
function initPos () {
    pos = {
        'First Year': {
            x: 0,
            y: 0
        },
        'Second Year': {
            x: 2,
            y: 0
        },
        'Third Year': {
            x: 4,
            y: 0
        },
        'Third/Fourth Year': {
            x: 6,
            y: 0
        },
        'Fourth Year': {
            x: 8,
            y: 0
        },
        'Ecology and Evolution': {
            x: 10,
            y: 0
        },
        'Organismal Biology':  {
            x: 12,
            y: 0
        },
        'PBN':  {
            x: 10,
            y: 0
        },
        'CEC':  {
            x: 11,
            y: 0
        },
        'CGD':  {
            x: 12,
            y: 0
        },
        'OB':  {
            x: 13,
            y: 0
        },
    };
}

 /* -- Add nodes -- */
function Node(id, desc, cat, pos) {
    this.group = 'nodes';
    this.data = {
        'id': id,
        'desc' : desc.slice(0, 6),
        'cat': cat,
        'position': pos
    };
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
        let result = new Node(id, id, cat, {'x': pos[cat].x, 'y': pos[cat].y*2});
        pos[cat].y++;
        return result;
    } else {
        let lst = id.split('-');
        return new Node(id, lst[0], cat, {'x': 10000000, 'y': 10000000});
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
    nodeMap[target].data.position.x = nodeMap[target].data.position.x < nodeMap[source].data.position.x ?　nodeMap[target].data.position.x　: nodeMap[source].data.position.x;
    nodeMap[target].data.position.y = nodeMap[target].data.position.y < nodeMap[source].data.position.y ?　nodeMap[target].data.position.y　: nodeMap[source].data.position.y;
    return true;
}

ans = {};

for(let progId in mapInfo) {
    initPos();
    ans[progId] = {"nodes":[], "edges": []};

    //-------------------------------------------------
    // Node map
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
    // Edges
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
        // Layer node for a year
        /*let layerNode = new Node(year, year, 'layer');
        ansNodes.push(layerNode);*/
        for(let i=0;i<curNodes[year].length;i++) {
            let id=curNodes[year][i];
            let resultNode = nodeMap[id];
            /*if(!resultNode.data.parent) {
                resultNode.data.parent = year;
            }*/
            ansNodes.push(resultNode);
        }
    }
}

fs.writeFileSync(path.join(__dirname, 'mapInfo.json'), JSON.stringify(ans, null, 2));