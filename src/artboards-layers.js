const sketch = require('sketch/dom')
const ui = require('sketch/ui')

let doc = sketch.getSelectedDocument()

var artboards = {}

function getLayers(layer, artboard_id) {
  artboards[artboard_id]['layers_count'] += 1
  sublayers = layer.layers
  if (typeof sublayers != "undefined") {
    for (var s of sublayers) {
      getLayers(s, artboard_id)
    }
  }
}

for (var p of doc.pages) {
  for (var l of p.layers) {
    if (l.type == 'Artboard') {
      artboards[l.id] = {'name': l.name, 'layers_count': 0}
      for (var al of l.layers) {
        getLayers(al, l.id)
      }
    }
  }
}

msg = ""
for (var a in artboards) {
  artboard_msg = artboards[a]['name'] + ': ' + artboards[a]['layers_count']
  msg = msg + artboard_msg + "\n"
  console.log(artboard_msg)
}
ui.alert("Layers per artboard", msg)
