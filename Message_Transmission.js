import { list_devices, End_device} from "./Device.js";
import {selective_rep, stop_wait, token_fail_message, token_pass_message} from './main.js'; 
import {list_hubs, Hub} from './Hub.js';
import {list_switches, Switch} from './Switch.js';
import {list_bridges, Bridge} from './Bridge.js';

    export var tokken = 1;
    export function reset_tokken()
    {
        tokken = 1;
    }
    
    export  function hub_swt_check()
            { 
                for(var i = 1; i < list_switches.length; i++)
                {
                    var found1 = 0 , found2 = 0;
                    for(var j = 0; j < list_switches[i].ports.length; j++)
                    {
                        if(arguments[0] == list_switches[i].ports[j] && found1 == 0)
                        {
                            found1 = 1;
                        }
                        if(arguments[1] == list_switches[i].ports[j] && found1 == 1)
                        {
                            found2 = 1;
                            return 1;
                        }
                    }
                }
                for(var i = 1; i < list_switches.length; i++)
                {
                    var found1 = 0 ,found2 = 0;
                    for(var j = 0; j < list_switches[i].ports.length; j++)
                    {
                        if(arguments[1] == list_switches[i].ports[j] && found1 == 0)
                        {
                            found1 = 1;
                        }
                        if(arguments[0] == list_switches[i].ports[j] && found1 == 1)
                        {
                            found2=1;
                            return 1;
                        }
                    }
                }
                return 0;
            }

    export   function which_table()
            {
                var h = arguments[0];
                var arr = [];
                var switch_number;
                
                
                
                
                for(var i = 0; i < h.ports.length; i++)
                {
                    if(h.ports[i] >= 1000 && h.ports[i] != "-1")
                    {
                        switch_number = h.ports[i] - 999;
                        break;
                    }
                }   
                

                var s = list_switches[switch_number];
                arr.push(switch_number);

                if(s.ports[0] == h.serial)
                {
                    arr.push("L");
                }

                else
                {
                    arr.push("R");
                }              
                return arr;
            }


    export function send1()
            {             
                for(var i = 1; i < list_devices.length; i++)
                {
                    list_devices[i].message = "";
                }
                

                if(Math.max(arguments[0], arguments[1]) >= list_devices.length)
                {
                    //document.getElementById("para").innerHTML += "working"; 
                    return "invalid";
                }

                

                
                

                var end_to_end = 0;

                if(list_devices[arguments[0]].port[0] == list_devices[arguments[1]].get_mac_address())
                {
                    end_to_end = 1;
                    document.getElementById("para").innerHTML += "Dedicated Connection! ";
                }

                if(arguments[0] == tokken || end_to_end)
                {
                    token_pass_message(arguments[0], arguments[1]);
                    if(arguments[3] == 1)
                    {
                        stop_wait(arguments[0],arguments[1],arguments[2]);
                    }
                    else
                    {
                        selective_rep(arguments[0],arguments[1],arguments[2]);
                    }

                    if(!end_to_end)
                    {
                        tokken++;
                        if(tokken == list_devices.length)
                        {
                            tokken = 1;
                        }
                    }
                   
                }
                
                else
                {
                    while(tokken != arguments[0])
                    {
                        token_fail_message();
                        tokken ++;
                        if(tokken == list_devices.length)
                        {
                            tokken = 1;
                        }
                    }

                    token_pass_message();
                    
                    if(arguments[3] == 1)
                    {
                        stop_wait(arguments[0],arguments[1],arguments[2]);
                    }
                    else
                    {
                        selective_rep(arguments[0],arguments[1],arguments[2]);
                    }
                }
            }

    export  function send_message()
            {

                /*if(Math.max(arguments[0], arguments[1]) >= list_devices.length)
                {
                    return "invalid";
                }*/

                var x = list_devices[arguments[0]];
                var y = list_devices[arguments[1]];

                if(x.port[0] >= 100 && x.port[0] < 1000 && y.port[0] >= 100 && y.port[0] < 1000 && hub_swt_check(x.port[0],y.port[0]))
                {
                    if(x.port[0] != y.port[0])
                    {
                        var h1 = list_hubs[x.port[0] - 99];
                        var h2 = list_hubs[y.port[0] - 99];
                        for(var i = 0; i < h1.ports.length; i++)
                        {
                            if(h1.ports[i] != "-1" && h1.ports[i] != x.get_mac_address())
                            {
                                for(var j = 1; j < list_devices.length; j++)
                                {
                                    if(list_devices[j].get_mac_address() == h1.ports[i])
                                    {
                                        list_devices[j].message += arguments[2];
                                    }
                                }
                            }
                        }

                        for(var i = 0; i < h2.ports.length; i++)
                        {
                            if(h2.ports[i] != "-1" && h2.ports[i] != x.get_mac_address())
                            {
                                for(var j = 1; j < list_devices.length; j++)
                                {
                                    if(list_devices[j].get_mac_address() == h2.ports[i])
                                    {
                                        list_devices[j].message += arguments[2];
                                    }
                                }
                            }
                        }
                    }

                    else
                    {
                        
                        var h = list_hubs[x.port[0] - 99];
                        var d = which_table(h);
                        var s = list_switches[d[0]];
                        var mark = 0;
                        

                        for(var i = 0; i < s.left_table.length; i++)
                        {
                            if(y.get_mac_address() == s.left_table[i])
                            {
                                mark = 1;
                                for(var j = 1; j < list_devices.length; j ++)
                                {
                                    if(list_devices[j].port[0] == h.serial && j != arguments[0])
                                    {
                                        list_devices[j].message += arguments[2];
                                    }
                                }

                                break;
                            }

                        }

                        for(var i = 0; i < s.right_table.length; i++)
                        {
                            if(y.get_mac_address() == s.right_table[i])
                            {
                                mark = 1;
                                for(var j = 1; j < list_devices.length; j ++)
                                {
                                    if(list_devices[j].port[0] == h.serial && j != arguments[0])
                                    {
                                        list_devices[j].message += arguments[2];
                                    }
                                }
                                break;
                            }
                        }

                        

                        if(!mark)
                        { 
                            
                            var left = list_hubs[s.ports[0] - 99];
                            var right = list_hubs[s.ports[1] - 99];

                            for(var i = 1; i < list_devices.length; i++)
                            {
                                if((i != arguments[0]) && (list_devices[i].port[0] == left.serial || list_devices[i].port[0] == right.serial))
                                {
                                    list_devices[i].message += arguments[2];
                                }
                            }
                        }
                        


                    }

                    // updation

                    var h1 = list_hubs[x.port[0] - 99];
                    var arr = which_table(h1);
                    var ok = 0;
                    
                    
                    

                    if(arr[1] == "L")
                    {
                        for(var i = 0; i < list_switches[arr[0]].left_table.length; i++)
                        {
                            if(list_switches[arr[0]].left_table[i] == x.get_mac_address())
                            {
                                ok = 1;
                                break;
                            }
                        }


                        if(!ok)
                        {
                            for(var i = 0; i < list_switches[arr[0]].left_table.length; i++)
                            {
                                if(list_switches[arr[0]].left_table[i] == "-1")
                                {
                                    list_switches[arr[0]].left_table[i] = x.get_mac_address();
                                    break;
                                }

                            }
                        }
                        
       
                    }


                    else
                    {
                        for(var i = 0; i < list_switches[arr[0]].right_table.length; i++)
                        {
                            if(list_switches[arr[0]].right_table[i] == x.get_mac_address())
                            {
                                ok = 1;
                                break;
                            }
                        }

                        if(!ok)
                        {
                            for(var i = 0; i < list_switches[arr[0]].right_table.length; i++)
                            {
                                if(list_switches[arr[0]].right_table[i] == "-1")
                                {
                                    list_switches[arr[0]].right_table[i] = x.get_mac_address();
                                    break;
                                }
                            } 
                        }

                        
                    }

                    var h2 = list_hubs[y.port[0] - 99];
                    

                    var arr2 = which_table(h2);
                    ok = 0;

                    if(arr2[1] == "L")
                    {
                        for(var i = 0; i < list_switches[arr2[0]].left_table.length; i++)
                        {
                            if(list_switches[arr2[0]].left_table[i] == y.get_mac_address())
                            {
                                ok = 1;
                                break;
                            }
                        }
                        

                        if(!ok)
                        {
                            for(var i = 0; i < list_switches[arr2[0]].left_table.length; i++)
                            {
                                if(list_switches[arr2[0]].left_table[i] == "-1")
                                {
                                    list_switches[arr2[0]].left_table[i] = y.get_mac_address();
                                    break;
                                }
                            }
                        }

                        

                       
                    }

                    else
                    {
                        for(var i = 0; i < list_switches[arr2[0]].right_table.length; i++)
                        {
                            if(list_switches[arr2[0]].right_table[i] == y.get_mac_address())
                            {
                                ok = 1;
                                break;
                            }
                        }

                        if(!ok)
                        {
                            for(var i = 0; i < list_switches[arr2[0]].right_table.length; i++)
                            {
                                if(list_switches[arr2[0]].right_table[i] == "-1")
                                {
                                    list_switches[arr2[0]].right_table[i] = y.get_mac_address();
                                    break;
                                }
                            }
                        }

                         
                    }


                }

               else if(x.port[0] == y.port[0] && x.port != "-1")
                {
                    if(x.port[0] >= 100 && x.port[0] <1000)
                    {
                        var h = list_hubs[x.port[0] - 99];
                        for(var i = 1; i < list_devices.length; i++)
                        {
                            if(list_devices[i].port[0] == h.serial && i != arguments[0])
                            {
                                list_devices[i].message += arguments[2];
                            }
                        }
                    }
                    else if(x.port[0] >= 1000)
                    {
                        var s = list_switches[x.port[0] - 999];
                        for(var i = 0; i < s.ports.length; i++)
                        {
                            if(s.ports[i] == x.get_mac_address())
                            {
                               s.table[i] = x.get_mac_address();
                               break; 
                            }
                        }

                        for(var i = 0; i < s.ports.length; i++)
                        {
                            if(s.ports[i] == y.get_mac_address())
                            {
                               if(s.table[i] != "-1")
                               {
                                   y.message += arguments[2];
                                   return;
                               } 
                            }
                        }

                        

                        
                    
                            for(var i = 0; i < s.table.length; i++)
                            {
                                if(s.table[i] == "-1" && s.ports[i] != "-1")
                                {
                                    for(var j = 1; j < list_devices.length; j++)
                                    {
                                        if(list_devices[j].get_mac_address() == s.ports[i])
                                        {
                                            list_devices[j].message += arguments[2];
                                            break;
                                        }
                                    }
                                }
                            }
                            
                        for(var i = 0; i < s.ports.length; i++)
                        {
                            if(s.ports[i] == y.get_mac_address())
                            {
                               s.table[i] = y.get_mac_address();
                               break; 
                            }
                        }
                    }
                    else
                    {
                        var b = list_bridges[x.port[0]];
                        var m=0,n=0;
                        for(var i = 0 ; i < b.left_segment.length ; i++)
                        {
                            if(x.get_mac_address() == b.left_segment[i])
                            {
                                m=1;
                                break;
                            }
                        }
                        for(var i = 0 ; i < b.left_segment.length ; i++)
                        {
                            if(y.get_mac_address() == b.left_segment[i])
                            {
                                n=1;
                                break;
                            }
                        }
                        if(m == n)
                        {
                            if(m == 1)
                            {
                                for(var i = 0; i < b.left_segment.length; i++)
                                {
                                    for(var j = 1; j < list_devices.length; j++)
                                    {
                                        if(b.left_segment[i] == list_devices[j].get_mac_address() && list_devices[j].get_mac_address() != x.get_mac_address())
                                        {
                                            list_devices[j].message += arguments[2];
                                        }
                                    }
                                }
                            }
                            else
                            {
                                for(var i = 0; i < b.right_segment.length; i++)
                                {
                                    for(var j = 1; j < list_devices.length; j++)
                                    {
                                        if(b.right_segment[i] == list_devices[j].get_mac_address() && list_devices[j].get_mac_address() != x.get_mac_address())
                                        {
                                            list_devices[j].message += arguments[2];
                                        }
                                    }
                                }
                            }
                        }
                        else
                        {
                            for(var i = 1;i < list_devices.length; i++)
                            {
                                if(i != arguments[0])
                                {
                                    if(list_devices[i].port[0] == b.serial)
                                    {
                                        list_devices[i].message += arguments[2];
                                    }
                                }
                            }
                        }
                    }
                }

                else if(x.port[0] == y.get_mac_address() && y.port[0] == x.get_mac_address())
                {
                    y.message += arguments[2];
                }
                
               /* else
                {
                    return "no connection";
                }*/
            }
