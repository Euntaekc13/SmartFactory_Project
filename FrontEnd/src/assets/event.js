/**
 * 목표 기기의 실시간 정보를 연결하는 파트입니다
 * 방식은 자유지만 본 프로젝트에서는 mqtt를 사용함
 */
import mqtt from "mqtt";

class Event{
    constructor(element, edukit){
         // const eventElement = document.createElement("div");

         // const inputAddressElement = eventElement.appendChild(document.createElement("input"));
         // inputAddressElement.placeholder = "MQTT Host 입력";

         // const inputPortElement = eventElement.appendChild(document.createElement("input"));
         // inputPortElement.placeholder = "MQTT Port 입력";

         // const inputPathElement = eventElement.appendChild(document.createElement("input"));
         // inputPathElement.placeholder = "MQTT Path 입력";

         // const inputTopicElement = eventElement.appendChild(document.createElement("input"));
         // inputTopicElement.placeholder = "MQTT Topic 입력";

         // const buttonElement = eventElement.appendChild(document.createElement("button"));
         // buttonElement.innerText = "Connect"

         // const statusElement = eventElement.appendChild(document.createElement("span"));
         // statusElement.innerText = "연결";
         // statusElement.style.color = "red";

         // buttonElement.addEventListener("click", () => {
         //     let props = {
         //         hostname: "192.168.0.72",
         //         port: "9001",
         //         path: inputPathElement.value,
         //         topic: "myEdukit",
         //         status: statusElement.style,
         //         edukit: edukit
         //     }
         //     statusElement.style.color = "red";
         //     if(this.client) this.client.end();

         //     this.setEvent(props);
         // });

         // element.appendChild(eventElement);

        let props = {
            hostname: "192.168.0.72",
            port: "9001",
            path: "",
            topic: "myEdukit",
             // status: statusElement.style,
            edukit: edukit
        }

        this.setEvent(props);
    }

    setEvent(props){
         // let { hostname, port, path, topic, status, edukit } = props;
        let { hostname, port, path, topic, edukit } = props;

        const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
        this.client = mqtt.connect({
            clientId,
            clean: true,
            protocol: "ws",
            reconnectPeriod: 1000,
            hostname: hostname,
            port: port,
            path: path,
        });

        this.client.on('connect', () => {
            console.log("MQTT Connected");
             // status.color = "green";
            
            this.client.subscribe([topic], () => {
                console.log(`토픽 연결 완료: ${topic}`);
            });
            this.client.on('message', (topic, payload) => {
                 // console.log(`토픽 ${topic}에서 전송된 메시지: ${payload.toString()}`);
                let temp = JSON.parse(payload.toString())
                
                let num0 = temp.Wrapper[0];
                console.log(num0);

                let message = JSON.parse(payload);
                let data = message.Wrapper.filter((p) => p.tagId === "21" || p.tagId === "22");
                data = data.map((p) => parseInt(p.value));

                edukit["yAxis"] = data[0];
                edukit["xAxis"] = data[1];
            });
        });
    }
}
export { Event };