//#define socketmode
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;

namespace SmartConnector.Edukit
{
    class Program
    {
        private static void Main(string[] args)
        {
            var instance = new Service();
            instance.Start();
        }

        public class Service
        {
            private static Ecng.Net.SocketIO.Client.Socket ServerSocket;

            public static MqttClient mqttClient;
            static EdgeConfig edgeConfigResult = null;

            internal async void Start()
            {
                SetConfig();
                await Connect();
            }
            private static void SetConfig()
            {
                string fullpathFile = AppDomain.CurrentDomain.BaseDirectory;

                string EdgeConfigFile = fullpathFile + "//EdgeConfigFile.json";

                string edgeConfig = File.ReadAllText(EdgeConfigFile);

                edgeConfigResult = JsonConvert.DeserializeObject<EdgeConfig>(edgeConfig);
            }

            public Task<Boolean> Connect()
            {
                try
                {
                    var ip = edgeConfigResult.EdukitIP;
                    var port = Int32.Parse(edgeConfigResult.EdukitPort);
                    int DelayTime = Int32.Parse(edgeConfigResult.DelayTime);

                    int mqttport = Int32.Parse(edgeConfigResult.MqttBrokerPort);
                    mqttClient = new MqttClient(edgeConfigResult.MqttBrokerIP, mqttport, false, null, null, MqttSslProtocols.TLSv1_2);
                    mqttClient.ProtocolVersion = MqttProtocolVersion.Version_3_1_1;    // 기본값 3.1.1, 버전이 맞아야 연결된다.
                    byte code = mqttClient.Connect(Guid.NewGuid().ToString());

#if socketmode
                    string websocket = edgeConfigResult.WebSocketServerUrl;
                    var query = new Dictionary<string, string>()
                        {
                            { "type", "EDGE" },
                            { "id", edgeConfigResult.EdukitId }
                        };
                    var options = new Ecng.Net.SocketIO.Client.IO.Options();
                    options.Query = query;
                    ServerSocket = Ecng.Net.SocketIO.Client.IO.Socket(websocket, options);

                    ServerSocket.Unhandled += ServerSocket_Unhandled;
#endif

                    Console.WriteLine("##########################");
                    Console.WriteLine("Edukit Connection State : True");
                    Console.WriteLine("Edukit IP : " + ip);
                    Console.WriteLine("Edukit PORT : " + port);
                    Console.WriteLine("##########################");

                    Console.WriteLine("mqtt : " + edgeConfigResult.MqttBrokerIP);
                    Console.WriteLine("mqttport : " + edgeConfigResult.MqttBrokerPort);
                    // Console.WriteLine("websocket : " + websocket);
                    Console.WriteLine("delayTime : " + edgeConfigResult.DelayTime);

                    XGTClass xGTClass = new XGTClass(ip, port);
                    ConnectionStart(DelayTime, xGTClass, ip, port);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message + "\n" + ex.StackTrace);
                }
                return Task.FromResult(true);
            }

            private void ServerSocket_Unhandled(string arg1, object[] arg2)
            {
                ServerSocket.Emit("joinRoom", edgeConfigResult.EdukitId);
            }

