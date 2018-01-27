// Resize canvas to full screen
var canvas = document.getElementById("gui-canvas");
var status_span = document.getElementById("gui-status");

function status(text) {
    status_span.innerHTML = text;
}




var n_grid_boxes = 20;

var joint_radius =  23;
var joints       =  [];
var dragging_idx = -1;

var joint_stroke_width    = 3;
var joint_color           = "#ff0000";
var joint_color_highlight = "#ff6666";

var segment_width         = 10;
var segment_color         = "#333333";

/*  */
function add_joint(point) {
    joints.push(new Path.Circle(point, joint_radius));
    new_joint_idx = joints.length - 1;
    joints[new_joint_idx].onMouseEnter = function(event) {
        this.fillColor = joint_color_highlight;
    }
    joints[new_joint_idx].onMouseLeave = function(event) {
        this.fillColor = joint_color;
    }
    joints[new_joint_idx].fillColor = joint_color;
}

/*  */
function remove_joint(point) {
    for (var i = 0; i < joints.length; i++) {
        if (joints[i].contains(point)) {
            joints[i].remove();
            joints.splice(i, 1);
        }
    }
}






/* Default joints on start. */
for (var i = 0; i < 2; i++) {
    add_joint(new Point(canvas.width*Math.random(), canvas.height*Math.random()));
}


/* Parse keyboard input for GUI */
var key_attach          = 'a';
var key_detach          = 'd';
var key_remove          = 'r';
var key_attaching_joint = false;
var key_detaching_joint = false;
var key_removing_joint  = false;
function onKeyDown(event) {
    if (event.key == key_attach) {
        key_attaching_joint = true;
        status("Attach joint");
    } else if (event.key == key_detach) {
        key_detaching_joint = true;
        status("Detach joint");
    } else if (event.key == key_remove) {
        key_removing_joint = true;
        status("Remove joint");
    }
}
function onKeyUp(event) {
    if (event.key == key_attach) {
        key_attaching_joint = false;
        status("");
    } else if (event.key == key_detach) {
        key_detaching_joint = false;
        status("");
    } else if (event.key == key_remove) {
        key_removing_joint = false;
        status("");
    }
}



/*  */
function onMouseDown(event) {
    if (key_attaching_joint) {
        add_joint(event.point);
        key_attaching_joint = false;
    }
    if (key_detaching_joint) {
        console.log("detach");
    }
    if (key_removing_joint) {
        remove_joint(event.point);
        key_removing_joint = false;
    }

}

function onMouseDrag(event) {
    if (joints.length == 0) return;
    for (var i = 0; i < joints.length; i++) {
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


/* Animate everything */
var segment_layer = new Layer();
var path = new Path.Line();
function onFrame(event) {
    
    // Connect the dots
    path.remove();
    var from = joints[0].position;
    var to   = joints[1].position;
    path = new Path.Line(from, to)
    path.strokeColor = segment_color;
    path.strokeWidth = segment_width;
}


