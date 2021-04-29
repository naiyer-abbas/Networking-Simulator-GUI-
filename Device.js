export var ip = "192.168.1.";
export var C_device = 1;
export function randomMac()
            {
        const mac = [
                (0x52).toString(16),
                (0x54).toString(16),
                (0x00).toString(16),
                Math.floor((Math.random() * 0xff)).toString(16),
                Math.floor((Math.random() * 0xff)).toString(16),
                Math.floor((Math.random() * 0xff)).toString(16)
            ]
            return mac.join(':')
            }

            
          export  var list_devices = [];  // stores the end devices
            list_devices.push(-1);  
export class End_device
            {
                constructor()
                {
                    this.ipaddress = ip + C_device;
                    C_device ++;
                    this.mac_address = randomMac();
                    this.port = ["-1"];
                    this.message = "empty";
                }

                get_ipaddress()
                {
                    return this.ipaddress;
                }

                get_mac_address()
                {
                    return this.mac_address;
                }

                is_port_vacant()
                {
                    if(this.port[0] != "-1")
                    {
                        return 0;
                    }

                    else
                    {
                        return 1;
                    }
                }
            }

          export  function create_end_device()    // creates an end device
            {
                let device = new End_device();
                list_devices.push(device);
            }

            export function get_val()
            {
                return (C_device);
            }

            export function reset_devices()
            {
                list_devices = ["-1"];
                C_device = 1;
            }  