            private void ConnectionStart(int DelayTime, XGTClass xGTClass, string ip, int port)
            {
                xGTClass.Connect(ip, port);

#if socketmode
                ServerSocket.Emit("joinRoom", edgeConfigResult.EdukitId);

                ServerSocket.On($"SEND{edgeConfigResult.EdukitId}", (msg) =>
                {
                    XGTAddressData pAddress2 = new XGTAddressData();
                    XGTAddressData test1 = new XGTAddressData();

                    dynamic test = JsonConvert.DeserializeObject<test>(msg.ToString());

                    if (test.tagId.Equals("1")) //start
                    {
                        if (test.value.Equals("0"))
                        {
                            pAddress2.Address = "0";
                            pAddress2.Data = "0";
                            test1.Address = "22";
                            test1.Data = "0";

                            xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                            xGTClass.Write(XGT_DataType.Bit, test1, XGT_MemoryType.IO_P, 0);
                        }
                        else if (test.value.Equals("1"))
                        {
                            pAddress2.Address = "0";
                            pAddress2.Data = "1";
                            test1.Address = "22";
                            test1.Data = "1";

                            xGTClass.Write(XGT_DataType.Bit, test1, XGT_MemoryType.IO_P, 0);
                            xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                        }
                    }
                    else if (test.tagId.Equals("8")) //reset
                    {
                        pAddress2.Address = "F";
                        pAddress2.Data = "1";
                        xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);

                        pAddress2.Address = "F";
                        pAddress2.Data = "0";
                        xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                    }
                    else if (test.tagId.Equals("9")) // 1호기 ON/OFF
                    {
                        if (test.value.Equals("0"))
                        {
                            pAddress2.Address = "8F";
                            pAddress2.Data = "0";

                            xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                        }
                        else if (test.value.Equals("1"))
                        {
                            pAddress2.Address = "8F";
                            pAddress2.Data = "1";

                            xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                        }
                    }
                    else if (test.tagId.Equals("10")) // 2호기 ON/OFF
                    {
                        if (test.value.Equals("0"))
                        {
                            pAddress2.Address = "9F";
                            pAddress2.Data = "0";

                            xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                        }
                        else if (test.value.Equals("1"))
                        {
                            pAddress2.Address = "9F";
                            pAddress2.Data = "1";

                            xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                        }
                    }
                    else if (test.tagId.Equals("11")) // 3호기 ON/OFF
                    {
                        if (test.value.Equals("0"))
                        {
                            pAddress2.Address = "10E";
                            pAddress2.Data = "0";

                            xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                        }
                        else if (test.value.Equals("1"))
                        {
                            pAddress2.Address = "10E";
                            pAddress2.Data = "1";

                            xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                        }
                    }
                    else if (test.tagId.Equals("12")) // sensor1 ON/OFF
                    {
                        if (test.value.Equals("0"))
                        {
                            pAddress2.Address = "6F";
                            pAddress2.Data = "0";

                            xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                        }
                        else if (test.value.Equals("1"))
                        {
                            pAddress2.Address = "6F";
                            pAddress2.Data = "1";

                            xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                        }
                    }
                    else if (test.tagId.Equals("13")) // sensor2 ON/OFF
                    {
                        if (test.value.Equals("0"))
                        {
                            pAddress2.Address = "7F";
                            pAddress2.Data = "0";

                            xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                        }
                        else if (test.value.Equals("1"))
                        {
                            pAddress2.Address = "7F";
                            pAddress2.Data = "1";

                            xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                        }
                    }
                });
#endif

                Dictionary<XGTAddressData, string> BitAddressList = new Dictionary<XGTAddressData, string>();

                XGTAddressData Start = new XGTAddressData();                    //시작 M0000 bit
                XGTAddressData No1PartsError = new XGTAddressData();            // no1 칩없음

                XGTAddressData No1_Action = new XGTAddressData();               // no1 move M00092 bit								
                XGTAddressData No2_Action = new XGTAddressData();               // no2 move M00104 bit

                XGTAddressData No3Ready = new XGTAddressData();                 // no3 칩도착 P0000E bit
                XGTAddressData Sensor1 = new XGTAddressData();                  //colorsensor on M105 bit

                XGTAddressData Reset = new XGTAddressData();                    //Reset M0F BIT

                XGTAddressData sensor1_on_off = new XGTAddressData();           //sensor1 on/off M0006F bit
                XGTAddressData lamp_green = new XGTAddressData();               //Lamp on/off P0002C bit 
                XGTAddressData lamp_yellow = new XGTAddressData();              //Lamp on/off P0002D bit
                XGTAddressData lamp_red = new XGTAddressData();                 //Lamp on/off P0002E bit
                XGTAddressData belt = new XGTAddressData();                     // 컨베이어벨트 P00022 bit

                XGTAddressData Motor1Busy = new XGTAddressData();               // 비트로 옮겨봤음 K04200
                XGTAddressData Motor2Busy = new XGTAddressData();               // 똑같이 옮겨봤음 K04400

                Dictionary<XGTAddressData, string> WordAddressList = new Dictionary<XGTAddressData, string>();

                XGTAddressData No1Delay = new XGTAddressData();                 //1호기 delay 시간  D01101 WORD 
                XGTAddressData No1Count = new XGTAddressData();                 //1호기 수량 C0001 WORD
                XGTAddressData No2Count = new XGTAddressData();                 //2호기 수량 C0002 WORD
                XGTAddressData No3Count = new XGTAddressData();                 //3호기 수량 C0003 WORD

