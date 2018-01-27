// Resize canvas to full screen
var canvas    = document.getElementById("gui-canvas");




var n_joints = 2;
var joint_radius =  15;
var joints       =  [];
var dragging_idx = -1;
var joint_color  = "red";

for (var i = 0; i < n_joints; i++) {
    joints[i] = 
        new Path.Circle(
            new Point(
                canvas.width*Math.random(), 
                canvas.height*Math.random()),
                joint_radius);
    joints[i].fillColor = joint_color;
}



function onMouseDrag(event) {
    for (var i = 0; i < n_joints; i++) {
        if (joints[i].contains(event.point)) {
            dragging_idx = i;
            break;
        }
    }

    if (dragging_idx > -1) {
        joints[dragging_idx].position = event.point;
    }
}
function onMouseUp(event) {
    dragging_idx = -1;
}

var segment_layer = new Layer();
var path = new Path.Line();
function onFrame(event) {
    path.remove();
    var from = joints[0].position;
    var to   = joints[1].position;
    path = new Path.Line(from, to)
    path.strokeColor = "black";
    path.strokeWidth = 5;
}
