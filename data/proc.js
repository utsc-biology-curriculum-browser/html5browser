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
            x: 0,
            y: 75
        },
        'Third Year': {
            x: 0,
            y: 150
        },
        'Third/Fourth Year': {
            x: 0,
            y: 225
        },
        'Fourth Year': {
            x: 0,
            y: 300
        },
        'Ecology and Evolution': {
            x: 0,
            y: 225
        },
        'Organismal Biology':  {
            x: 0,
            y: 300
        },
        'PBN':  {
            x: 0,
            y: 300
        },
        'CEC':  {
            x: 0,
            y: 375
        },
        'CGD':  {
            x: 0,
            y: 450
        },
        'OB':  {
            x: 0,
            y: 520
        },
    };
}

 /* -- Add nodes -- */
function Node(id, desc, cat, pos) {
    this.group = 'nodes';
    this.data = {
        'id': id,
        'desc' : desc,
        'cat': cat
    };
    this.position = pos;
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
    let lst = id.split('-');
    if(id.length == 8 || lst.length == 1) {
        let desc = id.length == 8 ? id.slice(0, 6) : id;
        let result = new Node(id, desc, cat, {'x': pos[cat].x*100, 'y': pos[cat].y});
        pos[cat].x++;
        return result;
    } else {
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
    nodeMap[target].position.x = nodeMap[target].position.x < nodeMap[source].position.x ?　nodeMap[target].position.x　: nodeMap[source].position.x;
    nodeMap[target].position.y = nodeMap[target].position.y < nodeMap[source].position.y ?　nodeMap[target].position.y　: nodeMap[source].position.y;
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