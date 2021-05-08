import { create_bridge, C_bridge, Bridge } from './Bridge.js';
import { create_end_device, C_device, End_device, list_devices} from './Device.js';
import { create_hub, C_hub, Hub } from './Hub.js';
import { create_switch, C_switch, Switch } from './Switch.js';
import { make_connection_device_to_device, make_connection_hub_to_device, make_connection_switch_to_device, connect_device_to_left, connect_device_to_right, make_connection_hub_to_switch, reset } from './make_connections.js';
import { remove_connection_bge_to_device, remove_connection_end_to_end, remove_connection_hub_to_end, remove_connection_hub_to_swt, remove_connection_switch_to_end } from './remove_connections.js';
import {send_message, send1} from './Message_Transmission.js';


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


var ok1 = document.getElementById("device_to_device_connection");
var ok2 = document.getElementById("hub_to_device_connection");
var ok3 = document.getElementById("switch_to_device_connection");
var ok4 = document.getElementById("bridge_to_device_connection");
var ok5 = document.getElementById("hub_to_switch_connection");

function end_to_end()
{
    var check = make_connection_device_to_device(document.getElementById("dev_to_dev1").value, document.getElementById("dev_to_dev2").value);
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

function bridge_to_end()
{
    if(document.getElementById("segment").value == "L" || document.getElementById("segment").value == "l")
    {
        var check = connect_device_to_left(document.getElementById("bridge_to_dev1").value, document.getElementById("bridge_to_dev2").value);
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

    else if(document.getElementById("segment").value == "R" || document.getElementById("segment").value == "r")
    {
        var check = connect_device_to_right(document.getElementById("bridge_to_dev1").value, document.getElementById("bridge_to_dev2").value);
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

    else
    {
        alert("Wrong segment entered");
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

ok1.onclick = end_to_end;
ok2.onclick = hub_to_end;
ok3.onclick = switch_to_end;
ok4.onclick = bridge_to_end;
ok5.onclick = hub_to_switch;

var R_ok1 = document.getElementById("R_device_to_device_connection");
var R_ok2 = document.getElementById("R_hub_to_device_connection");
var R_ok3 = document.getElementById("R_switch_to_device_connection");
var R_ok4 = document.getElementById("R_bridge_to_device_connection");
var R_ok5 = document.getElementById("R_hub_to_switch_connection");

function R_end_to_end()
{
    var check = remove_connection_end_to_end(document.getElementById("R_dev_to_dev1").value, document.getElementById("R_dev_to_dev2").value);
    if(check == "invalid")
    {
        alert("Invalid Entries");
    }

    else if(check == "no connection")
    {
        alert("No such connection exists");
    }

    else
    {
        alert("Connection Removed!");
    }
}

function R_hub_to_end()
{
    var check = remove_connection_hub_to_end(document.getElementById("R_hub_to_dev1").value, document.getElementById("R_hub_to_dev2").value);
    if(check == "invalid")
    {
        alert("Invalid Entries");
    }

    else if(check == "no connection")
    {
        alert("No such connection exists");
    }

    else
    {
        alert("Connection Removed!");
    }
}

function R_switch_to_end()
{
    var check = remove_connection_switch_to_end(document.getElementById("R_switch_to_dev1").value, document.getElementById("R_switch_to_dev2").value);
    if(check == "invalid")
    {
        alert("Invalid Entries");
    }

    else if(check == "no connection")
    {
        alert("No such connection exists");
    }

    else
    {
        alert("Connection Removed!");
    }
}

function R_bridge_to_end()
{
    var check = remove_connection_bge_to_device(document.getElementById("R_bridge_to_dev1").value, document.getElementById("R_bridge_to_dev2").value);
    if(check == "invalid")
    {
        alert("Invalid Entries");
    }

    else if(check == "no connection")
    {
        alert("No such connection exists");
    }

    else
    {
        alert("Connection Removed!");
    }
}

function R_hub_to_switch()
{
    var check = remove_connection_hub_to_swt(document.getElementById("R_hub_to_hub1").value, document.getElementById("R_hub_to_hub2").value);
    if(check == "invalid")
    {
        alert("Invalid Entries");
    }

    else if(check == "no connection")
    {
        alert("No such connection exists");
    }

    else
    {
        alert("Connection Removed!");
    }
}

function reset_everything()
{
    reset();
    t1.innerText = 0;
    t2.innerText = 0;
    t3.innerText = 0;
    t4.innerText = 0;
    document.getElementById("dev_to_dev1").value = null;
    document.getElementById("dev_to_dev2").value = null;
    document.getElementById("hub_to_dev1").value = null;
    document.getElementById("hub_to_dev2").value = null;
    document.getElementById("switch_to_dev1").value = null;
    document.getElementById("switch_to_dev2").value = null;
    document.getElementById("bridge_to_dev1").value = null;
    document.getElementById("bridge_to_dev2").value = null;
    document.getElementById("segment").value = null;
    document.getElementById("hub_to_switch1").value = null;
    document.getElementById("hub_to_switch2").value = null;
}

var Reset = document.getElementById("reset_button");
Reset.onclick = reset_everything;

R_ok1.onclick = R_end_to_end;
R_ok2.onclick = R_hub_to_end;
R_ok3.onclick = R_switch_to_end;
R_ok4.onclick = R_bridge_to_end;
R_ok5.onclick = R_hub_to_switch;

export  function stop_wait()
            {
                for(var i = 0; i < arguments[2].length; i++)
                {
                    var ranDom = Math.random();
                    var x;
                        if(i % 2 == 0)
                        {
                            x = 0;
                        }

                        else
                        {
                            x = 1;
                        }

                    document.getElementById("para").innerHTML += " <br><br> Sequence no. is " + x + " . Sending packet " + i + " ....";
                    if(ranDom >= 0.3)
                    {
                        send_message(arguments[0],arguments[1],arguments[2].charAt(i));
                        document.getElementById("para").innerHTML += " <br><br> Packet " + (i) + " sent successfully .... "  + "Ack "+ (1 - x) + " received from device " + arguments[1] + " ...";
                    }
                    else
                    {
                        document.getElementById("para").innerHTML += " <br><br> Timeout occured.Sending frame " + (i) + " again.....";
                        i--;
                    }
                }
            }

export  function selective_rep()
            {
                var sender_window=[];
                var receiver_window=[];
                var window_size = 4;
                var sf = 0, sn = 0;
                for(var i = 0; i < arguments[2].length; i++)
                {
                    sender_window.push("-1");
                    receiver_window.push("-1");
                }
                var n = arguments[2].length;
                while(n)
                {
                    var check = 0;
                    while(sn <= sf + 3)
                    {
                        if(sender_window[sn] == "-1")
                        {
                            var ranDom = Math.random();
                            if(ranDom >= 0.3)
                            {
                                sender_window[sn] = 1;
                                receiver_window[sn] = 1;
                                send_message(arguments[0],arguments[1],arguments[2].charAt(sn));
                                document.getElementById("para").innerHTML += " <br><br> Packet "+ (sn) + " received successfully ....Sending next packet ";
                                n--;
                                if(n == 0)
                                {
                                    document.getElementById("para").innerHTML += "<br><br> Message transmission successful. Packets sent : " + arguments[2].length;
                                    return;
                                }

                            }
                            else
                            {
                                if(!check)
                                {
                                    sf = sn;
                                    document.getElementById("para").innerHTML += " <br><br> First outstanding packet "+ (sf) + " .... "
                                    check = 1;
                                }
                                document.getElementById("para").innerHTML += " <br><br> Packet " +(sn)+ " failed.Sending next packet... "
                            }
                        }

                        sn ++;
                        if(sn >= arguments[2].length)
                        {
                            break;
                        }
                        
                    }
                    if(sn >= sf + 3 || sn >= arguments[2].length) // timeout occurs here
                        {
                            sn = sf;
                        }
                }

            }

/*export  function selective_rep()
            {
                var sender_window=[];
                var receiver_window=[];
                var window_size = 4;
                var sf = 0, sn = 0;
                for(var i = 0; i < arguments[2].length; i++)
                {
                    sender_window.push("-1");
                    receiver_window.push("-1");
                }
                var n = arguments[2].length;
                while(n)
                {
                    var check = 0;
                    for(sn = 0; sn < arguments[2].length; sn++)
                    {
                        if(sender_window[sn] == "-1")
                        {
                            var ranDom = Math.random();
                            if(ranDom >= 0.3)
                            {
                                sender_window[sn] = 1;
                                receiver_window[sn] = 1;
                                send_message(arguments[0],arguments[1],arguments[2].charAt(sn));
                                document.getElementById("para").innerHTML += " <br><br> Packet "+ (sn) + " received successfully ....Sending next packet ";
                                n--;
                            }
                            else
                            {
                                if(!check)
                                {
                                    sf = sn;
                                    document.getElementById("para").innerHTML += " <br><br> First outstanding packet "+ (sf) + " .... "
                                    check = 1;
                                }
                                document.getElementById("para").innerHTML += " <br><br> Packet " +(sn)+ " failed.Sending next packet... "
                            }
                        }
                    }
                }
            }*/


var send_button = document.getElementById("send_button");
var option1 = document.getElementById("fc1");



function transmit()
{
    if(option1.checked)
    {
         var check = send1(document.getElementById("device1").value, document.getElementById("device2").value, document.getElementById("message").value, 1);
         if(check == "invalid")
         {alert("invalid Entries");}
    }

    else
    {
        var check = send1(document.getElementById("device1").value, document.getElementById("device2").value, document.getElementById("message").value, 2);
        if(check == "invalid")
        {
            alert("Invalid Entries");
        }
    }

    for(var i = 1; i < list_devices.length; i++)
    {
        if(list_devices[i].message != "")
        {
            document.getElementById("para").innerHTML += "<br><br> Device number : " + i + "  ( " +  list_devices[i].get_mac_address() + " ) :  " + list_devices[i].message;
        }   
    }

}

send_button.onclick = transmit;









