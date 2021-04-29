export var C_switch = 1;
 export var list_switches = [];
        list_switches.push(-1);

    export class Switch
        {
            constructor()
            {
                this.ports = ["-1", "-1", "-1", "-1", "-1", "-1", "-1","-1", "-1", "-1", "-1", "-1", "-1", "-1"];
                this.table = ["-1", "-1", "-1", "-1", "-1", "-1", "-1","-1", "-1", "-1", "-1", "-1", "-1", "-1"];
                this.serial = C_switch + 999;
                this.left_table = ["-1", "-1", "-1", "-1", "-1", "-1"];
                this.right_table = ["-1", "-1", "-1", "-1", "-1", "-1"];
                C_switch ++;
            }
            
            is_port_vacant()
            {
                for(var i = 0; i < this.ports.length; i++)
                {
                    if(this.ports[i] == "-1")
                    {
                        return 1;
                    }
                }
                return 0;
            }
        }


      export function create_switch()
        {
            let s = new Switch();
            list_switches.push(s);
        }

    export function reset_switches()
    {
        list_switches = ["-1"];
        C_switch = 1;
    }    

