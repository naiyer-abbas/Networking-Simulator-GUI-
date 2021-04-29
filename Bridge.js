export var C_bridge = 1;
export var list_bridges = [];
    list_bridges.push(-1);

    export class Bridge
            {
                constructor()
                {
                    this.left_segment = ["-1", "-1", "-1", "-1", "-1", "-1", "-1"];
                    this.right_segment =  ["-1", "-1", "-1", "-1", "-1", "-1", "-1"];
                    this.serial = C_bridge ++;
                }

                 is_ls()
                {
                    for(var i = 0; i < this.left_segment.length; i++)
                    {
                        if(this.left_segment[i] == "-1")
                        {
                            return 1;
                        }
                    }

                    return 0;
                }

                is_rs()
                {
                    for(var i = 0; i < this.right_segment.length; i++)
                    {
                        if(this.right_segment[i] == "-1")
                        {
                            return 1;
                        }
                    }

                    return 0;
                }
            }

            export function create_bridge()
            {
                let bridge = new Bridge();
                list_bridges.push(bridge);
            }

            export function reset_bridges()
            {
                list_bridges = ["-1"];
                C_bridge = 1;
            }  