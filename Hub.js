export var C_hub = 1;
export var list_hubs = [];
    list_hubs.push(-1);

export class Hub           
            {
                constructor()
                {
                    this.ports = ["-1", "-1", "-1", "-1", "-1", "-1"];
                    this.serial = C_hub + 99;
                    C_hub++;
                }

                is_hport_vacant()
                {
                    for(var i = 0; i < 6; i++)
                    {
                        if(this.ports[i] == "-1")
                        {
                            return 1;
                        }
                    }

                    return 0;
                }
            }

           export function create_hub()           // creates a hub
            {
                let hub = new Hub();
                list_hubs.push(hub);
            }

            export function reset_hubs()
            {
                list_hubs = ["-1"];
                C_hub = 1;
            }  