import {list_devices, End_device, reset_devices} from './Device.js';
import {list_hubs, Hub, reset_hubs} from './Hub.js';
import {list_switches, Switch, reset_switches, } from './Switch.js';
import {list_bridges, Bridge, reset_bridges} from './Bridge.js';
//import {reset_log} from './main.js';
//import {reset_tokken} from './Message_Transmission.js';

    

    export function make_connection_device_to_device()     // device to device connection
            {
                if(arguments[0] >= list_devices.length  || arguments[1] >= list_devices.length)
                {
                    return "invalid";
                }

                var d1 = list_devices[arguments[0]];
                var d2 = list_devices[arguments[1]];

                var x = d1.is_port_vacant();
                var y = d2.is_port_vacant();

                if(x && y)
                {
                    d1.port[0] = d2.get_mac_address();
                    d2.port[0] = d1.get_mac_address();
                    return "success";
                }

                else
                {
                    return "no port";
                }
            }

    export function make_connection_hub_to_device()    // hub to device connection
            {
                if(arguments[0] >= list_hubs.length || arguments[1] >= list_devices.length)
                {
                    return "invalid";
                }

                var h = list_hubs[arguments[0]];
                var d = list_devices[arguments[1]];

                var x = d.is_port_vacant();
                var y = h.is_hport_vacant();

                if(x && y)
                {
                    for(var i = 0; i < h.ports.length; i++)
                    {
                        if(h.ports[i] == "-1")
                        {
                            h.ports[i] = d.get_mac_address();
                            break;
                        }
                    }
                    d.port[0] = h.serial;
                    return "success";
                }
                
                else
                {
                    return "no port";
                }
            }
            
    export function make_connection_switch_to_device()    // switch to device connection
            {
                if(arguments[0] >= list_switches.length || arguments[1] >= list_devices.length)
                {
                    return "invalid";
                }

                var s = list_switches[arguments[0]];
                var d = list_devices[arguments[1]];

                var x = d.is_port_vacant();
                var y = s.is_port_vacant();

                if(x && y)
                {
                    for(var i = 0; i < s.ports.length; i++)
                    {
                        if(s.ports[i] == "-1")
                        {
                            s.ports[i] = d.get_mac_address();
                            break;
                        }
                    }
                    d.port[0] = s.serial;
                    return "success";
                }
                
                else
                return "no port";
            }

    export function connect_device_to_left()   // connect device to left segment
            {
                if(arguments[0] >= list_bridges.length || arguments[1] >= list_devices.length)
                {
                    return "invalid";
                }

                var b = list_bridges[arguments[0]];
                var d = list_devices[arguments[1]];

                if(!d.is_port_vacant() || !b.is_ls())
                {
                    return "no port";
                }

                d.port[0] = b.serial;
                for(var i = 0; i < b.left_segment.length; i++)
                {
                    if(b.left_segment[i] == "-1")
                    {
                        b.left_segment[i] = d.get_mac_address();
                        return "success";
                    }
                }
            }

    export function connect_device_to_right()   // connect device to right segment
            {
                if(arguments[0] >= list_bridges.length || arguments[1] >= list_devices.length)
                {
                    return "invalid";
                }

                var b = list_bridges[arguments[0]];
                var d = list_devices[arguments[1]];

                if(!d.is_port_vacant() || !b.is_rs())
                {
                    return "no port";
                }

                d.port[0] = b.serial;
                for(var i = 0; i < b.right_segment.length; i++)
                {
                    if(b.right_segment[i] == "-1")
                    {
                        b.right_segment[i] = d.get_mac_address();
                        return "success";
                    }
                }
            }

    export  function make_connection_hub_to_switch()
            {
                if(arguments[0] >= list_hubs.length || arguments[1] >= list_switches.length)
                {
                    return "invalid";
                }
                var h = list_hubs[arguments[0]];
                var s = list_switches[arguments[1]];

                var x = h.is_hport_vacant();
                var y = s.is_port_vacant();

                if(x && y)
                {
                    for(var i = 0; i < h.ports.length; i++)
                    {
                        if(h.ports[i] == "-1")
                        {
                            h.ports[i] = s.serial;
                            break;
                        }
                    }
                    for(var i = 0; i < s.ports.length; i++)
                    {
                        if(s.ports[i] == "-1")
                        {
                            s.ports[i] = h.serial;
                            break;
                        }
                    }

                    return "success";
                }

                else
                {
                    return "no port";
                }
                
            }

    export  function switch_to_switch()
            {
                if(Math.max(arguments[0], arguments[1]) >= list_switches.length)
                {
                    return "invalid";
                }

                var s1 = list_switches[arguments[0]];
                var s2 = list_switches[arguments[1]];

                var x = s1.is_port_vacant();
                var y = s2.is_port_vacant();

                if(x && y)
                {
                    for(var i = 0; i < s1.ports.length; i++)
                    {
                        if(s1.ports[i] == "-1")
                        {
                            s1.ports[i] = s2.serial;
                            break;
                        }
                    }

                    for(var i = 0; i < s2.ports.length; i++)
                    {
                        if(s2.ports[i] == "-1")
                        {
                            s2.ports[i] = s1.serial;
                            return "success";
                        }
                    }
                }

                return "no port";
            }

    export  function reset()
            {
                reset_switches();
                reset_hubs();
                reset_bridges();
                reset_devices();
                //reset_log();
                //reset_tokken();
            }

