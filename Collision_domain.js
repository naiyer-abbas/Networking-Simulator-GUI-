import { create_bridge, C_bridge, Bridge } from './Bridge.js';
import { create_end_device, C_device} from './Device.js';
import { create_hub, C_hub, Hub } from './Hub.js';
import { create_switch, C_switch, Switch } from './Switch.js';
import { make_connection_device_to_device, make_connection_hub_to_device, make_connection_switch_to_device, connect_device_to_left, connect_device_to_right, make_connection_hub_to_switch, switch_to_switch, reset } from './make_connections.js';
import { remove_connection_bge_to_device, remove_connection_end_to_end, remove_connection_hub_to_end, remove_connection_hub_to_swt, remove_connection_switch_to_end } from './remove_connections.js';
import { calculate_CD } from './Collision_domain(engine).js';


var b1 = document.getElementById("btn1");
var b2 = document.getElementById("btn2");
var b3 = document.getElementById("btn3");
var b4 = document.getElementById("btn4");

var t1 = document.getElementById("count1");
var t2 = document.getElementById("count2");
var t3 = document.getElementById("count3");
var t4 = document.getElementById("count4");

t1.innerText = 0;
t2.innerText = 0;
t3.innerText = 0;
t4.innerText = 0;

function increase_devices()
{
    create_end_device();
    t1.innerText = C_device - 1;
}

function increase_hubs()
{
    create_hub();
    t2.innerText = C_hub - 1;
}

function increase_switches()
{
    create_switch();
    t3.innerText = C_switch - 1;
}

function increase_bridges()
{
    create_bridge();
    t4.innerText = C_bridge - 1;
}

b1.onclick = increase_devices;
b2.onclick = increase_hubs;
b3.onclick = increase_switches;
b4.onclick = increase_bridges;


var ok1 = document.getElementById("hub_to_device_connection");
var ok2 = document.getElementById("switch_to_device_connection");
var ok3 = document.getElementById("hub_to_switch_connection");
var ok4 = document.getElementById("switch_to_switch_connection");

var ok5 = document.getElementById("CD_button");


function hub_to_end()
{
    var check = make_connection_hub_to_device(document.getElementById("hub_to_dev1").value, document.getElementById("hub_to_dev2").value);
    if(check == "invalid")
    {
        alert("Invalid Entries");
    }

    else if(check == "no port")
    {
        alert("Ports are full");
    }

    else
    {
        alert("success");
    }
}

function switch_to_end()
{
    var check = make_connection_switch_to_device(document.getElementById("switch_to_dev1").value, document.getElementById("switch_to_dev2").value);
    if(check == "invalid")
    {
        alert("Invalid Entries");
    }

    else if(check == "no port")
    {
        alert("Ports are full");
    }

    else
    {
        alert("success");
    }
}



function hub_to_switch()
{
    var check1 = make_connection_hub_to_switch(document.getElementById("hub_to_switch1").value, document.getElementById("hub_to_switch2").value);
    if(check1 == "invalid")
    {
        alert("Invalid Entries");
    }

    else if(check1 == "no port")
        {
            alert("Ports are full");
        }

        else
        {
            alert("success");
        }

}

function switch_to_switch_()
{
    var check = switch_to_switch(document.getElementById("switch_to_switch1").value, document.getElementById("switch_to_switch2").value);
    if(check == "invalid")
    {
        alert("Invalid Entries");
    }

    else if(check == "no port")
        {
            alert("Ports are full");
        }

        else
        {
            alert("success");
        }
}

function reset_everything()
{
    reset();
    t1.innerText = 0;
    t2.innerText = 0;
    t3.innerText = 0;
    t4.innerText = 0;
    res.innerText = 0;

    document.getElementById("hub_to_dev1").value = null;
    document.getElementById("hub_to_dev2").value = null;
    document.getElementById("switch_to_dev1").value = null;
    document.getElementById("switch_to_dev2").value = null;
    document.getElementById("hub_to_switch1").value = null;
    document.getElementById("hub_to_switch2").value = null;
    document.getElementById("switch_to_switch1").value = null;
    document.getElementById("switch_to_switch2").value = null;
}


var res = document.getElementById("CD_count");

function show_collisions()
{
    res.innerText = calculate_CD(1000);
}

ok1.onclick = hub_to_end;
ok2.onclick = switch_to_end;
ok3.onclick = hub_to_switch;
ok4.onclick = switch_to_switch_;
ok5.onclick = show_collisions;

document.getElementById("reset_button").onclick = reset_everything;