                XGTAddressData no3_motor1 = new XGTAddressData();               //3호기 축1 value K0424 WORD
                XGTAddressData no3_motor2 = new XGTAddressData();               //3호기 축2 value K0444 WORD

                XGTAddressData No2Chip = new XGTAddressData();                  // 2호기 칩 도착 P0000A bit
                XGTAddressData No2CubeFull = new XGTAddressData();              // 2호기 주사위 유무 P0000B bit
                XGTAddressData No2Sol = new XGTAddressData();                   // 2호기 솔레노이드 P0002A bit
                XGTAddressData No2SolAction = new XGTAddressData();             // 2호기 솔작동 M00106 WORD
                XGTAddressData No3Chip = new XGTAddressData();                  // 3호기 칩 도착 P0000E bit
                XGTAddressData Emergency = new XGTAddressData();                // 비상정지 P0000F bit 
                XGTAddressData ColorSensorSensing = new XGTAddressData();       // 컬러센서센싱 P00004 bit 
                XGTAddressData No3Gripper = new XGTAddressData();               // 3호기 그리퍼 P0002B bit

                //XGTAddressData Motor1Busy = new XGTAddressData();               // 1축 운전중 K42 WORD
                //XGTAddressData Motor2Busy = new XGTAddressData();               // 2축 운전중 K44 WORD

                Start.Address = "0";
                Start.Name = "Start";
                Start.TagId = "1";

                No1PartsError.Address = "11";
                No1PartsError.Name = "No1PartsError";
                No1PartsError.TagId = "2";

                No1_Action.Address = "92";
                No1_Action.Name = "No1_Action";
                No1_Action.TagId = "3";

                No2_Action.Address = "104";
                No2_Action.Name = "No2_Action";
                No2_Action.TagId = "4";

                No3Ready.Address = "0E";
                No3Ready.Name = "No3Ready";
                No3Ready.TagId = "5";

                Sensor1.Address = "105";
                Sensor1.Name = "ColorSensor"; //version 변경 M00105 color값 true
                Sensor1.TagId = "6";


                Reset.Address = "0F";
                Reset.Name = "Reset";
                Reset.TagId = "7";

                sensor1_on_off.Address = "6F";
                sensor1_on_off.Name = "sensor1_on_off";
                sensor1_on_off.TagId = "8";


                No1Delay.Address = "1101";
                No1Delay.Name = "No1Delay";
                No1Delay.TagId = "9";

                No1Count.Address = "1";
                No1Count.Name = "No1Count";
                No1Count.TagId = "10";

                No2Count.Address = "2";
                No2Count.Name = "No2Count";
                No2Count.TagId = "11";

                No3Count.Address = "7";
                No3Count.Name = "No3Count";
                No3Count.TagId = "12";

                lamp_green.Address = "2C";
                lamp_green.Name = "lamp_green";
                lamp_green.TagId = "13";

                lamp_yellow.Address = "2D";
                lamp_yellow.Name = "lamp_yellow";
                lamp_yellow.TagId = "14";

                lamp_red.Address = "2E";
                lamp_red.Name = "lamp_red";
                lamp_red.TagId = "15";

                no3_motor1.Address = "424";
                no3_motor1.Name = "No3Motor1";
                no3_motor1.TagId = "16";

                no3_motor2.Address = "444";
                no3_motor2.Name = "No3Motor2";
                no3_motor2.TagId = "17";


                No2Chip.Address = "A";
                No2Chip.Name = "No2Chip";
                No2Chip.TagId = "18";

                No2CubeFull.Address = "B";
                No2CubeFull.Name = "No2CubeFull";
                No2CubeFull.TagId = "19";


                No2Sol.Address = "2A";
                No2Sol.Name = "No2Sol";
                No2Sol.TagId = "20";

                No2SolAction.Address = "106";
                No2SolAction.Name = "No2SolAction";
                No2SolAction.TagId = "21";


                No3Chip.Address = "E";
                No3Chip.Name = "No3Chip";
                No3Chip.TagId = "22";


                Emergency.Address = "F";
                Emergency.Name = "Emergency";
                Emergency.TagId = "23";


                ColorSensorSensing.Address = "4";
                ColorSensorSensing.Name = "ColorSensorSensing";
                ColorSensorSensing.TagId = "24";

                No3Gripper.Address = "2B";
                No3Gripper.Name = "No3Gripper";
                No3Gripper.TagId = "25";

