window.addEventListener('load', function() {
    
    //Fetch our canvas
    var canvas = document.getElementById('world');
    
    //Setup Matter JS
    var engine = Matter.Engine.create();
    var world = engine.world;
    var render = Matter.Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: 500,
            height: 500,
            background: 'transparent',
            wireframes: false,
            showAngleIndicator: false
        }
    });

    var bodyCategory = 0x0001,
        worldCategory = 0x0002;
    
    var boxOptionsA = {
            label: 'boxA',
            collisionFilter: {
                mask: worldCategory 
            },
            chamfer: {
                radius: 10
            },
            render: {
                fillStyle: '#FFFFFF'
            }
        };

    var boxOptionsB = {
            label: 'boxB',
            collisionFilter: {
                mask: worldCategory 
            },
            chamfer: {
                radius: 10
            },
            render: {
                fillStyle: '#FFFFFF'
            }
        };

    var boxW = 20;
    var boxH = 100;

    // create two boxes and a ground
    var boxA = Matter.Bodies.rectangle(200, 200, boxW, boxH, boxOptionsA);
    var boxB = Matter.Bodies.rectangle(200, 200, boxW, boxH,  boxOptionsB);

    // create the link between the two boxes
    var link = Matter.Constraint.create({
            bodyA: boxA,
            pointA: {
                x: 0,
                y: (boxH-boxW)/2
            },
            pointB: {
                x: 0,
                y: (boxH-boxW)/2
            },
            bodyB: boxB,
            stiffness: 0.6,
            render: {
                visible: true,
                type: 'pin'
            }
        });

    dude = Matter.Composite.create({
        bodies:[boxA, boxB],
        constraints:[link]
    });
    Matter.World.add(world, dude);
    
    //Add a floor
    var floor = Matter.Bodies.rectangle(250, 520, 500, 40, {
        isStatic: true, //An immovable object
        collisionFilter: {
            mask: worldCategory 
        },
        render: {
            visible: false
        }
    });
    Matter.World.add(world, floor);
    
    //Make interactive
    var mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
        element: canvas,
        constraint: {
            render: {
                visible: false
            },
            stiffness:0.8
        }
    });
    Matter.World.add(world, mouseConstraint);

    // mouseConstraint.collisionFilter.mask = worldCategory
    
    //Start the engine
    Matter.Engine.run(engine);
    Matter.Render.run(render);
    
});