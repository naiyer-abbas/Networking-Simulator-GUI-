import {list_devices, End_device} from './Device.js';
import {list_hubs, Hub} from './Hub.js';
import {list_switches, Switch} from './Switch.js';
import {list_bridges, Bridge} from './Bridge.js';

        // remove connection from one end device to another end device

    export function remove_connection_end_to_end()
            {
                if(Math.max(arguments[0], arguments[1]) >= list_devices.length)
                {
                    return "invalid";
                }

                var d1 = list_devices[arguments[0]];
                var d2 = list_devices[arguments[1]];

                if(d1.port[0] != d2.get_mac_address() || d2.port[0] != d1.get_mac_address())
                {
                    return "no connection";
                }

                d1.port[0] = "-1";
                d2.port[0] = "-1";
                return "success";
            }

            // remove connection between an end device and a hub

    export  function remove_connection_hub_to_end()
            {
                if(arguments[0] >= list_hubs.length || arguments[1] >= list_devices.length)
                {
                    return "invalid";
                }
                var h = list_hubs[arguments[0]];
                var d = list_devices[arguments[1]];

                if(d.port[0] != h.serial)
                {
                    return "no connection";
                }

                var add = d.get_mac_address();

                for(var i = 0; i < h.ports.length; i++)
                {
                    if(h.ports[i] == add)
                    {
                        h.ports[i] = "-1";
                        break;
                    }
                }

                d.port[0] = "-1";
                return "success";
            }
            
            // Remove connection between a bridge and a device

    export  function remove_connection_bge_to_device()
            {
                if(arguments[0] >= list_bridges.length || arguments[1] >= list_devices.length)
                {
                    return "invalid";
                }
                
                var b = list_bridges[arguments[0]];
                var d = list_devices[arguments[1]];

                if(d.ports[0] != b.serial)
                {
                    return "no connection";
                }

                var add = d.get_mac_address();

                //search in left

                for(var i = 0; i < b.left_segment.length; i++)
                {
                    if(b.left_segment[i] == add)
                    {
                        b.left_segment[i] = "-1";
                        d.ports[0] = "-1";
                        return "success";
                    }
                }
                    // search in right 

                for(var i = 0; i < b.right_segment.length; i++)
                {
                    if(b.right_segment[i] == add)
                    {
                        b.right_segment[i] = "-1";
                        d.ports[0] = "-1";
                        return "success";
                    }
                }
            }

            // remove connection between hub and switch

    export   function remove_connection_hub_to_swt()
            {
                if(arguments[0] >= list_hubs.length || arguments[1] >= list_switches.length)
                {
                    return "invalid";
                }
                var h = list_hubs[arguments[0]];
                var s = list_switches[arguments[1]];

                var check1 = 0,check2 = 0;
                var m;
                for(var i = 0; i < h.ports.length; i++)
                {
                    if(h.ports[i] == s.serial)
                    {
                        check1=1;
                        m = i;
                        break;
                    }
                }
                for(var i = 0; i < s.ports.length; i++)
                {
                    if(s.ports[i] == h.serial)
                    {
                        check2=1;
                        break;
                    }
                }
                if(!check1 || !check2)
                {
                    return "no connection";
                }
                if(s.ports[0] == h.serial)
                {
                    for(var i = 0; i < s.left_table.length; i++)
                    {
                        s.left_table[i] = "-1";
                    }

                    s.ports[0] = "-1";
                }
                else
                {
                    for(var i = 0; i < s.right_table.length; i++)
                    {
                        s.right_table[i] = "-1";
                    }
                    s.ports[1] = "-1";
                }

                h.ports[m] = "-1";
                return "success";                
            }

            // remove connection between a device and a switch

    export  function remove_connection_switch_to_end()
            {
                if(arguments[0] >= list_switches.length || arguments[1] >= list_devices.length)
                {
                    return "invalid";
                }
                var s = list_switches[arguments[0]];
                var d = list_devices[arguments[1]];

                if(d.port[0] != s.serial)
                {
                   return "no connection";
                }

                var add = d.get_mac_address();

                for(var i = 0; i < s.ports.length; i++)
                {
                    if(s.ports[i] == add)
                    {
                        s.ports[i] = "-1";
                        s.table[i] = "-1";
                        break;
                    }
                }

                d.port[0] = "-1";
                return "success";
            }