                belt.Address = "22";
                belt.Name = "belt";
                belt.TagId = "26";



                BitAddressList.Add(Start, "M");
                BitAddressList.Add(No1PartsError, "M");
                BitAddressList.Add(No1_Action, "M");
                BitAddressList.Add(No2_Action, "M");
                BitAddressList.Add(No3Ready, "P");
                BitAddressList.Add(Sensor1, "M");
                BitAddressList.Add(Reset, "M");
                BitAddressList.Add(sensor1_on_off, "M");
                WordAddressList.Add(No1Delay, "D");
                WordAddressList.Add(No1Count, "C");
                WordAddressList.Add(No2Count, "C");
                WordAddressList.Add(No3Count, "C");
                WordAddressList.Add(no3_motor1, "K");
                WordAddressList.Add(no3_motor2, "K");
                BitAddressList.Add(lamp_green, "P");
                BitAddressList.Add(lamp_yellow, "P");
                BitAddressList.Add(lamp_red, "P");
                BitAddressList.Add(No2Chip, "P");
                BitAddressList.Add(No2CubeFull, "P");
                BitAddressList.Add(No2Sol, "P");
                BitAddressList.Add(No2SolAction, "M");
                BitAddressList.Add(No3Chip, "P");
                BitAddressList.Add(Emergency, "P");
                BitAddressList.Add(ColorSensorSensing, "P");
                BitAddressList.Add(No3Gripper, "P");
                BitAddressList.Add(belt, "P");

