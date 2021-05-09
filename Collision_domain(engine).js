import{list_switches, Switch, create_switch} from "./Switch.js";
import {list_devices, End_device} from './Device.js';
import {list_hubs, Hub} from './Hub.js';
import {list_bridges, Bridge} from './Bridge.js';
import {switch_to_switch} from './make_connections.js'
export var vis = [];
            for(var i = 0; i < 1100; i++)
            {
                vis.push("-1");
            }

   export  function calculate_CD()
            {
                if(list_switches.length == 1)
                {
                    return 1;
                }
                
                if(arguments[0] == "-1")
                {
                    return 0;
                }

                if(arguments[0] >= 100 && arguments[0] < 1000)
                {
                    return 1;
                }

                if(arguments[0] >= 1000 && vis[arguments[0]] != "-1")
                {
                    return 0;
                }


                if(arguments[0] >= 1000)
                {
                    var sum = 0;
                    vis[arguments[0]] = 1;
                    for(var i = 0; i < list_switches[arguments[0] - 999].ports.length; i++)
                    {
                        sum += calculate_CD(list_switches[arguments[0] - 999].ports[i]);
                    }

                    return sum;
                }

                else
                {
                    return 1;
                }
            }