                while (true)
                {
                    try
                    {
                        List<EdukitNewdata> edukitData = new List<EdukitNewdata>();
                        List<EdukitNewdata> edukitMqttData = new List<EdukitNewdata>();

                        foreach (var address in BitAddressList)
                        {
                            XGTData val = null;
                            if (address.Value == "M")
                            {
                                val = xGTClass.Read(XGT_DataType.Bit, address.Key, XGT_MemoryType.SubRelay_M, 0);

                                if (val != null && val.DataList != null && val.DataList.Count > 0)
                                {
                                    if (val.DataList[0].IntData == 0)
                                    {
                                        EdukitNewdata newdata = new EdukitNewdata();
                                        newdata.name = address.Key.Name;
                                        newdata.tagId = address.Key.TagId;
                                        newdata.value = false;
                                        edukitData.Add(newdata);
                                    }
                                    else
                                    {
                                        EdukitNewdata newdata = new EdukitNewdata();
                                        newdata.name = address.Key.Name;
                                        newdata.tagId = address.Key.TagId;
                                        newdata.value = true;
                                        edukitData.Add(newdata);
                                    }
                                }
                            }
                            else if (address.Value == "P")
                            {
                                val = xGTClass.Read(XGT_DataType.Bit, address.Key, XGT_MemoryType.IO_P, 0);

                                if (val != null && val.DataList != null && val.DataList.Count > 0)
                                {
                                    if (val.DataList[0].IntData == 0)
                                    {
                                        EdukitNewdata newdata = new EdukitNewdata();

                                        newdata.name = address.Key.Name;
                                        newdata.tagId = address.Key.TagId;
                                        newdata.value = false;
                                        edukitData.Add(newdata);
                                    }
                                    else
                                    {
                                        EdukitNewdata newdata = new EdukitNewdata();

                                        newdata.name = address.Key.Name;
                                        newdata.tagId = address.Key.TagId;
                                        newdata.value = true;
                                        edukitData.Add(newdata);
                                    }
                                }
                            }
                        }
                        foreach (var address in WordAddressList)
                        {
                            XGTData val = null;

                            if (address.Value == "D")
                            {
                                val = xGTClass.Read(XGT_DataType.Word, address.Key, XGT_MemoryType.DataRegister_D, 0);

                                if (val != null && val.DataList != null && val.DataList.Count > 0)
                                {
                                    EdukitNewdata newdata = new EdukitNewdata();

                                    double data = (double)val.DataList[0].IntData;
                                    if (address.Key.Name == "No1Delay") data = (double)val.DataList[0].IntData / 10;

                                    newdata.name = address.Key.Name;
                                    newdata.tagId = address.Key.TagId;
                                    newdata.value = data.ToString();
                                    edukitData.Add(newdata);
                                }
                            }
                            else if (address.Value == "C")
                            {
                                val = xGTClass.Read(XGT_DataType.Word, address.Key, XGT_MemoryType.Counter_C, 0);

                                if (val != null && val.DataList != null && val.DataList.Count > 0)
                                {

                                    EdukitNewdata newdata = new EdukitNewdata();
                                    newdata.name = address.Key.Name;
                                    newdata.tagId = address.Key.TagId;
                                    newdata.value = val.DataList[0].IntData.ToString();
                                    edukitData.Add(newdata);
                                }
                            }
                            else if (address.Value == "K")
                            {
                                XGTData val1 = xGTClass.Read(XGT_DataType.Word, address.Key, XGT_MemoryType.KeepRelay_K, 0);
                                int test = Int32.Parse(address.Key.Address);
                                XGTAddressData q = new XGTAddressData();
                                q.Address = (test + 1).ToString();
                                XGTData val2 = xGTClass.Read(XGT_DataType.Word, q, XGT_MemoryType.KeepRelay_K, 0);

                                if ((val1 != null && val1.DataList != null && val1.DataList.Count > 0) && (val2 != null && val2.DataList != null && val2.DataList.Count > 0))
                                {
                                    int val22 = val2.DataList[0].IntData;
                                    long dWordVal = (val22 * 65536) + val1.DataList[0].IntData;
                                    if (dWordVal >= 0)
                                    {
                                        EdukitNewdata newdata = new EdukitNewdata
                                        {
                                            name = address.Key.Name,
                                            tagId = address.Key.TagId,
                                            value = dWordVal.ToString()
                                        };
                                        edukitData.Add(newdata);
                                        edukitMqttData.Add(newdata);
                                    }
                                }
                            }
                        }

                        EdukitNewdata newdata2 = new EdukitNewdata();
                        newdata2.name = "DataTime";
                        newdata2.tagId = "0";
                        newdata2.value = DateTime.Now.ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fff'Z'");
                        edukitData.Add(newdata2);

                        MqttData mqttData = new MqttData();

                        mqttData.Wrapper = edukitData;

#if socketmode
                        SocketIoData(edukitData);
#endif
                        MqttData(mqttData);

                        if (edgeConfigResult.DebugType == "Debug")
                        {
                            Console.Clear();

                            List<EdukitNewdata> SortedList = edukitData.OrderBy(x => Int32.Parse(x.tagId)).ToList();

                            foreach (var data in SortedList)
                            {
                                Console.WriteLine($"[{data.tagId}]{data.name} : {data.value}");
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }
                    Delay(DelayTime);
                }
            }

            public void Delay(int ms)
            {
                DateTime dateTimeNow = DateTime.Now;
                TimeSpan duration = new TimeSpan(0, 0, 0, 0, ms);
                DateTime dateTimeAdd = dateTimeNow.Add(duration);
                while (dateTimeAdd >= dateTimeNow)
                {
                    dateTimeNow = DateTime.Now;
                }
                return;
            }

            static Task<string> SocketIoData(List<EdukitNewdata> EduKitData)
            {
                string data = JsonConvert.SerializeObject(EduKitData, Formatting.Indented);

                string EdukitID = edgeConfigResult.EdukitId;
                try
                {
                    ServerSocket.Emit("create", EdukitID, data);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message + "\n" + ex.StackTrace);
                }
                return null;
            }

            static void MqttData(MqttData EduKitData)
            {
                string json = JsonConvert.SerializeObject(EduKitData, Formatting.Indented);

                string data = json;

                string topic = edgeConfigResult.EdukitId;
                try
                {
                    mqttClient.Publish(topic, Encoding.Default.GetBytes(data),
                        MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, false);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message + "\n" + ex.StackTrace);
                }
            }
        }

        public class EdukitNewdata
        {
            public string tagId { get; set; }
            public string name { get; set; }
            public object value { get; set; }
        }

        public class EdgeConfig
        {
            public string EdukitId { get; set; }
            public string EdukitIP { get; set; }
            public string EdukitPort { get; set; }
            public string MqttBrokerIP { get; set; }
            public string MqttBrokerPort { get; set; }
            public string WebSocketServerUrl { get; set; }
            public string DelayTime { get; set; }
            public string DebugType { get; set; }
        }

        public class test
        {
            public string tagId { get; set; }
            public string value { get; set; }
        }

        public class MqttData
        {
            public List<EdukitNewdata> Wrapper { get; set; }
        }
    }
}


